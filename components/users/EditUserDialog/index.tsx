import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { useGetRoles } from '@/hooks/useGetRoles';
import { refetchUsers, useGetUsers } from '@/hooks/useGetUsers';
import { useSession } from 'next-auth/react';
import { Dialog } from '@/components/ui/Dialog';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';
import axios from 'axios';
import { API_ROUTES } from '@/service/apiConfig';
import { toast } from 'react-toastify';

interface EditUserDialogInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditUserDialog = ({ open, setOpen }: EditUserDialogInterface) => {
  const { data } = useSession();
  const { roles, rolesLoading } = useGetRoles();
  const { users, usersError, usersLoading } = useGetUsers();
  const [userInformation, setUserInformation] = useState({
    id: '',
    email: '', //data?.user.email ||
    roleId: '', //data?.user?.role?.name ||
  });
  console.log("data", data);
  console.log("users", users);
  console.log("userInfo", userInformation);

  const [editLoading, setEditLoading] = useState(false);

  const updateUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    setEditLoading(true);

    if (userInformation.roleId !== users?.find((user) => user.id === userInformation.id)?.roleId) {
      try {
        await axios.request({
          method: 'PUT',
          url: `${API_ROUTES.users}/${userInformation.id}`,
          data: { roleId: userInformation.roleId },
        });
        await refetchUsers();
        toast.success('Usuario actualizado correctamente');
      } catch (error) {
        toast.error('Error actualizando el usuario');
      }
    }
    setOpen(false);
    setEditLoading(false);
  };

  if (usersLoading || rolesLoading) return <div>Loading...</div>;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title='Editar usuario'>
      <form className='flex flex-col gap-3' onSubmit={updateUser}>
        <label htmlFor='user-email-adr'>
          <span>
            Correo<span className='text-red-500'>*</span>
          </span>
          <select
            name='user-email-adr'
            required
            value={userInformation.id}
            onChange={(e) => {
                const idToFind = e.target.value;
                console.log(idToFind);
                // Check if users array is defined
                if (users) {
                  // Find the user with th  e specified email
                  const foundUser = users.find((user) => user.id === idToFind);
                  console.log(foundUser?.email);
                  console.log("roleId", foundUser?.roleId);
                  setUserInformation({
                    id: idToFind,
                    email: foundUser?.email || '',
                    roleId: foundUser?.roleId || '',
                  });
                }
            }}
          >
            <option disabled>Seleccione un rol</option>
            {users?.map((user) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.email}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor='user-role'>
          <span>
            Rol <span className='text-red-500'>*</span>
          </span>
          <select
            name='user-role'
            required
            defaultValue={userInformation.roleId || ''}
            value={userInformation.roleId || ''}
            onChange={(e) => {
              setUserInformation({
                ...userInformation,
                roleId: e.target.value,
              });
            }}
          >
            <option disabled>Seleccione un rol</option>
            {roles?.map((role) => {
              return (
                <option value={role.id} key={role.id}>
                  {role.name}
                </option>
              );
            })}
          </select>
        </label>

        <div className='flex gap-3 w-full justify-center'>
          <PrimaryButton
            loading={editLoading}
            text='Guardar'
            onClick={() => {}}
            type='submit'
          />
          <SecondaryButton
            onClick={() => setOpen(false)}
            text='Cancelar'
            loading={editLoading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export { EditUserDialog };
