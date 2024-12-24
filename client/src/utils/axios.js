import axios from "axios";

const pokeapi = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
});

const server = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_SERVER
});

export { pokeapi };
export default server;