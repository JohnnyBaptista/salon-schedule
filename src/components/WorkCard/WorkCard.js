import React from "react";

import {
  ClientName,
  PaperContainer,
  Hour,
  ClientInfoContainer,
  InfoContainer,
  WorkerName,
  Description,
  Price,
  PriceContainer,
} from "./styles";

import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

function WorkCard({
  onEdit,
  clientName,
  workerName,
  description,
  price,
  hour,
}) {
  return (
    <PaperContainer elevation={3}>
      <InfoContainer>
        <ClientInfoContainer>
          <ClientName>{clientName}</ClientName>
          <Hour> Agendado: {hour}</Hour>
        </ClientInfoContainer>
        <WorkerName>Agendado com: {workerName}</WorkerName>
      </InfoContainer>
      <Description>
        <b>Descrição: </b>
        {description}
      </Description>
      <PriceContainer>
        <Description>
          <Price>
            <b>Total: </b>
          </Price>
          R${price.toFixed(2)}
        </Description>
        <Button onClick={() => onEdit()}>
          <EditIcon alt="editar" />
        </Button>
      </PriceContainer>
    </PaperContainer>
  );
}

export default WorkCard;

