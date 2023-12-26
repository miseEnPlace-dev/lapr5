import axios from "axios";

const MDL_URL = import.meta.env.VITE_API_URL;
const MDTASK_URL = import.meta.env.VITE_MDTASK_API_URL;

const api = axios.create({
  baseURL: MDL_URL,
});

const mdTasksApi = axios.create({
  baseURL: MDTASK_URL,
});

export { api, mdTasksApi };
