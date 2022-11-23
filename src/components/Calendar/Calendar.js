import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Scheduler,
  WeekView,
  AppointmentForm,
  Appointments,
  Toolbar,
  DayView,
  ViewSwitcher,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Grid } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import styled from "styled-components";
import WppService from "../../services/wppService";
import _ from "lodash";

const Container = styled.div`
  width: 100%;
`;

const BoolEditor = (props) => {
  return null;
};

const LabelComponent = (props) => {
  if (props.text === "Details") {
    return <AppointmentForm.Label {...props} text="Titulo - Descrição" />;
  } else if (props.text === "More Information") {
    return <AppointmentForm.Label {...props} text="Preço" />;
  } else if (props.text === "-") {
    return <AppointmentForm.Label {...props} />;
  }
};

const Calendar = ({ data, saveAppointment, selectData }) => {
  const [currentDate, setCurrentDate] = useState(moment().format("MM/DD/YYYY"));
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onSelectWorkerChange = (nextValue) => {
      onFieldChange({ worker: nextValue });
    };

    const onSelectClientChange = (nextValue) => {
      onFieldChange({ client: nextValue });
    };

    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        <AppointmentForm.Label text="Cliente" type="title" />
        <AppointmentForm.Select
          value={appointmentData.client}
          availableOptions={selectData.clients}
          onValueChange={onSelectClientChange}
          placeholder="Cliente"
        />
        <AppointmentForm.Label text="Funcionário" type="title" />
        <AppointmentForm.Select
          value={appointmentData.worker}
          availableOptions={selectData.workers}
          onValueChange={onSelectWorkerChange}
          placeholder="Funcionário"
        />
      </AppointmentForm.BasicLayout>
    );
  };

  const InputComponent = (props) => {
    if (props.type === "titleTextEditor") {
      return (
        <AppointmentForm.TextEditor
          {...props}
          type="titleTextEditor"
          placeholder="Título - Descrição"
        />
      );
    }
    if (props.type === "multilineTextEditor") {
      return (
        <AppointmentForm.TextEditor
          {...props}
          type="numberEditor"
          placeholder="Preço"
        />
      );
    }
  };

  const sendMessage = async (data, name) => {
    const to = data.client_telephone;
    const date = moment(data.startDate).format("DD/MM");
    const hour = moment(data.startDate).format("HH:mm");
    setIsLoadingMessage(true);
    try {
      const response = await WppService.sendMessage(
        to,
        `Olá ${name}! Você tem um agendamento na Mercedes Hair Studio no dia ${date} as ${hour}. Não se esqueça, aguardamos você!`
      );
      if (!_.isEmpty(response)) {
        alert("Mensagem enviada com sucesso!!");
      }
    } catch (error) {
      alert("Ocorreu algum problema. Tente mais tarde");
      window.location.reload();
    } finally {
      setIsLoadingMessage(false);
    }
  };

  const TooltipContent = ({ children, appointmentData, ...restProps }) => {
    console.log(appointmentData);
    const worker = selectData.workers.find(
      (item) => item.id === appointmentData.worker
    );
    const client = selectData.clients.find(
      (item) => item.id === appointmentData.client
    );
    return (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
      >
        <Grid
          container
          alignItems="flex-start"
          marginLeft="20px"
          display="flex"
          flexDirection="column"
        >
          <span>
            <b>Cliente:</b> {client.text || "A definir"}
          </span>
          <span>
            <b>Funcionario:</b> {worker.text || "A definir"}
          </span>
          <span>
            <b>Preço:</b>
            {!!appointmentData.notes
              ? parseFloat(appointmentData.notes).toFixed(2)
              : "A definir"}
          </span>
          <span style={{ marginTop: 10 }}>
            {isLoadingMessage ? (
              <CircularProgress color="success" />
            ) : (
              <WhatsAppIcon
                style={{ cursor: "pointer" }}
                onClick={() => sendMessage(appointmentData, client.text)}
              />
            )}
          </span>
        </Grid>
      </AppointmentTooltip.Content>
    );
  };

  return (
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: 'flex-end'
        }}
      >
        <span>Passar semana</span>
        <div>
          <KeyboardArrowLeftIcon
            style={{ cursor: "pointer", fontSize: "40px" }}
            onClick={() =>
              setCurrentDate(moment(currentDate).subtract(7, "days"))
            }
          />
          <KeyboardArrowRightIcon
            style={{ cursor: "pointer", fontSize: "40px" }}
            onClick={() => setCurrentDate(moment(currentDate).add(7, "days"))}
          />
        </div>
      </div>
      <Scheduler data={data} locale="pt-BR">
        <ViewState defaultCurrentViewName="Week" currentDate={currentDate} />
        <EditingState onCommitChanges={saveAppointment} />
        <IntegratedEditing />
        <WeekView excludedDays={[0, 1, 6]} startDayHour={8} endDayHour={20.5} />
        <DayView startDayHour={8} endDayHour={20.5} />
        <Appointments />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
          contentComponent={TooltipContent}
        />
        <AppointmentForm
          labelComponent={LabelComponent}
          basicLayoutComponent={BasicLayout}
          textEditorComponent={InputComponent}
          booleanEditorComponent={BoolEditor}
        />
      </Scheduler>
    </Container>
  );
};

export default Calendar;

