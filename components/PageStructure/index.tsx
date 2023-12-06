import { MdModeEditOutline } from 'react-icons/md';
import LeftSideBar from '../ui/LeftSideBar';
import { useState } from 'react';

const users = [
  {
    id: '0',
    creation_date: '2023-10-01',
    email_addr: '0@gmail.com',
    rol: 'user',
  },
  {
    id: '0',
    creation_date: '2023-10-01',
    email_addr: '0@gmail.com',
    rol: 'user',
  },
  {
    id: '0',
    creation_date: '2023-10-01',
    email_addr: '0@gmail.com',
    rol: 'user',
  },
  {
    id: '0',
    creation_date: '2023-10-01',
    email_addr: '0@gmail.com',
    rol: 'user',
  },
  {
    id: '0',
    creation_date: '2023-10-01',
    email_addr: '0@gmail.com',
    rol: 'user',
  },
  {
    id: '0',
    creation_date: '2023-10-01',
    email_addr: '0@gmail.com',
    rol: 'user',
  },
  {
    id: '0',
    creation_date: '2023-10-01',
    email_addr: '0@gmail.com',
    rol: 'user',
  },
  {
    id: '0',
    creation_date: '2023-10-01',
    email_addr: '0@gmail.com',
    rol: 'user',
  },
];

const PageStructure = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (
    <div className='w-screen flex flex-row'>
      <LeftSideBar />
      <main className='w-screen only:flex flex-col'>
        <h1>Title</h1>
        <section className='flex flex-row justify-between'>
          <button>Button1</button>
          <button>Button2</button>
        </section>
        <section>
          <table cellSpacing='0'>
            <thead>
              <tr>
                <th>ID</th>
                <th>CREATION DATE</th>
                <th>EMAIL ADDRESS</th>
                <th>ROL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.creation_date}</td>
                    <td>{user.email_addr}</td>
                    <td>{user.rol}</td>
                    <td>
                      <button
                        type='button'
                        onClick={() => {
                          setOpenEditDialog(true);
                        }}
                      >
                        <MdModeEditOutline className='hover:text-red-700 hover:cursor-pointer' />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <section>Extra section</section>
      </main>
    </div>
  );
};

export default PageStructure;
