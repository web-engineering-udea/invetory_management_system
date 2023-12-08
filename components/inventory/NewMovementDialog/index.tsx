import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';
import { useGetUsers } from '@/hooks/useGetUsers';
import { Dialog } from '@/components/ui/Dialog';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';
import axios, { AxiosError } from 'axios';
import { API_ROUTES } from '@/service/apiConfig';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { refetchInventorys } from '@/hooks/useGetInventorys';

interface NewMovementDialogInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  material: {
    id: string,
    name: string,
  };
}

const NewMovementDialog = ({ open, setOpen, material }: NewMovementDialogInterface) => {
  const { data } = useSession();
  const { users } = useGetUsers();
  const [movementInformation, setMovementInformation] = useState({
    movementType: '',
    quantity: 0,
    materialId: material.id,
    userId: users?.find((user) => user.email === data?.user.email)?.id,
  });

  useEffect(() => {
    // Check if both users and material are available
    if (users && material && data) {
      // Update movementInformation
      setMovementInformation({
        ...movementInformation,
        materialId: material.id,
        userId: users.find((user) => user.email === data?.user.email)?.id || '',
      });
    }
  }, [users, material, data]);

  console.log('materialbS', material.id);
  console.log('submit', movementInformation);

  const [createLoading, setCreateLoading] = useState(false);

  const createMovement = async (e: SyntheticEvent) => {
    e.preventDefault();
    setCreateLoading(true);

    try {
      await axios.request({
        method: 'POST',
        url: API_ROUTES.inventorys,
        data: {
          ...movementInformation,
        },
      });
      await refetchInventorys();
      toast.success('Movimiento creado correctamente');
      setOpen(false);
    } catch (e: unknown) {
      const error = e as AxiosError;

      const errorData = error?.response?.data as { message: string };
      toast.error('Error creando el movimiento');
    }
    setCreateLoading(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title='Crear movimiento'>
      <form className='flex flex-col gap-3' onSubmit={createMovement}>
        <label htmlFor='movement-name'>
          <span>Material</span>
          <span>{material.name}</span>
        </label>
        <label htmlFor='movement-type'>
          <span>
            Tipo de movimiento <span className='text-red-500'>*</span>
          </span>
          <select
            name='movement-type'
            required
            defaultValue={'Seleccione un tipo'}
            onChange={(e) => {
              setMovementInformation({
                ...movementInformation,
                movementType: e.target.value,
              });
            }}
          >
            <option disabled>Seleccione un tipo</option>
            <option value={'ENTRADA'} key={0}>
              ENTRADA
            </option>
            <option value={'SALIDA'} key={1}>
              SALIDA
            </option>
          </select>
        </label>
        <label htmlFor='movement-quantity'>
          <span>
            Cantidad <span className='text-red-500'>*</span>
          </span>
          <input
            name='movement-quantity'
            type='number'
            required
            value={movementInformation.quantity}
            onChange={(e) => {
              setMovementInformation({
                ...movementInformation,
                quantity: parseInt(e.target.value),
              });
            }}
          />
        </label>

        <div className='flex gap-3 w-full justify-center'>
          <PrimaryButton
            loading={createLoading}
            text='Guardar'
            onClick={() => {}}
            type='submit'
          />
          <SecondaryButton
            onClick={() => setOpen(false)}
            text='Cancelar'
            loading={createLoading}
            type='button'
          />
        </div>
      </form>
    </Dialog>
  );
};

export { NewMovementDialog };
