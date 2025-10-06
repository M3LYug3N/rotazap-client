import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`
});

export default axiosInstance;
