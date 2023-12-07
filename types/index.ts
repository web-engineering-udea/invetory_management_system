import { Role, User } from '@prisma/client';

export interface UsersQuery {
  users: User[];
}

export interface RolesQuery {
  roles: Role[];
}

// export { User };
