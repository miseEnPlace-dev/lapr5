import { Result } from '@/core/logic/Result';
import { BuildingCode } from '@/domain/building/buildingCode';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDescription } from '@/domain/floor/floorDescription';
import { FloorDimensions } from '@/domain/floor/floorDimensions';
import { FloorMap } from '@/domain/floor/floorMap/floorMap';
import { FloorMapElevators } from '@/domain/floor/floorMap/floorMapElevators';
import { FloorMapExitLocation } from '@/domain/floor/floorMap/floorMapExitLocation';
import { FloorMapExits } from '@/domain/floor/floorMap/floorMapExits';
import { FloorMapMatrix } from '@/domain/floor/floorMap/floorMapMatrix';
import { FloorMapSize } from '@/domain/floor/floorMap/floorMapSize';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';
import { TYPES } from '@/loaders/inversify/types';
import { FloorMapMapper } from '@/mappers/FloorMapMapper';
import { FloorMapper } from '@/mappers/FloorMapper';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import IFloorService from '@/services/IServices/IFloorService';
import { inject, injectable } from 'inversify';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IConnectorRepo from './IRepos/IConnectorRepo';

@injectable()
export default class FloorService implements IFloorService {
  constructor(
    @inject(TYPES.floorRepo) private floorRepo: IFloorRepo,
    @inject(TYPES.buildingRepo) private buildingRepo: IBuildingRepo,
    @inject(TYPES.connectorRepo) private connectorRepo: IConnectorRepo
  ) {}

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
      const codeOrError = FloorCode.create(floorDTO.code);
      if (codeOrError.isFailure) return Result.fail<IFloorDTO>(codeOrError.error as string);

      const descriptionOrError = floorDTO.description
        ? FloorDescription.create(floorDTO.description)
        : undefined;
      if (descriptionOrError && descriptionOrError.isFailure)
        return Result.fail<IFloorDTO>(descriptionOrError.error as string);

      const buildingCodeOrError = BuildingCode.create(floorDTO.buildingCode);
      if (buildingCodeOrError.isFailure)
        return Result.fail<IFloorDTO>(buildingCodeOrError.error as string);

      const building = await this.buildingRepo.findByCode(buildingCodeOrError.getValue());
      if (!building) return Result.fail<IFloorDTO>('Building does not exist');

      if (
        !floorDTO.dimensions ||
        !floorDTO.dimensions.width ||
        !floorDTO.dimensions.length ||
        floorDTO.dimensions.width > building.maxDimensions.width ||
        floorDTO.dimensions.length > building.maxDimensions.length
      )
        return Result.fail<IFloorDTO>('Floor dimensions are invalid');

      const dimensionsOrError = FloorDimensions.create(
        floorDTO.dimensions.width,
        floorDTO.dimensions.length
      );
      if (dimensionsOrError.isFailure) return Result.fail<IFloorDTO>(dimensionsOrError.error);

      const floorOrError = Floor.create({
        code: codeOrError.getValue(),
        description: descriptionOrError ? descriptionOrError.getValue() : undefined,
        dimensions: dimensionsOrError.getValue(),
        buildingCode: buildingCodeOrError.getValue()
      });

      if (floorOrError.isFailure) return Result.fail<IFloorDTO>(floorOrError.error as string);

      const floorResult = floorOrError.getValue();

      const floorExists = !!(await this.floorRepo.findByCode(floorResult.code));
      if (floorExists) return Result.fail<IFloorDTO>('Floor already exists');

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
        if (!elevator) result = [];
        else
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

  public async uploadMap(floorCode: string, map: IFloorMapDTO): Promise<Result<IFloorMapDTO>> {
    try {
      // check map is valid
      if (!map.size || !map.map || !map.exits || !map.exitLocation || !map.elevators)
        return Result.fail<IFloorMapDTO>('Map is invalid');

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
