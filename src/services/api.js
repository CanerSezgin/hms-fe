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

export const testTypesService = {
  async get(type){
    const url = `/tests/types/${type}`;
    const { data: { tests } } = await client.get(url);
    return tests;
  },
  async create(payload){
    const url = `/tests/types`;
    await client.post(url, payload);
  },
  async update(payload){
    const url = `/tests/types`;
    await client.put(url, payload);
  },
  async delete(id){
    const url = `/tests/types/${id}`;
    await client.delete(url);
  }
}

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
  },
  async update(payload){
    const { id: userId } = payload;
    delete payload.id;

    const url = `/admin/doctors/${userId}`
    await client.put(url, payload)
  }
}