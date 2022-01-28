<template>
  <div v-if="doctorId">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <AppointmentsTable
          :tableKey="doctorId"
          :appointments="appointments"
          :timeSlots="timeSlots"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-date-picker v-model="date" class="mt-4"></v-date-picker>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { appointmentService } from '@/services/api';
import AppointmentsTable from '@/components/tables/Appointments';
export default {
  components: {
    AppointmentsTable,
  },
  props: {
    doctorId: { type: String, required: true },
  },
  data: () => ({
    date: null,
    appointmentsData: [],
    timeSlots: [],
  }),
  computed: {
    appointments() {
      return (this.appointmentsData || []).map((appointment) => ({
        ...appointment,
        patient: {
          ...appointment.patientId,
          age: 0,
        },
      }));
    },
  },
  async created() {
    this.date = new Date().toISOString().split('T')[0];
  },
  watch: {
    async date(val) {
      await this.setData();
    },
  },
  methods: {
    async setData() {
      const { appointments, timeSlots } =
        await appointmentService.getByDoctorIdAndData(this.doctorId, this.date);
      this.appointmentsData = appointments;
      this.timeSlots = timeSlots;
      console.log(this.appointmentsData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
