import React, { useEffect, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import CustomTable from "../../components/Table/Table";
import { Button, Container, Grid, TextField } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import createModalEditData from "../../utils/createModalEditData";
import _ from "lodash";
import WorkerService from "../../services/workerService";

const StyledCalendarIcon = styled(CalendarMonthIcon)({
  cursor: "pointer",
  "& :hover": {
    color: "gray",
  },
});

function Funcionarios() {
  const [openModal, setModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [workers, setWorker] = useState([]);

  useEffect(() => {
    async function getClients() {
      const data = await WorkerService.getAll();
      setWorker(data);
    }
    getClients();
  }, []);

  const isEditing = useMemo(() => !_.isEmpty(editModalData), [editModalData]);

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

  // const rows = [
  //   createData(1, "José", "(18) 99882-0000", "emailexemplo@gmail.com"),
  //   createData(2, "Claudia", "(18) 99882-0000", "emailexemplo@gmail.com"),
  //   createData(3, "Roberto", "(18) 99882-0000", "emailexemplo@gmail.com"),
  //   createData(4, "Maria", "(18) 99882-0000", "emailexemplo@gmail.com"),
  //   createData(5, "Solange", "(18) 99882-0000", "emailexemplo@gmail.com"),
  // ];

  const rows = useMemo(
    () =>
      workers.length > 0
        ? workers.map((item) =>
            createData(item.id, item.name, item.telephone, item.email)
          )
        : [],
    [workers]
  );

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
          name="name"
          autoFocus
          defaultValue={editModalData ? editModalData.name : ""}
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          name="email"
          margin="dense"
          id="email"
          defaultValue={editModalData.email ? editModalData.email : ""}
          label="Email"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          name="telephone"
          margin="dense"
          id="telephone"
          defaultValue={editModalData.telephone ? editModalData.telephone : ""}
          label="Telefone"
          type="text"
          fullWidth
          variant="standard"
        />
      </>
    ),
    [editModalData]
  );

  const handleOpenModal = (rowData) => {
    let editModalData;
    if (!!rowData) {
      editModalData = createModalEditData(rowData);
      setEditModalData(editModalData);
    }
    setModalOpen(true);
  };

  const handleCreateNew = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get("name"),
      telephone: data.get("telephone"),
      email: data.get("email"),
    };

    try {
      if (isEditing) {
        const wasEdited = await WorkerService.update(payload, editModalData.id);
        if (!!wasEdited) {
          const clientIndex = workers.findIndex(
            (item) => item.id === editModalData.id
          );
          const newArr = [...workers];
          newArr[clientIndex] = { id: editModalData.id, ...payload };
          setWorker(newArr);
        }
      } else {
        const response = await WorkerService.create(payload);
        if (response.length > 0) {
          setWorker((prev) => [
            ...prev,
            {
              id: response[0],
              email: payload.email,
              name: payload.name,
              telephone: payload.telephone,
            },
          ]);
          alert(`${payload.name} inserido!`);
        }
      }
    } catch (error) {
      alert("Ocorreu algum erro, tente novamente!");
      console.error(error);
    } finally {
      setModalOpen(false);
    }
  };

  const handleDelete = async (row) => {
    const id = row[0].content;
    const confirmed = window.confirm(`Deseja mesmo deletar ${row[1].content}?`);
    if (confirmed) {
      try {
        const response = await WorkerService.deleteClient(id);
        if (!!response) {
          const updatedArray = workers.filter((item) => item.id !== id);
          setWorker(updatedArray);
        }
      } catch (error) {
        console.error(error);
      }
    }
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
          <Button onClick={() => handleOpenModal()}>
            Adicionar um novo funcionario +
          </Button>
        </Grid>
        <CustomTable
          columns={columns}
          rows={rows}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </Container>
      <Modal
        handleClose={handleClose}
        open={openModal}
        handleOk={handleCreateNew}
        title="Adicionar novo cliente"
        description="Preencha os dados para adicionar um novo cliente"
      >
        {ModalBody}
      </Modal>
    </>
  );
}

export default Funcionarios;

