import { PrivateComponent } from '@/components/PrivateComponent';
import { PrimaryButton } from '@/components/ui/Buttons';
import { NavigationCard } from '@/components/ui/NavigationCard';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

const Home = () => {
  const { status } = useSession();
  return (
    <main className='flex flex-col h-screen w-full items-center justify-center gap-4'>
      <h1>Sistema de Gestión de Inventarios</h1>
      {status === 'authenticated' ? (
        <div>
          <Link href='/inventory'>
            <button className='primary'>
              Inventario
            </button>
          </Link>
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
