import Image from 'next/image';

interface UserProfileImageProps {
  image: string | undefined;
  height?: number;
  width?: number;
}

const UserProfileImage = ({
  image,
  height = 100,
  width = 100,
}: UserProfileImageProps) => {
  return (
    <Image
      src={image ?? '/media/default-user.png'}
      alt='user profile pic'
      title='user profile pic'
      width={width}
      height={height}
      className='max-w-full rounded-full'
    />
  );
};

export { UserProfileImage };
