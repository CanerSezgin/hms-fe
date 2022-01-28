import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
  headers: {},
});

export const authService = {
  async signin(form){
    const url = `/auth/signin`
    const { data } = await client.post(url, form)
    return data
  },
  async register(form){
    const url = `/auth/register`
    const { data } = await client.post(url, form)
    return data
  }
}

export const appointmentService = {
  async getById(appId) {
    const url = `/appointments/${appId}`;
    const { data } = await client.get(url);
    return data;
  },
  async getByDoctorIdAndData(doctorId, date) {
    const url = `/appointments/search`;
    const payload = {
      doctorId,
      date,
    };
    console.log('getByDoctorIdAndData', payload)
    const { data } = await client.post(url, payload);
    return data;
  },
  async createAppointment({ doctorId, patientId, date, time }){
    const url = `/appointments`
    const { data } = await client.post(url, {
      doctorId,
      patientId,
      date,
      time
    })
    return data;
  }
};

export const testTypesService = {
  async get(type) {
    const url = `/tests/types/${type}`;
    const {
      data: { tests },
    } = await client.get(url);
    return tests;
  },
  async create(payload) {
    const url = `/tests/types`;
    await client.post(url, payload);
  },
  async update(payload) {
    const url = `/tests/types`;
    await client.put(url, payload);
  },
  async delete(id) {
    const url = `/tests/types/${id}`;
    await client.delete(url);
  },
};

export const userService = {
  async getAll(userType) {
    const url = `/admin/staff/${userType}`;
    const {
      data: { users },
    } = await client.get(url);
    return users;
  },
  async create(payload) {
    const url = `/admin/staff`;
    const { data } = await client.post(url, payload);
    return data;
  },
  async delete(userId) {
    const url = `/admin/staff/${userId}`;
    await client.delete(url);
  },
  async update(payload) {
    const { _id: userId } = payload;
    delete payload.id;

    const url = `/admin/staff/${userId}`;
    await client.put(url, payload);
  },
  async getDoctorsBySpec(specialization) {
    const url = `/admin/doctor/${specialization}`;
    const {
      data: { doctors },
    } = await client.get(url);
    return doctors;
  },
};
