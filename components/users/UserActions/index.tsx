import { Tooltip } from '@/components/ui/Tooltip';
import { useState } from 'react';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import { User } from '@/types';
import { EditUserDialog } from '@/components/users/EditUserDialog';

interface UserActionsProps {
  user: User;
}

const UserActions = ({ user }: UserActionsProps) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (
    <div className='text-3xl flex gap-2'>
      <Tooltip description='Editar el usuario'>
        <button
          type='button'
          onClick={() => {
            setOpenEditDialog(true);
          }}
        >
          <MdModeEditOutline className='text-gray-600 hover:text-yellow-600 hover:cursor-pointer' />
        </button>
      </Tooltip>
      
      <EditUserDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        user={user}
      />

      {/* Eliminar usuario */}
      {/* <Tooltip description='Eliminar el usuario'>
        <button type='button' onClick={() => setOpenDeleteDialog(true)}>
          <MdDeleteOutline className='text-gray-600 hover:text-red-700 hover:cursor-pointer' />
        </button>
      </Tooltip>
      <DeleteUserDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        user={user}
      /> */}
    </div>
  );
};

export { UserActions };
