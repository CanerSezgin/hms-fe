import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// Admin Routes
import Admin from '../views/Admin/Admin.vue';
import Doctors from '../views/Admin/Doctors.vue'
import Appointments from '../views/Admin/Appointments.vue'
import Prescriptions from '../views/Admin/Prescriptions.vue'

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
        path: 'appointments',
        name: 'Appointments',
        component: Appointments,
      },
      {
        path: 'prescriptions',
        name: 'Prescriptions',
        component: Prescriptions,
      },
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
