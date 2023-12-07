import { Enum_RoleName } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { PrivateRoute } from './PrivateRoute';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleName: Enum_RoleName;
}

const ProtectedRoute = ({ children, roleName }: ProtectedRouteProps) => {
  const { data } = useSession();

  if (data?.user.role?.name === roleName) return <>{children}</>;

  return (
    <PrivateRoute>
      <main className='flex flex-col h-screen w-full items-center justify-center gap-4'>
        <h1 className='text-red-600'>
          No tienes permisos para acceder a esta página.
        </h1>
        <Link href='/inventory'>
          <span className='text-blue-700 font-bold text-xl'>Ir al Inventario</span>
        </Link>
      </main>
    </PrivateRoute>
  );
};

export { ProtectedRoute };
