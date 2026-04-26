import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api' // Double check this port matches your backend!
});

export default API;