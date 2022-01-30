<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <UserInfo />

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="([icon, text, to], index) in links"
          :key="index"
          link
          exact
          :to="`/admin/${to}`"
          active-class="primary white--text"
          class="py-3 px-2"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <div v-if="isHomepage">
            <Dashboard />
          </div>
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Dashboard from './Dashboard';
import UserInfo from '@/components/menu/UserInfo';
export default {
  components: { Dashboard, UserInfo },
  computed: {
    isHomepage() {
      return this.$route.name === 'Admin';
    },
  },
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-view-dashboard', 'Dashboard', ''],
      ['mdi-account-group', 'Doctors', 'doctors'],
      ['mdi-account-group', 'Lab Specialist', 'lab-spec'],
      ['mdi-account-group', 'Receptionist', 'receptionist'],
      ['mdi-account-group', 'Patient', 'patient'],
      ['mdi-needle', 'Analysis', 'analysis'],
      ['mdi-file-document-edit-outline', 'Imaging', 'imaging'],
      ['mdi-map-marker-outline', 'Appointments', 'appointments'],
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
