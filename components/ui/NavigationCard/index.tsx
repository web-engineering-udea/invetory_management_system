import Link from 'next/link';

interface NavigationCardProps {
  title: string;
  description: string;
  href: string;
}

const NavigationCard = ({ title, description, href }: NavigationCardProps) => {
  return (
    <Link href={href}>
      <div className='card'>
        <h2>{title}</h2>
        <span>{description}</span>
      </div>
    </Link>
  );
};

export { NavigationCard };
