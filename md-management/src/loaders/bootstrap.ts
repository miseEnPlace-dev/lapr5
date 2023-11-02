import IRoleService from '@/services/IServices/IRoleService';
import { inject, injectable } from 'inversify';
import { TYPES } from './inversify/types';

@injectable()
export default class Bootstrapper {
  constructor(@inject(TYPES.roleService) private roleService: IRoleService) {}

  public async bootstrap() {
    this.loadRole({ name: 'fleet', title: 'Fleet Manager' });
    this.loadRole({ name: 'campus', title: 'Campus Manager' });
    this.loadRole({ name: 'task', title: 'Task Manager' });
    this.loadRole({ name: 'user', title: 'User' });
    this.loadRole({ name: 'admin', title: 'Admin' });
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
