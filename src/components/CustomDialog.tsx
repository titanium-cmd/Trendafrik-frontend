import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { createPortal } from 'react-dom';

// Slide transition for the Dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Props for the CustomDialog component
interface CustomDialogProps {
  title?: string;
  open: boolean;
  body: React.ReactNode;
  onClose: () => void;
  onProceed?: () => void;
}

// CustomDialog component to display dialogs in the application.
const CustomDialog: React.FC<CustomDialogProps> = ({ title, open, onClose, onProceed, body }) => {
  // Render the Dialog component as a portal into the document body
  return (
    createPortal(
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          {body}
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onClose}>Close</Button>
          {onProceed && <Button onClick={onProceed}>Proceed</Button>}
        </DialogActions>
      </Dialog>,
      document.body
    )
  );
}

export default CustomDialog;
