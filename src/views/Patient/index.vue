<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4 text-center">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D03AQHmzeFr51sTDw/profile-displayphoto-shrink_100_100/0/1620590863176?e=1641427200&v=beta&t=kpWio5Mw0wByXmCLaU9J1tRF7-0Ba5YVn6zfHy4H5JQ"
            alt="John"
          />
        </v-avatar>

        <div>caner@sezgin.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, to] in links"
          :key="icon"
          link
          exact
          :to="`/patient/${to}`"
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
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
          ['mdi-view-dashboard', 'Dashboard', ''],
      ['mdi-map-marker-outline', 'Appointments', 'appointments'],
      ['mdi-pill', 'Prescriptions', 'prescriptions'],
      ['mdi-emoticon-sick-outline', 'Diseases', 'diseases'],
      ['mdi-file-document-edit-outline', 'Reports', 'reports'],
      ['mdi-needle', 'Analysis', 'analysis'],
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
