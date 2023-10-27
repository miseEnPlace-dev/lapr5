import { Service } from '@freshgum/typedi';
import { Result } from '../core/logic/Result';
import { Role } from '../domain/role/role';
import IRoleDTO from '../dto/IRoleDTO';
import { RoleMapper } from '../mappers/RoleMapper';
import RoleRepo from '../repos/roleRepo';
import IRoleRepo from './IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';

@Service([RoleRepo])
export default class RoleService implements IRoleService {
  constructor(private roleRepo: IRoleRepo) {}

  public async getRole(roleId: string): Promise<Result<IRoleDTO>> {
    try {
      const role = await this.roleRepo.findByDomainId(roleId);

      if (role === null) return Result.fail<IRoleDTO>('Role not found');

      const roleDTOResult = RoleMapper.toDTO(role) as IRoleDTO;
      return Result.ok<IRoleDTO>(roleDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async createRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {
      const roleOrError = Role.create(roleDTO);

      if (roleOrError.isFailure) return Result.fail<IRoleDTO>(roleOrError.errorValue());

      const roleResult = roleOrError.getValue();

      await this.roleRepo.save(roleResult);

      const roleDTOResult = RoleMapper.toDTO(roleResult) as IRoleDTO;
      return Result.ok<IRoleDTO>(roleDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {
      const role = await this.roleRepo.findByDomainId(roleDTO.id);

      if (role === null) return Result.fail<IRoleDTO>('Role not found');

      role.name = roleDTO.name;
      await this.roleRepo.save(role);

      const roleDTOResult = RoleMapper.toDTO(role) as IRoleDTO;
      return Result.ok<IRoleDTO>(roleDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
