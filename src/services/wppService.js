import api from "./config";

export const status = async () => {
  try {
    const response = await api.get("/status");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (number, message) => {
  try {
    console.log({number})
    const response = await api.post("/send-message", { number, message });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const WppService = { status, sendMessage };

export default WppService;

