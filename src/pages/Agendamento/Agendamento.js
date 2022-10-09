import { useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import createModalEditData from "../../utils/createModalEditData";
// import { Container } from './styles';

function Agendamento() {
  const [openModal, setModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});

  const openClientsModal = (rowData) => {
    let editModalData;
    if (!!rowData) {
      editModalData = createModalEditData(rowData);
      setEditModalData(editModalData);
    }
    setModalOpen(true);
  };

  const handleClose = () => {
    setEditModalData({});
    setModalOpen(false);
  };

  return (
    <>
      <Container>
        <Grid
          mx="auto"
          mb={5}
          justifyContent="space-between"
          display="flex"
          md={12}
          lg={12}
        >
          <h1>Agendamentos</h1>
        </Grid>
      </Container>
      {/* <Modal
        handleClose={handleClose}
        open={openModal}
        setModalOpen={setModalOpen}
        title="Adicionar novo cliente"
        description="Preencha os dados para adicionar um novo cliente"
      >
        {ModalBody}
      </Modal> */}
    </>
  );
}

export default Agendamento;

