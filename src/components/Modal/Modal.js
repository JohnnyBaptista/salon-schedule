import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
export default function Modal({
  open,
  title,
  description,
  handleClose,
  children,
  handleOk,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <DialogContentText textAlign="center">{description}</DialogContentText>
      )}
      <Box component="form" onSubmit={handleOk}>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button type="submit">Adicionar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

