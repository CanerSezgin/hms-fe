<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <UserInfo />

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
          <!-- Dashboard -->
          <div class="mt-16" v-if="isHomepage">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-3">
                    {{ user.name }} {{ user.surname }}
                  </v-list-item-title>

                  <v-list-item-subtitle class="mt-1"
                    >Email: {{ user.email }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="mt-1"
                    >Phone: {{ user.phone }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="mt-1"
                    >Age: {{ user.age }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="mt-1"
                    >Gender:
                    <span v-if="user.gender === 'f'">Female</span>
                    <span v-else-if="user.gender === 'm'">Male</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>

            <v-card
              v-if="nextAppointment"
              class="mt-3 mx-auto"
              max-width="344"
              outlined
            >
              <v-card-title colo>
                <v-icon class="mr-4" large color="orange darken-2"
                  >mdi-bell-ring</v-icon
                >
                Next Appointment</v-card-title
              >
              <v-card-text>
                <div v-if="nextAppointment.doctorId">
                  <div>
                    {{ nextAppointment.doctorId.name }}
                    {{ nextAppointment.doctorId.surname }}
                  </div>
                  <div>{{ nextAppointment.doctorId.specialization }}</div>
                </div>
                <div>
                  {{ nextAppointment.date | formatDate }} ({{
                    nextAppointment.time
                  }})
                </div>
              </v-card-text>
            </v-card>
          </div>

          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetter, mapGetters } from 'vuex';
import { appointmentService } from '@/services/api';
import { mapState } from 'vuex';
import UserInfo from '@/components/menu/UserInfo';
export default {
  components: { UserInfo },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userId']),
    isHomepage() {
      return this.$route.name === 'Patient';
    },
  },
  data: () => ({
    nextAppointment: null,
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
  async created() {
    const appointments = await appointmentService.getByPatientId(
      this.userId,
      'pending'
    );
    this.nextAppointment = appointments[0] || null;
    console.log(appointments);
  },
};
</script>

<style lang="scss" scoped></style>
