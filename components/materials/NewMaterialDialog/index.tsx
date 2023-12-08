import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { useGetUsers } from '@/hooks/useGetUsers';
import { Dialog } from '@/components/ui/Dialog';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';
import axios, { AxiosError } from 'axios';
import { API_ROUTES } from '@/service/apiConfig';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { refetchMaterials } from '@/hooks/useGetMaterials';
import { refetchInventorys } from '@/hooks/useGetInventorys';

interface NewMaterialDialogInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMaterialDialog = ({ open, setOpen }: NewMaterialDialogInterface) => {
  const { data } = useSession();
  const { users } = useGetUsers();
  const [materialInformation, setMaterialInformation] = useState({
    name: '',
    quantity: 0,
    userId: users?.find((user) => user.email === data?.user.email)?.id,
  });
  // const [movementInformation, setMovementInformation] = useState({
  //   movementType: 'ENTRADA',
  //   quantity: 0,
  //   materialId: '',
  //   userId: users?.find((user) => user.email === data?.user.email)?.id,
  // });


  const [createLoading, setCreateLoading] = useState(false);

  const createMaterial = async (e: SyntheticEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    
    let response = {data: {
      newMaterial: {
        id: '',
        userId: '',
        quantity: 0,
      }
    }};
    try {
        response = await axios.request({
        method: 'POST',
        url: API_ROUTES.materials,
        data: {
          ...materialInformation,
        },
      });
      await refetchMaterials();
      toast.success('Material creado correctamente');
      setOpen(false);
    } catch (e: unknown) {
      const error = e as AxiosError;

      const errorData = error?.response?.data as { message: string };

      if (
        errorData?.message?.includes(
          'Unique constraint failed on the fields: (`name`)'
        )
      ) {
        toast.error('Error creando el material: el nombre utilizado ya existe.');
      } else {
        toast.error('Error creando el material');
      }
    }

    try {
      await axios.request({
        method: 'POST',
        url: API_ROUTES.inventorys,
        data: {
          movementType: 'ENTRADA',
          quantity: response.data.newMaterial.quantity,
          materialId: response.data.newMaterial.id,
          userId: response.data.newMaterial.userId,
        },
      });
      await refetchInventorys();
      toast.success('Movimiento creado correctamente');
      setOpen(false);
    } catch (e: unknown) {
      toast.error('Error creando el movimiento');
    }

    setCreateLoading(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title='Crear material'>
      <form className='flex flex-col gap-3' onSubmit={createMaterial}>
        <label htmlFor='material-name'>
          <span>
            Nombre <span className='text-red-500'>*</span>
          </span>
          <input
            name='material-name'
            type='text'
            placeholder='Escriba aquí...'
            required
            value={materialInformation.name}
            onChange={(e) => {
              setMaterialInformation({
                ...materialInformation,
                name: e.target.value,
              });
            }}
          />
        </label>
        <label htmlFor='material-quantity'>
          <span>
            Saldo <span className='text-red-500'>*</span>
          </span>
          <input
            name='material-quantity'
            type='number'
            placeholder='Escriba aquí...'
            required
            value={materialInformation.quantity}
            onChange={(e) => {
              setMaterialInformation({
                ...materialInformation,
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
          />
        </div>
      </form>
    </Dialog>
  );
};

export { NewMaterialDialog };
