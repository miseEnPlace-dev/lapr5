import { RoleDescription } from '@/domain/role/roleDescription';
import { RoleName } from '@/domain/role/roleName';
import { RoleTitle } from '@/domain/role/roleTitle';
import { TYPES } from '@/loaders/inversify/types';
import { inject, injectable } from 'inversify';
import { Result } from '../core/logic/Result';
import { Role } from '../domain/role/role';
import IRoleDTO from '../dto/IRoleDTO';
import { RoleMapper } from '../mappers/RoleMapper';
import IRoleRepo from './IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';

@injectable()
export default class RoleService implements IRoleService {
  constructor(@inject(TYPES.roleRepo) private roleRepo: IRoleRepo) {}

  public async exists(name: string): Promise<boolean> {
    try {
      const role = await this.roleRepo.findByName(name);
      return role !== null;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async getRole(name: string): Promise<Result<IRoleDTO>> {
    try {
      const role = await this.roleRepo.findByName(name);

      if (role === null) return Result.fail<IRoleDTO>('Role not found');

      const roleDTOResult = RoleMapper.toDTO(role) as IRoleDTO;
      return Result.ok<IRoleDTO>(roleDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getRoles(): Promise<Result<IRoleDTO[]>> {
    try {
      const roles = await this.roleRepo.findAll();

      const roleDTOs = roles.map(role => RoleMapper.toDTO(role) as IRoleDTO);
      return Result.ok<IRoleDTO[]>(roleDTOs);
    } catch (e) {
      throw e;
    }
  }

  public async createRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {
      const name = RoleName.create(roleDTO.name).getValue();
      const title = RoleTitle.create(roleDTO.title).getValue();
      const description = roleDTO.description
        ? RoleDescription.create(roleDTO.description).getValue()
        : undefined;

      const roleOrError = Role.create({
        name,
        title,
        description
      });

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
      const role = await this.roleRepo.findByName(roleDTO.name);

      if (role === null) return Result.fail<IRoleDTO>('Role not found');

      const name = RoleName.create(roleDTO.name).getValue();
      role.name = name;

      await this.roleRepo.save(role);

      const roleDTOResult = RoleMapper.toDTO(role) as IRoleDTO;
      return Result.ok<IRoleDTO>(roleDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
