import api from "./config";

async function getAll() {
  try {
    const response = await api.get("/worker");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function create(payload) {
  try {
    const response = await api.post("/worker", payload);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function update(payload, id) {
  try {
    const response = await api.patch(`/worker/${id}`, payload);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}
async function deleteClient(id) {
  try {
    const response = await api.delete(`/worker/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

const WorkerService = { getAll, create, update, deleteClient };

export default WorkerService;

