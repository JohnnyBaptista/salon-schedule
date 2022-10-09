import React, { useState } from "react";
import CustomTable from "../../components/Table/Table";
import { Button, Container, Grid, TextField, styled } from "@mui/material";
import Modal from "../../components/Modal/Modal";

function Estoque() {
  const [open, setOpen] = useState(false);
  function createData(name, qnt, categoria, preco) {
    return [
      { content: name },
      { content: qnt },
      { content: categoria },
      { content: `R$ ${preco.toFixed(2)}` },
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

  console.log({ rows });

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
          <Button onClick={() => setOpen(true)}>
            Adicionar novo produto +
          </Button>
        </Grid>
        <CustomTable columns={columns} rows={rows} />
      </Container>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Adicionar novo produto"
        description="Preencha os dados para adicionar um novo produto"
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="quantity"
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
          type="number"
          fullWidth
          variant="standard"
        />
      </Modal>
    </>
  );
}

export default Estoque;

