import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';
import { Dialog } from '@/components/ui/Dialog';
import { API_ROUTES } from '@/service/apiConfig';
import { User } from '@/types';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGetRoles } from '@/hooks/useGetRoles';
import { refetchUsers } from '@/hooks/useGetUsers';

interface EditUserDialogInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

const EditUserDialog = ({ open, setOpen, user }: EditUserDialogInterface) => {
  const { roles, rolesLoading } = useGetRoles();
  const [userInformation, setUserInformation] = useState({
    name: user.name,
    roleId: user.roleId,
  });

  const [editLoading, setEditLoading] = useState(false);

  const updateUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    setEditLoading(true);

    if (
      userInformation.roleId !== user.roleId
    ) {
      try {
        await axios.request({
          method: 'PUT',
          url: `${API_ROUTES.users}/${user.id}`,
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

  if (rolesLoading) return <div>Loading...</div>;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title='Editar usuario'>
      <form className='flex flex-col gap-3' onSubmit={updateUser}>
        <label htmlFor='user-name'>
          <span>Correo</span>
          <span>{user.email}</span>
        </label>
        <label htmlFor='user-role'>
          <span>
            Rol <span className='text-red-500'>*</span>
          </span>
          <select
            name='user-role'
            required
            defaultValue={user.roleId || ''}
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
