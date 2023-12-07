// import { useGetRoles } from '@/hooks/useGetRoles';
// // import { useGetMaterials } from '@/hooks/useGetMaterials';
// import { ProtectedRoute } from '@/components/ProtectedRoute';
// import { useState } from 'react';
// // import { EditMaterialDialog } from '@/components/materials/EditMaterialDialog';

// const MaterialsPageWrapper = () => {
//   return (
//     <ProtectedRoute roleName='ADMIN'>
//       <MaterialsPage />
//     </ProtectedRoute>
//   );
// };

// const MaterialsPage = () => {
//   const { roles, rolesLoading } = useGetRoles();
//   // const { materials, materialsError, materialsLoading } = useGetMaterials();
//   const [openEditDialog, setOpenEditDialog] = useState(false);

//   // if (materialsLoading || rolesLoading) return <div>Loading...</div>;

//   // if (materialsError) return <div>Error al cargar los datos</div>;

//   return (
//     <div className='flex w-full flex-col items-center gap-3 p-10'>
//       <div className='flex w-full flex-col items-center gap-5'>
//         <h1>Gestión de materiales</h1>
//       </div>
//       <section className='flex flex-col justify-center gap-3'>
//         <div className='ml-auto'>
//           <button onClick={() => setOpenEditDialog(true)} className='primary  '>
//             Editar material
//           </button>
//         </div>
//         <table cellSpacing='0'>
//           <thead>
//             <tr>
//               <th>Identificador</th>
//               <th>Fecha de creación</th>
//               <th>Nombre</th>
//               <th>Saldo</th>
//               <th></th>
//             </tr>
//           </thead>
//           {/* <tbody>
//             {materials?.map((material) => {
//               return (
//                 <tr key={material.id}>
//                   <td>{material.id}</td>
//                   <td>{material.createdAt.toString()}</td>
//                   <td>{material.email}</td>
//                   <td>
//                     {roles?.find((el) => el.id === material.roleId)?.name ?? ''}
//                   </td>
//                   {/* <td>
//                     <MaterialActions material={material} />
//                   </td> 
//                 </tr>
//               );
//             })}
//           </tbody> */}
//         </table>
//       </section>
//       {/* <EditMaterialDialog open={openEditDialog} setOpen={setOpenEditDialog} /> */}
//     </div>
//   );
// };

// export default MaterialsPageWrapper;
