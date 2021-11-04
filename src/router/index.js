import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// Admin Routes
import Admin from '../views/Admin/Admin.vue';
import Doctors from '../views/Admin/Doctors.vue'

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
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
