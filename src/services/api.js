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
    date,
  };
  const { data } = await client.post(url, query);
  return data;
};

export const getAppointmentsByPatientId = async (patientId) => {
  const url = `/appointments/patients/${patientId}`;
  const { data } = await client.get(url);
  return data;
};


export const doctorService = {
  async getAll(){
    const url = `/admin/doctors`;
    const { data: { doctors } } = await client.get(url);
    return doctors;
  },
  async create(payload) {
    const url = `/admin/doctors`
    const { data } = await client.post(url, payload)
    return data
  },
  async delete(userId){
    const url = `/admin/doctors/${userId}`
    await client.delete(url)
  }
}