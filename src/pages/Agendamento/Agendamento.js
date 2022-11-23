import { useState, useEffect } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import createModalEditData from "../../utils/createModalEditData";
import WorkCard from "../../components/WorkCard/WorkCard";
import { CardsContainer } from "./styles";
import JobsService from "../../services/jobService";
import moment from "moment";
import Calendar from "../../components/Calendar/Calendar";
import _, { property, random } from "lodash";
import ClientService from "../../services/clientService";
import WorkerService from "../../services/workerService";

function Agendamento() {
  const [appointments, setAppointments] = useState([]);
  const [editModalData, setEditModalData] = useState({});

  const [selectData, setSelectData] = useState({});

  const mapSelectData = (dt) =>
    dt.map((d) => ({
      id: d.id,
      text: d.name,
      telephone: d.telephone
    }));

  useEffect(() => {
    async function getSelectData() {
      const clientsPromise = ClientService.getAll();
      const workerPromise = WorkerService.getAll();
      const [clientsData, workersData] = await Promise.all([
        clientsPromise,
        workerPromise,
      ]);
      setSelectData({
        clients: mapSelectData(clientsData),
        workers: mapSelectData(workersData),
      });
    }
    getSelectData();
  }, []);

  useEffect(() => {
    async function getJobs() {
      try {
        const response = await JobsService.getJobs();
        const mappedResponse = response?.map((item) => ({
          id: item.id,
          allDay: false,
          client: item.client_id,
          client_telephone: item.client_telephone.replace(/[^\w\s]/gi, '').replace(' ', ''),
          worker: item.worker_id,
          notes: item.price,
          title: item.work_description,
          startDate: item.startDate,
          endDate: item.endDate,
        }));
        setAppointments(mappedResponse);
      } catch (error) {
        alert("Algo errado aconteceu!");
        console.error({ error });
      }
    }
    getJobs();
  }, []);

  // const today = moment.now();

  const addNewAppointment = async (data, id) => {
    const hasErrors = [];
    console.log({data})
    const payload = {
      id,
      work_description: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      price: parseFloat(data.notes),
      worker_id: data.worker,
      client_id: data.client,
    };
    for (const property in payload) {
      if (payload[property] === undefined) {
        hasErrors.push(property);
      }
    }
    if (!hasErrors.length > 0) {
      const response = await JobsService.saveJob(payload, id);
      console.log({ response });
      setAppointments((prev) => [...prev, { ...data, id }]);
    }
  };

  const updateAppointment = async (data, id) => {
    const payload = {
      work_description: data[id]?.title,
      startDate: data[id]?.startDate,
      endDate: data[id]?.endDate,
      price: data[id]?.notes ? parseFloat(data[id]?.notes) : undefined,
      worker_id: data[id]?.worker,
      client_id: data[id]?.client,
    };
    const response = await JobsService.updateJob(payload, id);
    return response;
  };

  const deleteAppointment = async (id) => {
    const response = await JobsService.deleteJob(id);
    console.log(response);
    return response;
  };

  const saveAppointment = async ({ added, changed, deleted }) => {
    let data = [...appointments];
    if (!!added) {
      const id = Date.now()
      await addNewAppointment(added, id);
    } else if (!!changed) {
      const id = Object.keys(changed)[0];
      const response = await updateAppointment({ ...changed }, id);
      if (response) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
        setAppointments(data);
      }
    } else if (deleted !== undefined) {
      const response = await deleteAppointment(deleted);
      if(response.status === 200) {
        data = data.filter((appointment) => appointment.id !== deleted);
        setAppointments(data);
      }
    }
  };
  return (
    <>
      <Container>
        <h1>Agendamentos</h1>
        <Calendar
          selectData={selectData}
          data={appointments}
          saveAppointment={saveAppointment}
        />
      </Container>
    </>
  );
}

export default Agendamento;

