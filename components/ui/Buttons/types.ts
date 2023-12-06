export interface ButtonProps {
  loading: boolean;
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
}