import { Dialog as MuiDialog, DialogContent, DialogTitle } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Dialog = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};

export { Dialog };
