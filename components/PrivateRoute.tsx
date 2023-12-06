import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (status === 'authenticated') return <>{children}</>;

  return (
    <main className='flex flex-col h-screen w-full items-center justify-center gap-4'>
      <h1 className='text-red-500'>
        Para acceder a esta página se requiere tener sesión iniciada.
      </h1>
      <Link href='/'>
        <span className='text-blue-800 font-bold text-xl'>Ir al Home</span>
      </Link>
    </main>
  );
};

export { PrivateRoute };
