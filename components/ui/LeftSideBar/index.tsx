import { PrivateComponent } from "@/components/PrivateComponent";
import Link from "next/link";
import { UserProfileImage } from "@/components/users/UserProfileImage";
import { useSession } from "next-auth/react";

const LeftSideBar = () => {
  const { data } = useSession();

  return (
    <aside className='flex flex-col items-center mx-auto h-screen w-60 bg-blue-500'>
      <section className="m-10">
        <UserProfileImage image={data?.user.image || ''} />
        <span className='text-white font-semibold'>
          {data?.user.name || ''}
        </span>
      </section>
      <section className='flex flex-col gap-4'>
        <Link href={'/inventory'}>
          <span className='text-white font-semibold'>Inventario</span>
        </Link>
        <Link href={'/materials'}>
          <span className='text-white font-semibold'>Materiales</span>
        </Link>
        <PrivateComponent roleName='ADMIN'>
          <Link href={'/users'}>
            <span className='text-white font-semibold'>Usuarios</span>
          </Link>
        </PrivateComponent>
      </section>
    </aside>
  );
};

export default LeftSideBar;
