import Container, { Service } from 'typedi';

import config from '@/config.mjs';
import { Result } from '@/core/logic/Result';
import { BuildingCode } from '@/domain/building/buildingCode';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDescription } from '@/domain/floor/floorDescription';
import { FloorDimensions } from '@/domain/floor/floorDimensions';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { FloorMapper } from '@/mappers/FloorMapper';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import IFloorService from '@/services/IServices/IFloorService';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';
import { FloorMap } from '@/domain/floor/floorMap/floorMap';
import { FloorMapMapper } from '@/mappers/FloorMapMapper';
import { FloorMapSize } from '@/domain/floor/floorMap/floorMapSize';
import { FloorMapExits } from '@/domain/floor/floorMap/floorMapExits';
import { FloorMapExitLocation } from '@/domain/floor/floorMap/floorMapExitLocation';
import { FloorMapElevators } from '@/domain/floor/floorMap/floorMapElevators';
import { FloorMapMatrix } from '@/domain/floor/floorMap/floorMapMatrix';
import IConnectorRepo from './IRepos/IConnectorRepo';

@Service()
export default class FloorService implements IFloorService {
  private floorRepo: IFloorRepo;
  private buildingRepo: IBuildingRepo;
  private connectorRepo: IConnectorRepo;

  constructor() {
    this.floorRepo = Container.get(config.repos.floor.name);
    this.buildingRepo = Container.get(config.repos.building.name);
    this.connectorRepo = Container.get(config.repos.connector.name);
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const code = FloorCode.create(floorDTO.code).getValue();
      const floor = await this.floorRepo.findByCode(code);
      if (!floor) return Result.fail<IFloorDTO>('Floor not found');

      const buildingCode = BuildingCode.create(floorDTO.buildingCode).getValue();
      const building = await this.buildingRepo.findByCode(buildingCode);
      if (!building) return Result.fail<IFloorDTO>('Building does not exist');

      if (
        floorDTO.dimensions &&
        (floorDTO.dimensions.width > building.maxDimensions.width ||
          floorDTO.dimensions.length > building.maxDimensions.length)
      )
        return Result.fail<IFloorDTO>('Floor dimensions are invalid');

      const description = floorDTO.description
        ? FloorDescription.create(floorDTO.description)
        : undefined;

      const dimensions = floorDTO.dimensions
        ? FloorDimensions.create(floorDTO.dimensions.width, floorDTO.dimensions.length)
        : undefined;

      if (description) floor.description = description.getValue();
      if (dimensions) floor.dimensions = dimensions.getValue();

      await this.floorRepo.save(floor);

      const floorDTOResult = FloorMapper.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const code = FloorCode.create(floorDTO.code);

      if (code.isFailure) return Result.fail<IFloorDTO>(code.error as string);

      const description = floorDTO.description
        ? FloorDescription.create(floorDTO.description)
        : undefined;

      const buildingCode = BuildingCode.create(floorDTO.buildingCode).getValue();
      const building = await this.buildingRepo.findByCode(buildingCode);
      if (!building) return Result.fail<IFloorDTO>('Building does not exist');

      if (
        !floorDTO.dimensions ||
        !floorDTO.dimensions.width ||
        !floorDTO.dimensions.length ||
        floorDTO.dimensions.width > building.maxDimensions.width ||
        floorDTO.dimensions.length > building.maxDimensions.length
      )
        return Result.fail<IFloorDTO>('Floor dimensions are invalid');

      const dimensions = FloorDimensions.create(
        floorDTO.dimensions.width,
        floorDTO.dimensions.length
      );

      if (dimensions.isFailure) return Result.fail<IFloorDTO>(dimensions.error);

      const floorOrError = Floor.create({
        code: code.getValue(),
        description: description ? description.getValue() : undefined,
        dimensions: dimensions.getValue(),
        buildingCode
      });

      if (floorOrError.isFailure) return Result.fail<IFloorDTO>(floorOrError.error as string);

      const floorResult = floorOrError.getValue();

      if (await this.floorRepo.findByCode(floorResult.code))
        return Result.fail<IFloorDTO>('Floor already exists');

      await this.floorRepo.save(floorResult);

      const floorDTOResult = FloorMapper.toDTO(floorResult) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getBuildingFloors(
    buildingCode: string,
    filterStr: string | undefined
  ): Promise<Result<IFloorDTO[]>> {
    try {
      const code = BuildingCode.create(buildingCode).getValue();
      const building = await this.buildingRepo.findByCode(code);
      if (!building) return Result.fail<IFloorDTO[]>('Building not found');

      const filters = filterStr ? filterStr.split(',') : undefined;

      const floors = await this.floorRepo.findByBuildingCode(code);
      let result = floors.map(floor => FloorMapper.toDTO(floor) as IFloorDTO);

      if (filters && filters.includes('elevator')) {
        const elevator = building.elevator;
        if (!elevator)
          return Result.fail<IFloorDTO[]>(
            'Elevator not found on this building. There are no floors served with elevator.'
          );

        result = result.filter(floor =>
          elevator.floors.map(f => f.code.value).includes(floor.code)
        );
      }

      if (filters && filters.includes('connectors')) {
        // find connectors where its floor1Id or floor2Id is in the list of floors
        const connectors = await this.connectorRepo.findOfFloors(floors.map(f => f.id));
        result = result.filter(floor => {
          const floorId = floors.find(f => f.code.value === floor.code)?.id;
          const floorConnectors = connectors.filter(
            c => c.floor1.id.equals(floorId) || c.floor2.id.equals(floorId)
          );
          return floorConnectors.length > 0;
        });
      }

      return Result.ok<IFloorDTO[]>(result);
    } catch (e) {
      throw e;
    }
  }

  // TODO remove
  public async getFloorsWithElevator(buildingCode: string): Promise<Result<IFloorDTO[]>> {
    try {
      const code = BuildingCode.create(buildingCode).getValue();
      const building = await this.buildingRepo.findByCode(code);
      if (!building) return Result.fail<IFloorDTO[]>('Building not found');

      const elevator = building.elevator;
      if (!elevator)
        return Result.fail<IFloorDTO[]>(
          'Elevator not found on this building. There are no floors served with elevator.'
        );

      const floorDTOs = building.elevator?.floors.map(floor => FloorMapper.toDTO(floor));
      return Result.ok<IFloorDTO[]>(floorDTOs);
    } catch (e) {
      throw e;
    }
  }

  public async uploadMap(floorCode: string, map: IFloorMapDTO): Promise<Result<IFloorMapDTO>> {
    try {
      const code = FloorCode.create(floorCode).getValue();
      const floor = await this.floorRepo.findByCode(code);
      if (!floor) return Result.fail<IFloorMapDTO>('Floor not found');

      const size = FloorMapSize.create(map.size.width, map.size.depth);
      if (size.isFailure) return Result.fail<IFloorMapDTO>(size.error as string);

      const mapMatrix = FloorMapMatrix.create(map.map);
      if (mapMatrix.isFailure) return Result.fail<IFloorMapDTO>(mapMatrix.error as string);

      const exits = FloorMapExits.create(map.exits.map(exit => ({ x: exit[0], y: exit[1] })));
      if (exits.isFailure) return Result.fail<IFloorMapDTO>(exits.error as string);

      const exitLocation = FloorMapExitLocation.create(map.exitLocation[0], map.exitLocation[1]);
      if (exitLocation.isFailure) return Result.fail<IFloorMapDTO>(exitLocation.error as string);

      const elevators = FloorMapElevators.create(
        map.elevators.map(elevator => ({ x: elevator[0], y: elevator[1] }))
      );
      if (elevators.isFailure) return Result.fail<IFloorMapDTO>(elevators.error as string);

      const mapOrError = FloorMap.create({
        size: size.getValue(),
        map: mapMatrix.getValue(),
        exits: exits.getValue(),
        exitLocation: exitLocation.getValue(),
        elevators: elevators.getValue()
      });
      if (mapOrError.isFailure) return Result.fail<IFloorMapDTO>(mapOrError.error as string);

      floor.map = mapOrError.getValue();

      await this.floorRepo.save(floor);
      const floorMapDTO = FloorMapMapper.toDTO(floor.map) as IFloorMapDTO;

      return Result.ok<IFloorMapDTO>(floorMapDTO);
    } catch (e) {
      throw e;
    }
  }
}
