import Container, { Service } from 'typedi';
import config from '../../config.mjs';
import { Result } from '../core/logic/Result';
import { Role } from '../domain/role/role';
import IRoleDTO from '../dto/IRoleDTO';
import { RoleMap } from '../mappers/RoleMap';
import IRoleRepo from './IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';

@Service()
export default class RoleService implements IRoleService {
  private roleRepo: IRoleRepo;
  constructor() {
    this.roleRepo = Container.get(config.repos.role.name);
  }

  public async getRole(roleId: string): Promise<Result<IRoleDTO>> {
    try {
      const role = await this.roleRepo.findByDomainId(roleId);

      if (role === null) {
        return Result.fail<IRoleDTO>('Role not found');
      } else {
        const roleDTOResult = RoleMap.toDTO(role) as IRoleDTO;
        return Result.ok<IRoleDTO>(roleDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {
      const roleOrError = Role.create(roleDTO);

      if (roleOrError.isFailure) {
        return Result.fail<IRoleDTO>(roleOrError.errorValue());
      }

      const roleResult = roleOrError.getValue();

      await this.roleRepo.save(roleResult);

      const roleDTOResult = RoleMap.toDTO(roleResult) as IRoleDTO;
      return Result.ok<IRoleDTO>(roleDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {
      const role = await this.roleRepo.findByDomainId(roleDTO.id);

      if (role === null) {
        return Result.fail<IRoleDTO>('Role not found');
      } else {
        role.name = roleDTO.name;
        await this.roleRepo.save(role);

        const roleDTOResult = RoleMap.toDTO(role) as IRoleDTO;
        return Result.ok<IRoleDTO>(roleDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
