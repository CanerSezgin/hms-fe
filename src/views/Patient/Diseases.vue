<template>
  <div>
    <div v-if="isLoading">
      <Loader />
    </div>

    <div v-else>
      <v-row>
        <v-col cols="10" offset="1">
          <div class="title mb-5">My Diseases</div>
          <v-data-table
            :headers="headers"
            :items="doneAppointments"
            :items-per-page="10"
            class="elevation-1"
          >
            <template v-slot:[`item.createdAt`]="{ item }">
              {{ item.createdAt | formatDate }}
            </template>

            <template v-slot:[`item.doctorId`]="{ item }">
              {{ item.doctorId.name }} {{ item.doctorId.surname }}
            </template>

            <template v-slot:[`item.specialization`]="{ item }">
              {{ item.doctorId.specialization }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { appointmentService } from '@/services/api';
import Loader from '@/components/elements/Loader';
export default {
  components: { Loader },
  computed: {
    ...mapGetters(['userId']),
  },
  data() {
    return {
      isLoading: true,
      doneAppointments: [],
      headers: [
        { text: 'Date', value: 'createdAt' },
        { text: 'Disease', value: 'diagnose' },
        { text: 'Doctor', value: 'doctorId' },
        { text: 'Speciality', value: 'specialization' },
      ],
    };
  },
  async created() {
    await this.setData();
    this.isLoading = false;
  },
  methods: {
    async setData() {
      this.doneAppointments = await appointmentService.getByPatientId(
        this.userId,
        'done'
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
