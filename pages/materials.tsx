import { useState } from 'react';
import { useGetMaterials } from '@/hooks/useGetMaterials';
import { useGetUsers } from '@/hooks/useGetUsers';
import { PrivateComponent } from '@/components/PrivateComponent';
import { NewMaterialDialog } from '@/components/materials/NewMaterialDialog';
import { PrivateRoute } from '@/components/PrivateRoute';

const MaterialsPageWrapper = () => {
  return (
    <PrivateRoute>
        <MaterialsPage />
    </PrivateRoute>
  );
};

const MaterialsPage = () => {
  const { users, usersError, usersLoading } = useGetUsers();
  const { materials, materialsError, materialsLoading } = useGetMaterials();
  const [openOpenDialog, setOpenOpenDialog] = useState(false);

  if (materialsLoading || usersLoading) return <div>Loading...</div>;

  if (materialsError || usersError) return <div>Error al cargar los datos</div>;

  return (
    <div className='flex w-full flex-col items-center gap-3 p-10'>
      <div className='flex w-full flex-col items-center gap-5'>
        <h1>Gestión de materiales</h1>
      </div>
      <section className='flex flex-col justify-center gap-3'>
        <div className='ml-auto'>
          <PrivateComponent roleName={'ADMIN'}>
            <button onClick={() => setOpenOpenDialog(true)} className='primary'>
              Agregar material
            </button>
          </PrivateComponent>
        </div>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Fecha de creación</th>
              <th>Nombre</th>
              <th>Saldo</th>
              <PrivateComponent roleName='ADMIN'>
                <th>Creado por</th>
              </PrivateComponent>
            </tr>
          </thead>
          <tbody>
            {materials?.map((material) => {
              return (
                <tr key={material.id}>
                  <td>{material.id}</td>
                  <td>{material.createdAt.toString()}</td>
                  <td>{material.name}</td>
                  <td>{material.quantity}</td>
                  <PrivateComponent roleName='ADMIN'>
                    <td>
                        {users?.find((user) => user.id === material.userId)?.name ?? ''}
                    </td>
                  </PrivateComponent>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <NewMaterialDialog open={openOpenDialog} setOpen={setOpenOpenDialog} />
    </div>
  );
};

export default MaterialsPageWrapper;
