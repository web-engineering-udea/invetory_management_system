import { useEffect, useState } from 'react';
import { useGetInventorys } from '@/hooks/useGetInventorys';
import { useGetUsers } from '@/hooks/useGetUsers';
import { PrivateComponent } from '@/components/PrivateComponent';
import { PrivateRoute } from '@/components/PrivateRoute';
import { useGetMaterials } from '@/hooks/useGetMaterials';
import { NewMovementDialog } from '@/components/inventory/NewMovementDialog';
import { toast } from 'react-toastify';
import { $Enums } from '@prisma/client';

const InventorysPageWrapper = () => {
  return (
    <PrivateRoute>
      <InventorysPage />
    </PrivateRoute>
  );
};

interface getBalanceInterface {
  id: string;
  movementType: $Enums.Enum_MovementType;
  quantity: number;
  materialId: string;
  userId: string;
  createdAt: Date;
}

const getBalance = (inventorys: getBalanceInterface[]) => {
  const entradaSum = inventorys
    .filter((movement) => movement.movementType === 'ENTRADA')
    .reduce(
      (sum: any, movement: { quantity: any }) => sum + movement.quantity,
      0
    );

  const salidaSum = inventorys
    .filter(
      (movement: { movementType: string }) => movement.movementType === 'SALIDA'
    )
    .reduce(
      (sum: any, movement: { quantity: any }) => sum + movement.quantity,
      0
    );

  return entradaSum - salidaSum;
};

const InventorysPage = () => {
  const { users, usersError, usersLoading } = useGetUsers();
  const { materials, materialsError, materialsLoading } = useGetMaterials();
  const { inventorys, inventorysError, inventorysLoading } = useGetInventorys();
  console.log('check', inventorys);
  const [filteredInventorys, setFilteredInventorys] = useState(inventorys);
  const [openDialog, setOpenDialog] = useState(false);
  const [materialInformation, setMaterialInformation] = useState({
    id: '',
    name: '',
  });
  useEffect(() => {
    console.log('inventory change!')    
    setFilteredInventorys(inventorys?.filter((inventory) => inventory.materialId === materialInformation.id));
  }, [inventorys]);
  console.log('check1', filteredInventorys)
  console.log('inventorys', inventorys);
  console.log('filtered', filteredInventorys);
  console.log('material select', materialInformation);  

  if (inventorysLoading || materialsLoading || usersLoading) return <div>Loading...</div>;

  if (inventorysError || materialsError || usersError)
    return <div>Error al cargar los datos</div>;

  return (
    <div className='flex w-full flex-col items-center gap-3 p-10'>
      <div className='flex w-full flex-col items-center gap-5'>
        <h1>Gestión de inventario</h1>
      </div>
      <section className='flex flex-col justify-center gap-3'>
        <div className='flex justify-between gap-72'>
          <select
            name='material'
            required
            defaultValue={'Seleccione un material'}
            // value={userInformation.id}
            onChange={(e) => {
              setFilteredInventorys(
                inventorys?.filter(
                  (inventory) => inventory.materialId === e.target.value
                )
              );
              setMaterialInformation({
                id: e.target.value,
                name:
                  materials?.find((material) => material.id === e.target.value)
                    ?.name || '',
              });
            }}
          >
            <option disabled>Seleccione un material</option>
            {materials?.map((material) => {
              return (
                <option value={material.id} key={material.id}>
                  {material.name}
                </option>
              );
            })}
          </select>
          <button
            onClick={() => {
              materialInformation.id !== ''
                ? setOpenDialog(true)
                : toast.error('Debe seleccionar un material primero');
            }}
            className='primary'
          >
            Agregar movimiento
          </button>
        </div>
        {materialInformation.id !== '' ? (
          <div>
            <table cellSpacing='0'>
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Fecha</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <PrivateComponent roleName='ADMIN'>
                    <th>Responsable</th>
                  </PrivateComponent>
                </tr>
              </thead>
              <tbody>
                {filteredInventorys?.map((inventory) => {
                  return (
                    <tr key={inventory.id}>
                      <td>{inventory.id}</td>
                      <td>{inventory.createdAt.toString()}</td>
                      {/* <td>{materials?.find((material) => material.id ===  inventory.materialId)?.name}</td> */}
                      {inventory.movementType === 'ENTRADA' ? (
                        <td>{inventory.quantity}</td>
                      ) : (
                        <td></td>
                      )}
                      {inventory.movementType === 'SALIDA' ? (
                        <td>{inventory.quantity}</td>
                      ) : (
                        <td></td>
                      )}
                      <PrivateComponent roleName='ADMIN'>
                        <td>
                          {users?.find((user) => user.id === inventory.userId)
                            ?.name ?? ''}
                        </td>
                      </PrivateComponent>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <span>Saldo : {getBalance(filteredInventorys || [])}</span>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </section>
      <NewMovementDialog
        open={openDialog}
        setOpen={setOpenDialog}
        material={materialInformation}
      />
    </div>
  );
};

export default InventorysPageWrapper;
