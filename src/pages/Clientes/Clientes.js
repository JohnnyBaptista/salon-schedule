import React, { useEffect, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import CustomTable from "../../components/Table/Table";
import { Button, Container, Grid, TextField } from "@mui/material";
import { IoLogoWhatsapp } from "react-icons/io";
import Modal from "../../components/Modal/Modal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import createModalEditData from "../../utils/createModalEditData";
import ClientService from "../../services/clientService";
import moment from "moment";

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
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function getClients() {
      const data = await ClientService.getAll();
      setClients(data);
    }
    getClients();
  }, []);

  function createData(id, name, telefone, email, birth) {
    return [
      { content: id, id: "id" },
      { content: name, id: "name" },
      { content: telefone, id: "telephone" },
      { content: email, id: "email", label: "E-mail" },
      { content: birth, id: "birth", label: "Aniversário" },
      { content: <StyledIoLogoWhatsapp /> },
      { content: <StyledCalendarIcon /> },
    ];
  }

  function createColumn(name) {
    return { name };
  }

  const rows = useMemo(
    () =>
      clients.length > 0
        ? clients.map((item) =>
            createData(
              item.id,
              item.name,
              item.telephone,
              item.email,
              moment(item.birth).format("DD/MM")
            )
          )
        : [],
    [clients]
  );

  const columns = [
    createColumn("ID"),
    createColumn("Nome"),
    createColumn("Telefone"),
    createColumn("Email"),
    createColumn("Aniversário"),
    createColumn("Enviar mensagem"),
    createColumn("Agendar"),
  ];

  const ModalBody = useMemo(
    () => (
      <>
        <TextField
          autoFocus
          defaultValue={editModalData ? editModalData.name : ""}
          margin="dense"
          id="name"
          name="name"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="email"
          name="email"
          defaultValue={editModalData.email ? editModalData.email : ""}
          label="Email"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="telephone"
          name="telephone"
          defaultValue={editModalData.telephone ? editModalData.telephone : ""}
          label="Telefone"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="birth"
          name="birth"
          defaultValue={editModalData.birth ? editModalData.birth : ""}
          label="Nascimento"
          type="date"
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

  const handleCreateNew = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get("name"),
      birth: data.get("birth"),
      telephone: data.get("telephone"),
      email: data.get("email"),
    };
    try {
      const response = await ClientService.create(payload);
      if (response.length > 0) {
        setClients((prev) => [
          ...prev,
          {
            id: response[0],
            birth: payload.birth,
            email: payload.email,
            name: payload.name,
            telephone: payload.telephone,
          },
        ]);
        alert(`${payload.name} inserido!`);
        setModalOpen(false);
      }
    } catch (error) {
      alert("Ocorreu algum erro, tente novamente!");
      console.error(error);
    }
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
        isForm
        handleOk={handleCreateNew}
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

