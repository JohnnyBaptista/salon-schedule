import { Paper } from "@mui/material";
import styled from "styled-components";

export const PaperContainer = styled(Paper)`
  width: 500px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ClientInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ClientName = styled.h1`
  margin: 0;
`;

export const Hour = styled.h3`
  margin: 0;
`;

export const WorkerName = styled.h3`
  margin: 0;
`;

export const Description = styled.span`
  margin-bottom: 10px;
`;

export const Price = styled.span`
  font-weight: normal;
  color: green;
`;

export const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

