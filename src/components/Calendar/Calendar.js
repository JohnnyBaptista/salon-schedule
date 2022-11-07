import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
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
import { useMemo } from "react";
import styled from "styled-components";

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
  const currentDate = useMemo(() => moment().format("MM/DD/YYYY"), []);

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

  const TooltipContent = ({ children, appointmentData, ...restProps }) => {
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
        </Grid>
      </AppointmentTooltip.Content>
    );
  };

  return (
    <Container>
      <Scheduler data={data} locale="pt-BR">
        <ViewState defaultCurrentViewName="Week" currentDate={currentDate} />
        <EditingState onCommitChanges={saveAppointment} />
        <IntegratedEditing />
        <WeekView startDayHour={8} endDayHour={20.5} />
        <DayView startDayHour={8} endDayHour={20.5} />
        <Toolbar />
        <ViewSwitcher />
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

