import { Floor } from '@/domain/floor/floor';
import { Repo } from '../../core/infra/Repo';
import { FloorCode } from '@/domain/floor/floorCode';

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  findByDomainId(roleId: FloorCode | string): Promise<Floor | null>;
}
