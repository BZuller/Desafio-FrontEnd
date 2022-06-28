import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

interface IDeleteModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  deleteUser: (id: string) => void;
}

export default function DeleteModal({ open, setOpen, deleteUser, id }: IDeleteModal): React.ReactElement {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: '2vmin',
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Realmente deseja deletar este usuário?
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
          sx={{
            margin: '2vmin',
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            deleteUser(id);
            setOpen(false);
          }}
        >
          Deletar
        </Button>
      </Box>
    </Modal>
  );
}
