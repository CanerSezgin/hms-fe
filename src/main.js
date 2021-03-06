import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.filter('formatPhone', function (val) {
  const cleaned = ('' + val).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
});

Vue.filter('capitalize', function (val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
});

Vue.filter('formatDate', function (val) {
  return new Date(val).toISOString().split('T')[0];
});

Vue.filter('formatDateFull', function (val) {
  const [date, time] = new Date(val).toISOString().split('T');
  return `${date} at ${(time.split('.'))[0]}`;
});

Vue.filter('formatGender', function (val) {
  switch (val) {
    case 'f':
      return 'Female';

    case 'm':
      return 'Male';

    default:
      return val;
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount('#app');
