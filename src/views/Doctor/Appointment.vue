<template>
  <div v-if="appointment">
    <v-row>
      <v-col cols="7">
        <v-card>
          <v-card color="primary" dark class="px-5 pa-2"
            >Appointment Information</v-card
          >
          <v-card-text class="py-3">
            <div>
              <v-icon class="mb-1 mr-3">mdi-clipboard-text-clock</v-icon>
              {{ appointment.date | formatDate }}
            </div>
            <div>
              <v-icon class="mb-1 mr-3">mdi-clock-outline</v-icon>
              {{ appointment.time }}
            </div>
          </v-card-text>
        </v-card>

        <v-card class="mt-5">
          <v-card color="primary" dark class="px-5 pa-2"
            >Patient Information</v-card
          >

          <v-card-text class="py-3">
            <div class="title mb-2">
              {{ appointment.patientId.name }}
              {{ appointment.patientId.surname }}
            </div>
            <div style="display: flex">
              <div style="width: 50%">
                <v-icon class="mb-2 mr-3">mdi-email</v-icon>
                {{ appointment.patientId.email }}
              </div>
              <div style="width: 50%">
                <v-icon class="mb-2 mr-3">mdi-phone</v-icon
                >{{ appointment.patientId.phone }}
              </div>
            </div>
            <div style="display: flex">
              <div style="width: 50%">
                <v-icon class="mb-2 mr-3">mdi-podium-gold</v-icon
                >{{ appointment.patientId.age }}
              </div>
              <div style="width: 50%">
                <v-icon class="mb-2 mr-3">mdi-gender-male-female</v-icon
                >{{ appointment.patientId.gender | formatGender }}
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="mt-5">
          <v-card color="primary" dark class="px-5 pa-2"
            >Patient History</v-card
          >

          <AppointmentsPatientTable
            :appointments="doneAppointmentsOfPatient"
            :isDone="true"
          />
        </v-card>
      </v-col>
      <v-col>
        <v-textarea label="Patient Story" hide-details></v-textarea>
        <v-textarea label="Diagnosis" hide-details></v-textarea>

        <div class="my-5">
          <RequestTest
            @requested="setData"
            title="Request Analysis"
            testType="analysis"
            :appointmentId="appointmentId"
            :doctorId="doctorId"
            :patientId="patientId"
          />
          <RequestTest
            @requested="setData"
            title="Request Imaging"
            testType="imaging"
            :appointmentId="appointmentId"
            :doctorId="doctorId"
            :patientId="patientId"
          />
          <v-btn class="ma-1" color="error" outlined>Prescribe</v-btn>
        </div>

        <v-row class="mt-5" no-gutters>
          <v-col class="mr-1">
            <TestLists title="Analysis" :tests="analysis" />
          </v-col>
          <v-col class="ml-1">
            <TestLists title="Imaging" :tests="imaging" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { appointmentService } from '@/services/api';
import TestLists from '@/components/lists/Tests';
import AppointmentsPatientTable from '@/components/tables/AppointmentsPatient';
import RequestTest from '@/components/popups/RequestTest';

export default {
  components: { TestLists, AppointmentsPatientTable, RequestTest },
  computed: {
    appointmentId() {
      return this.appointment && this.appointment._id;
    },
    doctorId() {
      return this.appointment && this.appointment.doctorId;
    },
    patientId() {
      return (
        this.appointment &&
        this.appointment.patientId &&
        this.appointment.patientId._id
      );
    },
    analysis() {
      return (
        (this.appointment &&
          this.appointment.tests &&
          this.appointment.tests.analysis) ||
        []
      );
    },
    imaging() {
      return (
        (this.appointment &&
          this.appointment.tests &&
          this.appointment.tests.imaging) ||
        []
      );
    },
  },
  data() {
    return {
      appointment: null,
      doneAppointmentsOfPatient: [],
    };
  },
  async created() {
    await this.setData();
  },
  methods: {
    async setData() {
      const { appointmentId } = this.$route.params;
      this.appointment = await appointmentService.getById(appointmentId);

      console.log(this.appointment);
      const { _id: patientId } = this.appointment.patientId;
      console.log('PAtient', patientId);

      this.doneAppointmentsOfPatient = await appointmentService.getByPatientId(
        patientId,
        'done'
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
