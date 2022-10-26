import api from "./config";

async function getAll() {
  try {
    const response = await api.get("/client");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function create(payload) {
  try {
    const response = await api.post("/client", payload);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function update(payload, id) {
  try {
    const response = await api.patch(`/client/${id}`, payload);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}
async function deleteClient(id) {
  try {
    const response = await api.delete(`/client/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

const ClientService = { getAll, create, update, deleteClient };

export default ClientService;

