import { PrivateComponent } from "@/components/PrivateComponent";
import Link from "next/link";
import { UserProfileImage } from "@/components/users/UserProfileImage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const LeftSideBar = () => {
  const { data } = useSession();

  return (
    <aside className='flex flex-col items-center mx-auto h-screen w-60 bg-blue-500'>
      <section className='m-10'>
        <UserProfileImage image={data?.user.image || ''} />
        <span className='sidebar'>{data?.user.name || ''}</span>
      </section>
      <section className='flex flex-col w-full items-center '>
        <SidebarLink href='/inventory' title='Inventario' />
        <SidebarLink href='/materials' title='Materiales' />
        <PrivateComponent roleName='ADMIN'>
          <SidebarLink href='/users' title='Usuarios' />
        </PrivateComponent>
      </section>
    </aside>
  );
};

interface SidebarLinkProps {
  href: string;
  title: string;
}

const SidebarLink = ({ href, title }: SidebarLinkProps) => {
  const router = useRouter();

  return (
    <Link
      role='menuitem'
      aria-haspopup='false'
      className={`flex items-center w-full gap-2 py-4
                ${
                  router.asPath === href
                    ? 'bg-blue-600'
                    : 'bg-blue-500'
                }`}
      href={href}
    >
      <span className='sidebar'>{title}</span>
    </Link>
  );
};

export default LeftSideBar;
