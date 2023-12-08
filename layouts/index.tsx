import { LeftSideBar } from '@/components/ui/LeftSideBar';
import { useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (status === 'authenticated')
    return (
      <main className='flex'>
        <LeftSideBar />
        <div className='w-full ml-60'>
          {children}
        </div>
        <ToastContainer />
      </main>
    );

  return <PublicLayout>{children}</PublicLayout>;
};

const PublicLayout = ({ children }: LayoutProps) => {
  return <main>{children}</main>;
};

export { Layout };
