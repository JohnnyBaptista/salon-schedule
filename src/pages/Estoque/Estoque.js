import React, { useState, useMemo } from "react";
import CustomTable from "../../components/Table/Table";
import { Button, Container, Grid, TextField, styled } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import createModalEditData from "../../utils/createModalEditData";

function Estoque() {
  const [open, setModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});

  const ModalBody = useMemo(
    () => (
      <>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={editModalData.name || ""}
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="quantity"
          value={editModalData.quantity || ""}
          label="Quantidade"
          type="number"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="category"
          label="Categoria"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="price"
          label="Preço"
          value={editModalData.price || ""}
          type="number"
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
      console.log({editModalData})
      setEditModalData(editModalData);
    }
    setModalOpen(true);
  };

  const handleClose = () => {
    setEditModalData({});
    setModalOpen(false);
  };

  function createData(name, qnt, categoria, preco) {
    return [
      { content: name, id: 'name' },
      { content: qnt, id: 'quantity' },
      { content: categoria, id: 'category' },
      { content: `${preco.toFixed(2)}`, id: 'price' },
    ];
  }

  function createColumn(name) {
    return { name };
  }

  const rows = [
    createData("Shampoo", 10, "Cabelo", 50),
    createData("Esmalte X", 2, "Manicure/Pedicure", 60),
    createData("Tinta de cabelo X", 4, "Cabelo", 40),
    createData("Condicionador", 9, "Cabelo", 22.9),
    createData("Creme massageador", 10, "Pele", 24),
  ];

  const columns = [
    createColumn("Nome do produto"),
    createColumn("Quantidade"),
    createColumn("Categoria"),
    createColumn("Preço"),
  ];

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
          <h1>Meu estoque</h1>
          <Button onClick={() => openClientsModal()}>
            Adicionar novo produto +
          </Button>
        </Grid>
        <CustomTable columns={columns} rows={rows} onEdit={openClientsModal} />
      </Container>
      <Modal
        open={open}
        handleClose={handleClose}
        setOpen={setModalOpen}
        title="Adicionar novo produto"
        description="Preencha os dados para adicionar um novo produto"
      >
        {ModalBody}
      </Modal>
    </>
  );
}

export default Estoque;

