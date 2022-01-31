<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <UserInfo />

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.icon"
          link
          exact
          :to="`/doctor/${link.to}`"
          active-class="primary white--text"
          class="py-3 px-2"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
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
import UserInfo from '@/components/menu/UserInfo';
import Dashboard from "./Dashboard.vue"

export default {
  components: { UserInfo, Dashboard },
  computed: {
    isHomepage() {
      return this.$route.name === 'Receptionist';
    },
  },
  data: () => ({
    drawer: null,
    links: [
      { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '', img: '' },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
