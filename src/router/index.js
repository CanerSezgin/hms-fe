import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// Admin Routes
import Admin from '../views/Admin';
import Doctors from '../views/Admin/Users/Doctors.vue';
import Receptionist from '../views/Admin/Users/Receptionist.vue';
import LabSpec from '../views/Admin/Users/LabSpec.vue';
import AdminPatient from '../views/Admin/Users/Patient.vue';
import Appointments from '../views/Admin/Appointments.vue';
import Prescriptions from '../views/Admin/Prescriptions.vue';
import AdminAnalysis from "../views/Admin/Analysis.vue"
import Imaging from "../views/Admin/Imaging.vue"

// Doctor Routes
import Doctor from '../views/Doctor';
import DoctorAppointment from '../views/Doctor/Appointment.vue';
import DoctorAppointments from '../views/Doctor/Appointments.vue';

// Patient Routes
import Patient from '../views/Patient';
import PatientAppointments from '../views/Patient/Appointments.vue';
import NewAppointment from '../views/Patient/NewAppointment.vue';
import Diseases from '../views/Patient/Diseases.vue';
import Reports from '../views/Patient/Reports.vue';
import Analysis from '../views/Patient/Analysis.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'doctors',
        name: 'Doctors',
        component: Doctors,
      },
      {
        path: 'receptionist',
        name: 'Receptionist',
        component: Receptionist,
      },
      {
        path: 'lab-spec',
        name: 'LabSpec',
        component: LabSpec,
      },
      {
        path: 'patient',
        name: 'Patient',
        component: AdminPatient,
      },
      {
        path: 'imaging',
        name: 'Imaging',
        component: Imaging,
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: AdminAnalysis,
      },
      {
        path: 'appointments',
        name: 'Appointments',
        component: Appointments,
      },
      {
        path: 'prescriptions',
        name: 'Prescriptions',
        component: Prescriptions,
      },
    ],
  },
  {
    path: '/doctor',
    name: 'Doctor',
    component: Doctor,
    children: [
      {
        path: 'appointments',
        name: 'DoctorAppointments',
        component: DoctorAppointments,
      },
      {
        path: 'appointment/:appointmentId',
        name: 'DoctorAppointment',
        component: DoctorAppointment,
      },
      {
        path: 'prescriptions',
        name: 'Prescriptions',
        component: Prescriptions,
      },
    ],
  },
  {
    path: '/patient',
    name: 'Patient',
    component: Patient,
    children: [
      {
        path: 'appointments',
        name: 'PatientAppointments',
        component: PatientAppointments,
      },
      {
        path: 'new-appointment',
        name: 'NewAppointment',
        component: NewAppointment,
      },
      {
        path: 'prescriptions',
        name: 'Prescriptions',
        component: Prescriptions,
      },
      {
        path: 'diseases',
        name: 'Diseases',
        component: Diseases,
      },
      {
        path: 'reports',
        name: 'Reports',
        component: Reports,
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: Analysis,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
