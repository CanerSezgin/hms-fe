import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
  headers: {},
});

export const getAppointmentById = async (appointmentId) => {
  const url = `/appointments/${appointmentId}`;
  const { data } = await client.get(url);
  return data;
};

export const getAppointmentsByDoctorIdAndDate = async (doctorId, date) => {
  const url = `/appointments/search`;
  const query = {
    doctorId,
    date
  }
  const { data } = await client.post(url, query);
  return data;
};

export const getAppointmentsByPatientId = async (patientId) => {
  const url = `/appointments/patients/${patientId}`;
  const { data } = await client.get(url);
  return data;
};
