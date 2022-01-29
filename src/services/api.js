import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
  headers: {},
});

export const authService = {
  async signin(form) {
    const url = `/auth/signin`;
    const { data } = await client.post(url, form);
    return data;
  },
  async register(form) {
    const url = `/auth/register`;
    const { data } = await client.post(url, form);
    return data;
  },
};

export const appointmentService = {
  async getById(appId) {
    const url = `/appointments/${appId}`;
    const {
      data: { appointment },
    } = await client.get(url);
    return appointment;
  },
  async getByDoctorIdAndDate(doctorId, date) {
    const url = `/appointments/search`;
    const payload = {
      doctorId,
      date,
    };
    console.log('getByDoctorIdAndDate', payload);
    const { data } = await client.post(url, payload);
    return data;
  },
  async getByPatientId(patientId, status, pagination = { page: 1, limit: 12 }) {
    const url = `/appointments/search`;
    const payload = {
      patientId,
      status,
      populate: true,
      ...pagination,
    };
    console.log('getByPatientId', payload);
    const {
      data: { appointments },
    } = await client.post(url, payload);

    console.log(appointments)
    return (appointments || []).sort((a, b) => {
      const timeASplitter = a.time.split('-')[0].split(':');
      const timeA = parseInt(`${timeASplitter[0]}${timeASplitter[1]}`);

      const timeBSplitter = b.time.split('-')[0].split(':');
      const timeB = parseInt(`${timeBSplitter[0]}${timeBSplitter[1]}`);

      const dateWithTimeA = new Date(a.date).getTime() + timeA;
      const dateWithTimeB = new Date(b.date).getTime() + timeB;
      console.log({ timeA, timeB, dateWithTimeA, dateWithTimeB });
      return dateWithTimeA - dateWithTimeB;
    });
  },
  async createAppointment({ doctorId, patientId, date, time }) {
    console.log({ doctorId, patientId, date, time });

    const url = `/appointments`;
    const { data } = await client.post(url, {
      doctorId,
      patientId,
      date,
      time,
    });
    return data;
  },
  async updateAppointment(id, payload) {
    const url = `/appointments/${id}`;
    const { data } = await client.patch(url, payload);
    return data;
  },
  async requestTest({ appointmentId, doctorId, patientId, testTypeId }) {
    const url = '/tests';
    const payload = {
      appointmentId,
      doctorId,
      patientId,
      testTypeId,
    };

    console.log('requesting test', payload);
    const { data } = await client.post(url, payload);
    return data;
  },
  async prescribe({ appointmentId, doctorId, patientId, description }) {
    const url = `/appointments/${appointmentId}/prescribe`;
    const payload = {
      doctorId,
      patientId,
      description,
    };

    console.log('creating prescription', payload);
    const { data } = await client.post(url, payload);
    return data;
  },
  async getPrescriptionsByPatientId(patientId){
    const url = `/appointments/prescriptions/${patientId}`
    const { data: { prescriptions } } = await client.get(url)
    return prescriptions
  },
  async getTestsByPatientId(patientId){
    const url = `/tests/patients/${patientId}`
    const { data: {tests} } = await client.get(url)
    return tests
  },
  async getPendingTests(patientId){
    const url = `/tests/pending`
    const { data: {tests} } = await client.get(url)
    return tests
  },
  async uploadTestResult(testId, result){
    const url = `/tests/result/${testId}`
    await client.post(url, { result })
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
