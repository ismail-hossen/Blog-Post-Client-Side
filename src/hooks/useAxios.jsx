import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog-post-server.vercel.app/api/v1",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const useAxios = () => {
  return instance;
};

export default useAxios;
