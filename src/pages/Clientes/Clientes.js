import React, { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import CustomTable from "../../components/Table/Table";
import { Button, Container, Grid, TextField } from "@mui/material";
import { IoLogoWhatsapp } from "react-icons/io";
import Modal from "../../components/Modal/Modal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import createModalEditData from "../../utils/createModalEditData";

const StyledIoLogoWhatsapp = styled(IoLogoWhatsapp)({
  cursor: "pointer",
  height: "24px",
  width: "24px",
  "& :hover": {
    color: "gray",
  },
});

const StyledCalendarIcon = styled(CalendarMonthIcon)({
  cursor: "pointer",
  "& :hover": {
    color: "gray",
  },
});

function Clientes() {
  const [openModal, setModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});

  function createData(name, telefone, email) {
    return [
      { content: name, id: "name" },
      { content: telefone, id: "telephone" },
      { content: email, id: "email", label: "E-mail" },
      { content: <StyledIoLogoWhatsapp size="lg" /> },
      { content: <StyledCalendarIcon /> },
    ];
  }

  function createColumn(name) {
    return { name };
  }

  const rows = [
    createData("José", "(18) 99882-0000", "emailexemplo@gmail.com"),
    createData("Claudia", "(18) 99882-0000", "emailexemplo@gmail.com"),
    createData("Roberto", "(18) 99882-0000", "emailexemplo@gmail.com"),
    createData("Maria", "(18) 99882-0000", "emailexemplo@gmail.com"),
    createData("Solange", "(18) 99882-0000", "emailexemplo@gmail.com"),
  ];


  const columns = [
    createColumn("Nome"),
    createColumn("Telefone"),
    createColumn("Email"),
    createColumn("Enviar mensagem"),
    createColumn("Agendar"),
  ];

  const ModalBody = useMemo(() => (
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
  ), [editModalData]);

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
          <h1>Meus clientes</h1>
          <Button onClick={() => openClientsModal()}>
            Adicionar novo cliente +
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

export default Clientes;

