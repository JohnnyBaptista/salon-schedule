import React, { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import CustomTable from "../../components/Table/Table";
import { Button, Container, Grid, TextField } from "@mui/material";
import { IoLogoWhatsapp } from "react-icons/io";
import Modal from "../../components/Modal/Modal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import createModalEditData from "../../utils/createModalEditData";

const StyledCalendarIcon = styled(CalendarMonthIcon)({
  cursor: "pointer",
  "& :hover": {
    color: "gray",
  },
});

function Funcionarios() {
  const [openModal, setModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});

  function createData(id, name, telefone, email) {
    return [
      { content: id, id: "id" },
      { content: name, id: "name" },
      { content: telefone, id: "telephone" },
      { content: email, id: "email", label: "E-mail" },
      { content: <StyledCalendarIcon /> },
    ];
  }

  function createColumn(name) {
    return { name };
  }

  const rows = [
    createData(1, "José", "(18) 99882-0000", "emailexemplo@gmail.com"),
    createData(2, "Claudia", "(18) 99882-0000", "emailexemplo@gmail.com"),
    createData(3, "Roberto", "(18) 99882-0000", "emailexemplo@gmail.com"),
    createData(4, "Maria", "(18) 99882-0000", "emailexemplo@gmail.com"),
    createData(5, "Solange", "(18) 99882-0000", "emailexemplo@gmail.com"),
  ];

  const columns = [
    createColumn("ID"),
    createColumn("Nome"),
    createColumn("Telefone"),
    createColumn("Email"),
    createColumn("Agendar"),
  ];

  const ModalBody = useMemo(
    () => (
      <>
        <TextField
          autoFocus
          value={editModalData ? editModalData.name : ""}
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="email"
          value={editModalData.email ? editModalData.email : ""}
          label="Email"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="telephone"
          value={editModalData.telephone ? editModalData.telephone : ""}
          label="Telefone"
          type="text"
          fullWidth
          variant="standard"
        />
      </>
    ),
    [editModalData]
  );

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
          <h1>Meus funcionários</h1>
          <Button onClick={() => openClientsModal()}>
            Adicionar um novo funcionario +
          </Button>
        </Grid>
        <CustomTable columns={columns} rows={rows} onEdit={openClientsModal} />
      </Container>
      <Modal
        handleClose={handleClose}
        open={openModal}
        setModalOpen={setModalOpen}
        title="Adicionar novo cliente"
        description="Preencha os dados para adicionar um novo cliente"
      >
        {ModalBody}
      </Modal>
    </>
  );
}

export default Funcionarios;

