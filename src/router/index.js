import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

// Admin Routes
import Admin from '../views/Admin';
import Doctors from '../views/Admin/Users/Doctors.vue';
import AdminReceptionist from '../views/Admin/Users/Receptionist.vue';
import LabSpec from '../views/Admin/Users/LabSpec.vue';
import AdminPatient from '../views/Admin/Users/Patient.vue';
import Appointments from '../views/Admin/Appointments.vue';
import AdminAppointment from '../views/Admin/Appointment.vue';
import Prescriptions from '../views/Admin/Prescriptions.vue';
import AdminAnalysis from '../views/Admin/Analysis.vue';
import Imaging from '../views/Admin/Imaging.vue';

// Doctor Routes
import Doctor from '../views/Doctor';
import DoctorAppointment from '../views/Doctor/Appointment.vue';
import DoctorAppointments from '../views/Doctor/Appointments.vue';

// Patient Routes
import Patient from '../views/Patient';
import PatientAppointments from '../views/Patient/Appointments.vue';
import NewAppointment from '../views/Patient/NewAppointment.vue';
import Diseases from '../views/Patient/Diseases.vue';
import PatientImaging from '../views/Patient/Imaging.vue';
import Analysis from '../views/Patient/Analysis.vue';
import PatientPrescriptions from '../views/Patient/Prescriptions.vue';

// Lab Routes
import Lab from '../views/Lab';

// Receptionist Routes
import Receptionist from '../views/Receptionist';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'doctors',
        name: 'Doctors',
        component: Doctors,
      },
      {
        path: 'receptionist',
        name: 'AdminReceptionist',
        component: AdminReceptionist,
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
        path: 'appointment/:appointmentId',
        name: 'AdminAppointment',
        component: AdminAppointment,
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
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
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
        name: 'PatientPrescriptions',
        component: PatientPrescriptions,
      },
      {
        path: 'diseases',
        name: 'Diseases',
        component: Diseases,
      },
      {
        path: 'imaging',
        name: 'PatientImaging',
        component: PatientImaging,
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: Analysis,
      },
    ],
  },
  {
    path: '/lab',
    name: 'Lab',
    component: Lab,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/receptionist',
    name: 'Receptionist',
    component: Receptionist,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { isAuth, userType } = store.getters;
  console.log('before each', { to: to.fullPath, isAuth, userType });

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('requires auth');

    if (!isAuth) {
      return next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      if (to.fullPath.includes(`/${userType}`)) {
        return next();
      }

      return next({
        path: `${userType}/`,
        query: { redirect: to.fullPath },
      });
    }
  }

  if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (isAuth) {
      return next({
        path: `${userType}/`,
        query: { redirect: to.fullPath },
      });
    } else {
      return next();
    }
  }

  return next();
});

export default router;
