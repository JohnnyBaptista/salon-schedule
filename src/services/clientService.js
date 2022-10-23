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

const ClientService = { getAll, create };

export default ClientService;

