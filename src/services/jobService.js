import api from "./config";

export const getJobs = async () => {
  try {
    const response = await api.get(`job`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const teste = error?.response?.data?.msg;
    alert(teste);
    throw Error(teste);
  }
};

export const saveJob = async (payload) => {
  try {
    const response = await api.post('job', payload);
    return response;
  } catch (error) {
    const errMsg = error?.response?.data?.msg;
    alert(errMsg || 'Confira se não há erros no formulário');
    console.error(error);
  }
}

export const updateJob = async (payload, id) => {
  try {
    const response = await api.patch(`/job/${id}`, payload);
    return response;
  } catch (error) {
    const errMsg = error?.response?.data?.msg;
    alert(errMsg || 'Não foi possível atualizar o agendamento');
    console.error(error);
  }
}
export const deleteJob = async (id) => {
  try {
    const response = await api.delete(`/job/${id}`);
    return response;
  } catch (error) {
    const errMsg = error?.response?.data?.msg;
    alert(errMsg || 'Não foi possível deletar o agendamento');
    console.error(error);
  }
}

const JobsService = { getJobs, saveJob, updateJob, deleteJob };

export default JobsService;
