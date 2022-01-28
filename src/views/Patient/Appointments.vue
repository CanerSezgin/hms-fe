<template>
  <div>
    <div class="mt-1 headline">Appointments</div>
    <v-btn class="mt-2" absolute top right color="primary" to="new-appointment"
      >New Appointment</v-btn
    >
    <div class="mt-7">
      <AppointmentsPatientTable
        class="mt-5"
        :appointments="pendingAppointments"
        :isDone="false"
      />

      <AppointmentsPatientTable
        class="mt-12"
        :appointments="doneAppointments"
        :isDone="true"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppointmentsPatientTable from '@/components/tables/AppointmentsPatient';
import { appointmentService } from '@/services/api';
export default {
  components: {
    AppointmentsPatientTable,
  },
  computed: {
    ...mapGetters(['userId']),
  },
  data() {
    return {
      pendingAppointments: [],
      doneAppointments: [],
    };
  },
  async created() {
    await this.setData();
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
