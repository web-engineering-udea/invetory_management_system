import { PrivateComponent } from '@/components/PrivateComponent';
import { PrimaryButton } from '@/components/ui/Buttons';
import { NavigationCard } from '@/components/ui/NavigationCard';
import { useSession, signIn } from 'next-auth/react';

const Home = () => {
  const { status } = useSession();
  return (
    <main className='flex flex-col h-screen w-full items-center justify-center gap-4'>
      <h1>Sistema de Gestión de Inventarios</h1>
      {status === 'authenticated' ? (
        <div className='flex gap-4'>
          <NavigationCard
            title='Materiales'
            description='Crear y visualizar materiales'
            href='/materials'
          />
          <NavigationCard
            title='Inventario'
            description='Crear y visualizar registro de inventario'
            href='/inventory'
          />
          <PrivateComponent roleName='ADMIN'>
            <NavigationCard
              title='Usuarios'
              description='Gestionar los usuarios de la plataforma'
              href='/users'
            />
          </PrivateComponent>
        </div>
      ) : (
        <div>
          <PrimaryButton
            text='Iniciar sesión'
            loading={status === 'loading'}
            onClick={() => {
              signIn('auth0');
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
