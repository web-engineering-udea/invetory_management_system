import { ButtonProps } from './types';

const SecondaryButton = ({ loading, text, onClick, type }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className='secondary'
    >
      {text}
    </button>
  );
};

export { SecondaryButton };
