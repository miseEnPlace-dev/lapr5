import { defaultRoles } from '@/domain/role/defaultRoles';
import IRoleService from '@/services/IServices/IRoleService';
import { inject, injectable } from 'inversify';
import { TYPES } from './inversify/types';

@injectable()
export default class Bootstrapper {
  constructor(@inject(TYPES.roleService) private roleService: IRoleService) {}

  public async bootstrap() {
    for (const role in defaultRoles) {
      await this.loadRole({
        name: defaultRoles[role].name,
        title: defaultRoles[role].title,
        description: defaultRoles[role].description
      });
    }
  }

  private async loadRole({
    name,
    title,
    description
  }: {
    title: string;
    name: string;
    description?: string;
  }) {
    const roleExists = await this.roleService.exists(name);
    if (!roleExists) await this.roleService.createRole({ name, title, description });
  }
}
