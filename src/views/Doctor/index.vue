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

        <div>Caner Sezgin</div>
        <div>caner@sezgin.com</div>
      </v-sheet>

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
          <!-- Dashboard -->
          <div class="mt-16" v-if="isHomepage">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    Caner Sezgin
                  </v-list-item-title>
                  <div class="text-overline">Allergy</div>

                  <v-list-item-subtitle
                    >ccanersezgin@gmail.com</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>

            <v-row class="mt-16">
              <v-spacer></v-spacer>

              <div v-for="(link, index) in cards" :key="index">
                <v-card :to="`/doctor/${link.to}`" class="mx-4" max-width="344">
                  <v-img :src="link.img" height="344"></v-img>

                  <v-card-title> {{ link.title }} </v-card-title>

                  <v-card-subtitle>
                    {{ link.subtitle }}
                  </v-card-subtitle>
                </v-card>
              </div>
              <v-spacer></v-spacer>
            </v-row>
          </div>

          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    isHomepage() {
      return this.$route.name === 'Doctor';
    },
    cards() {
      return this.links.filter((link) => link.to);
    },
  },
  data: () => ({
    drawer: null,
    links: [
      { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '', img: '' },
      {
        icon: 'mdi-map-marker-outline',
        title: 'Appointments',
        to: 'appointments',
        img: require('@/assets/img/appointments.png'),
        subtitle: 'Click to see the appointments assigned to you.',
      },
      {
        icon: 'mdi-file-document-edit-outline',
        title: 'Prescriptions',
        to: 'prescriptions',
        img: require('@/assets/img/prescriptions.jpg'),
        subtitle: 'Click to see the prescriptions you wrote.',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
