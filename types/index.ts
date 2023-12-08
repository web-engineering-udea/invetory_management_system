import { InventoryMovement, Material, Role, User } from '@prisma/client';

export interface UsersQuery {
  users: User[];
}

export interface RolesQuery {
  roles: Role[];
}

export interface MaterialsQuery {
  materials: Material[];
}

export interface InventorysQuery {
  inventoryMovements: InventoryMovement[];
}