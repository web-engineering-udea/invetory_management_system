import { useGetRoles } from '@/hooks/useGetRoles';
import { useGetUsers } from '@/hooks/useGetUsers';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useState } from 'react';
import { EditUserDialog } from '@/components/users/EditUserDialog';

const UsersPageWrapper = () => {
  return (
    <ProtectedRoute roleName='ADMIN'>
      <UsersPage />
    </ProtectedRoute>
  );
};

const UsersPage = () => {
  const { roles, rolesLoading } = useGetRoles();
  const { users, usersError, usersLoading } = useGetUsers();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  if (usersLoading || rolesLoading) return <div>Loading...</div>;

  if (usersError) return <div>Error al cargar los datos</div>;

  return (
    <div className='flex w-full flex-col items-center gap-3 p-10'>
      <div className='flex w-full flex-col items-center gap-5'>
        <h1>Gestión de usuarios</h1>
      </div>
      <section className='flex flex-col justify-center gap-3'>
        <div className='ml-auto'>
          <button onClick={() => setOpenEditDialog(true)} className='primary  '>
            Editar usuario
          </button>
        </div>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Fecha de creación</th>
              <th>Correo</th>
              <th>Rol</th>
              {/* <th>Acciones</th> */}
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.createdAt.toString()}</td>
                  <td>{user.email}</td>
                  <td>
                    {roles?.find((el) => el.id === user.roleId)?.name ?? ''}
                  </td>
                  {/* <td>
                    <UserActions user={user} />
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <EditUserDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      />
    </div>
  );
};

export default UsersPageWrapper;
