import { Result } from '@/core/logic/Result';
import { BuildingCode } from '@/domain/building/buildingCode';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDescription } from '@/domain/floor/floorDescription';
import { FloorDimensions } from '@/domain/floor/floorDimensions';
import { FloorMap } from '@/domain/floor/floorMap/floorMap';
import { FloorMazeElevator } from '@/domain/floor/floorMap/floorMaze/floorMazeElevator';
import { FloorMazeExitLocation } from '@/domain/floor/floorMap/floorMaze/floorMazeExitLocation';
import { FloorMazeExits } from '@/domain/floor/floorMap/floorMaze/floorMazeExits';
import { FloorMazeMatrix } from '@/domain/floor/floorMap/floorMaze/floorMazeMatrix';
import { FloorMazeSize } from '@/domain/floor/floorMap/floorMaze/floorMazeSize';
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
import { FloorMaze } from '@/domain/floor/floorMap/floorMaze/floorMaze';
import { FloorMapPlayer } from '@/domain/floor/floorMap/floorMapPlayer';
import { FloorMapDoor } from '@/domain/floor/floorMap/floorMapDoor';
import { FloorMapElevator } from '@/domain/floor/floorMap/floorMapElevator';
import { FloorMapWall } from '@/domain/floor/floorMap/floorMapWall';
import { FloorMapGround } from '@/domain/floor/floorMap/floorMapGround';

@injectable()
export default class FloorService implements IFloorService {
  constructor(
    @inject(TYPES.floorRepo) private floorRepo: IFloorRepo,
    @inject(TYPES.buildingRepo) private buildingRepo: IBuildingRepo,
    @inject(TYPES.connectorRepo) private connectorRepo: IConnectorRepo
  ) {}

