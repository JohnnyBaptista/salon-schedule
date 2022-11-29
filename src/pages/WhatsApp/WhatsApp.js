import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import WppService from "../../services/wppService";
import { QRCodeSVG } from "qrcode.react";
import CircularProgress from "@mui/material/CircularProgress";
import useIsFirstRender from "../../utils/useIsFirstRender";

function WhatsApp() {
  const [qrCode, setQrCode] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const isFirstRender = useIsFirstRender();

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
    if (isFirstRender) {
      getQrCode();
    } else {
      const interval = setInterval(() => {
        getQrCode();
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isFirstRender]);
  return (
    <Container>
      <Grid mx="auto" mb={5} justifyContent="space-between" display="flex">
        <h1>Conectar no WhatsApp</h1>
      </Grid>
      <Grid mx="auto" mb={5} justifyContent="center" display="flex">
        {authenticated ? (
          <h2>Você já está conectado ao WhatsApp!</h2>
        ) : (
          <>
            {!authenticated && qrCode === null ? (
              <>
                {" "}
                <h2>Carregando o QRCode</h2> <CircularProgress />{" "}
              </>
            ) : (
              <QRCodeSVG size={500} value={qrCode} renderAs="canvas" />
            )}
          </>
        )}
      </Grid>
    </Container>
  );
}

export default WhatsApp;

