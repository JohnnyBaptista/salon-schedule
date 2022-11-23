import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import WppService from "../../services/wppService";
import { QRCodeSVG } from "qrcode.react";

function WhatsApp() {
  const [qrCode, setQrCode] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    async function getQrCode() {
      const response = await WppService.status();
      const { isAuth } = response;
      if (isAuth) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        setQrCode(response.qrCode);
      }
    }
    const interval = setInterval(() => {
      getQrCode();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Container>
      <Grid
        mx="auto"
        mb={5}
        justifyContent="space-between"
        display="flex"
        md={12}
        lg={12}
      >
        <h1>Conectar no WhatsApp</h1>
      </Grid>
      <Grid
        mx="auto"
        mb={5}
        justifyContent="center"
        display="flex"
        md={12}
        lg={12}
      >
        {authenticated ? (
          <h2>Você já está conectado ao WhatsApp!</h2>
        ) : (
          <QRCodeSVG size={300} value={qrCode} renderAs="canvas" />
        )}
      </Grid>
    </Container>
  );
}

export default WhatsApp;

