<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <div style="font-size: 1.3rem; font-weight: 500">
          Hospital Management System ({{ isAuth }})
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="isAuth" text @click="logout">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuth']),
  },
  methods: {
    ...mapActions(["logout"])
  },
};
</script>
