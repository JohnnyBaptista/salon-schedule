import api  from "./config";

export const login = async (body) => {
  try {
    const response = await api.post("users/login", body);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const teste = error?.response?.data?.msg;
    alert(teste);
    throw Error(teste);
  }
};

export const getUser = async (id) => {
  try {
    const response = await api.get(`users/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const teste = error?.response?.data?.msg;
    alert(teste);
    throw Error(teste);
  }
} 

const UserService = { login, getUser };

export default UserService;