  public async getAllFloors(): Promise<Result<IFloorDTO[]>> {
    try {
      const floors = await this.floorRepo.findAll();
      const floorsDTO = floors.map(floor => FloorMapper.toDTO(floor) as IFloorDTO);
      return Result.ok<IFloorDTO[]>(floorsDTO);
    } catch (e) {
      throw e;
    }
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
      if (
        !map.maze.size ||
        !map.maze.map ||
        !map.maze.exits ||
        !map.maze.exitLocation ||
        !map.maze.elevator
      )
        return Result.fail<IFloorMapDTO>('Map is invalid');

      const code = FloorCode.create(floorCode).getValue();
      const floor = await this.floorRepo.findByCode(code);
      if (!floor) return Result.fail<IFloorMapDTO>('Floor not found');

      const size = FloorMazeSize.create(map.maze.size.width, map.maze.size.depth);
      if (size.isFailure) return Result.fail<IFloorMapDTO>(size.error as string);

      const mapMatrix = FloorMazeMatrix.create(map.maze.map);
      if (mapMatrix.isFailure) return Result.fail<IFloorMapDTO>(mapMatrix.error as string);

      const exits = FloorMazeExits.create(map.maze.exits);
      if (exits.isFailure) return Result.fail<IFloorMapDTO>(exits.error as string);

      const exitLocation = FloorMazeExitLocation.create(
        map.maze.exitLocation.x,
        map.maze.exitLocation.y
      );
      if (exitLocation.isFailure) return Result.fail<IFloorMapDTO>(exitLocation.error as string);

      const elevator = FloorMazeElevator.create(map.maze.elevator.x, map.maze.elevator.y);
      if (elevator.isFailure) return Result.fail<IFloorMapDTO>(elevator.error as string);

      const floorMaze = FloorMaze.create({
        size: size.getValue(),
        map: mapMatrix.getValue(),
        exits: exits.getValue(),
        exitLocation: exitLocation.getValue(),
        elevator: elevator.getValue()
      });

      if (floorMaze.isFailure) return Result.fail<IFloorMapDTO>(floorMaze.error as string);

      const player = FloorMapPlayer.create({
        initialPosition: { x: map.player.initialPosition[0], y: map.player.initialPosition[1] },
        initialDirection: map.player.initialDirection
      });

      const door = FloorMapDoor.create({
        url: map.door.url,
        scale: {
          x: map.door.scale.x,
          y: map.door.scale.y,
          z: map.door.scale.z
        }
      });

      const floorMapElevator = FloorMapElevator.create({
        url: map.elevator.url,
        scale: {
          x: map.elevator.scale.x,
          y: map.elevator.scale.y,
          z: map.elevator.scale.z
        }
      });

      const wall = FloorMapWall.create({
        segments: {
          width: map.wall.segments.width,
          height: map.wall.segments.height,
          depth: map.wall.segments.depth
        },
        primaryColor: map.wall.primaryColor,
        maps: {
          color: {
            url: map.wall.maps.color.url
          },
          ao: {
            url: map.wall.maps.ao.url,
            intensity: map.wall.maps.ao.intensity
          },
          displacement: {
            url: map.wall.maps.displacement.url,
            scale: map.wall.maps.displacement.scale,
            bias: map.wall.maps.displacement.bias
          },
          normal: {
            url: map.wall.maps.normal.url,
            type: map.wall.maps.normal.type,
            scale: {
              x: map.wall.maps.normal.scale.x,
              y: map.wall.maps.normal.scale.y
            }
          },
          bump: {
            url: map.wall.maps.bump.url,
            scale: map.wall.maps.bump.scale
          },
          roughness: {
            url: map.wall.maps.roughness.url,
            rough: map.wall.maps.roughness.rough
          }
        },
        wrapS: map.wall.wrapS,
        wrapT: map.wall.wrapT,
        repeat: {
          u: map.wall.repeat.u,
          v: map.wall.repeat.v
        },
        magFilter: map.wall.magFilter,
        minFilter: map.wall.minFilter,
        secondaryColor: map.wall.secondaryColor
      });

      const ground = FloorMapGround.create({
        size: {
          width: map.wall.segments.width,
          height: map.wall.segments.height,
          depth: map.wall.segments.depth
        },
        segments: {
          width: map.wall.segments.width,
          height: map.wall.segments.height,
          depth: map.wall.segments.depth
        },
        primaryColor: map.wall.primaryColor,
        maps: {
          color: {
            url: map.wall.maps.color.url
          },
          ao: {
            url: map.wall.maps.ao.url,
            intensity: map.wall.maps.ao.intensity
          },
          displacement: {
            url: map.wall.maps.displacement.url,
            scale: map.wall.maps.displacement.scale,
            bias: map.wall.maps.displacement.bias
          },
          normal: {
            url: map.wall.maps.normal.url,
            type: map.wall.maps.normal.type,
            scale: {
              x: map.wall.maps.normal.scale.x,
              y: map.wall.maps.normal.scale.y
            }
          },
          bump: {
            url: map.wall.maps.bump.url,
            scale: map.wall.maps.bump.scale
          },
          roughness: {
            url: map.wall.maps.roughness.url,
            rough: map.wall.maps.roughness.rough
          }
        },
        wrapS: map.wall.wrapS,
        wrapT: map.wall.wrapT,
        repeat: {
          u: map.wall.repeat.u,
          v: map.wall.repeat.v
        },
        magFilter: map.wall.magFilter,
        minFilter: map.wall.minFilter,
        secondaryColor: map.wall.secondaryColor
      });

      const mapOrError = FloorMap.create({
        floorMaze: floorMaze.getValue(),
        player,
        door,
        elevator: floorMapElevator,
        wall,
        ground
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

  public async getFloorWithBuildingCode(floorCode: string): Promise<Result<IFloorDTO>> {
    try {
      const code = FloorCode.create(floorCode).getValue();
      const floor = await this.floorRepo.findByCode(code);
      if (!floor) return Result.fail<IFloorDTO>('Floor not found');

      const floorDTO = FloorMapper.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTO);
    } catch (e) {
      throw e;
    }
  }

  public async getFloorWithCode(floorCode: string): Promise<Result<IFloorDTO>> {
    try {
      const code = FloorCode.create(floorCode).getValue();
      const floor = await this.floorRepo.findByCode(code);
      if (!floor) return Result.fail<IFloorDTO>('Floor not found');

      console.log(floor.map);

      const floorDTO = FloorMapper.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTO);
    } catch (e) {
      throw e;
    }
  }
}
