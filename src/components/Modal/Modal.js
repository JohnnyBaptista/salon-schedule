import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Modal({ open, setOpen, title, description, handleClose, children }) {;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title} </DialogTitle>
      {description && (
        <DialogContentText textAlign="center">{description}</DialogContentText>
      )}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancelar</Button>
        <Button onClick={() => handleClose()}>Adicionar</Button>
      </DialogActions>
    </Dialog>
  );
}

