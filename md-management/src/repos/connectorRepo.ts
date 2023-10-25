import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Document, FilterQuery, Model } from 'mongoose';
import IConnectorRepo from '@/services/IRepos/IConnectorRepo';
import { IConnectorPersistence } from '@/dataschema/IConnectorPersistence';
import { Connector } from '@/domain/connector/connector';
import { ConnectorMap } from '@/mappers/ConnectorMap';

@Service()
export default class ConnectorRepo implements IConnectorRepo {
  private connectorSchema: Model<IConnectorPersistence & Document>;
  constructor() {
    this.connectorSchema = Container.get(config.schemas.connector.name);
  }

  public async exists(connector: Connector): Promise<boolean> {
    const idX = connector.id;

    const query = { domainId: idX };
    const connectorDocument = await this.connectorSchema.findOne(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    return !!connectorDocument;
  }

  public async save(connector: Connector): Promise<Connector> {
    const query = { domainId: connector.id } as FilterQuery<IConnectorPersistence & Document>;

    const connectorDocument = await this.connectorSchema.findOne(query);

    try {
      if (!connectorDocument) {
        const rawConnector = ConnectorMap.toPersistence(connector);

        const connectorCreated = await this.connectorSchema.create(rawConnector);

        const domainConnector = await ConnectorMap.toDomain(connectorCreated);

        if (!domainConnector) throw new Error('Connector not created');
        return domainConnector;
      }

      const domainConnector = await ConnectorMap.toDomain(connectorDocument);
      if (!domainConnector) throw new Error('Connector not created');

      return domainConnector;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(domainId: UniqueEntityID | string): Promise<Connector | null> {
    const query = { domainId };
    const connectorRecord = await this.connectorSchema.findOne(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    if (connectorRecord != null) return ConnectorMap.toDomain(connectorRecord);
    return null;
  }

  public async findAll(): Promise<Connector[]> {
    const records = await this.connectorSchema.find();

    const connectors: Connector[] = [];

    for (const connectorRecord of records) {
      const connector = await ConnectorMap.toDomain(connectorRecord);
      if (connector) connectors.push(connector);
    }

    return connectors;
  }

  public async findByFloorId(floorId: UniqueEntityID): Promise<Connector[]> {
    const query = { $or: [{ floor1: floorId }, { floor2: floorId }] };
    const connectorRecords = await this.connectorSchema.find(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    const connectors: Connector[] = [];

    for (const cRecord of connectorRecords) {
      const c = await ConnectorMap.toDomain(cRecord);
      if (c) connectors.push(c);
    }

    return connectors;
  }

  public async findConnectorBetweenFloors(
    floor1Id: UniqueEntityID,
    floor2Id: UniqueEntityID
  ): Promise<Connector | null> {
    const query = {
      $or: [
        { floor1: floor1Id, floor2: floor2Id },
        { floor1: floor2Id, floor2: floor1Id }
      ]
    };

    const connectorRecord = await this.connectorSchema.findOne(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    if (connectorRecord != null) return ConnectorMap.toDomain(connectorRecord);
    return null;
  }
}
