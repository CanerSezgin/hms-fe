<template>
  <div>
    <div v-if="isLoading">
      <Loader />
    </div>

    <div v-else>
      <div class="mt-1 headline">Appointments</div>
      <v-btn
        class="mt-2"
        absolute
        top
        right
        color="primary"
        to="new-appointment"
        >New Appointment</v-btn
      >
      <div class="mt-7">
        <AppointmentsPatientTable
          title="New Appointments"
          class="mt-5"
          :appointments="pendingAppointments"
          :isDone="false"
        />

        <AppointmentsPatientTable
          title="Old Appointments"
          class="mt-12"
          :appointments="doneAppointments"
          :isDone="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { appointmentService } from '@/services/api';
import AppointmentsPatientTable from '@/components/tables/AppointmentsPatient';
import Loader from '@/components/elements/Loader';
export default {
  components: {
    Loader,
    AppointmentsPatientTable,
  },
  computed: {
    ...mapGetters(['userId']),
  },
  data() {
    return {
      isLoading: true,
      pendingAppointments: [],
      doneAppointments: [],
    };
  },
  async created() {
    await this.setData();
    this.isLoading = false;
  },
  methods: {
    async setData() {
      this.pendingAppointments = await appointmentService.getByPatientId(
        this.userId,
        'pending'
      );
      console.log('PENDING', this.pendingAppointments);

      this.doneAppointments = await appointmentService.getByPatientId(
        this.userId,
        'done'
      );
      console.log('Done', this.doneAppointments);
    },
  },
};
</script>

<style lang="scss" scoped></style>
