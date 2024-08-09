import axios from "axios";

const API_URL = "http://localhost:3000/works";

export const getWorks = () => axios.get(API_URL);
export const getWork = (id) => axios.get(`${API_URL}/${id}`);
export const createWork = (work) => axios.post(API_URL, work);
export const updateWork = (id, work) => axios.put(`${API_URL}/${id}`, work);
export const deleteWork = (id) => axios.delete(`${API_URL}/${id}`);
