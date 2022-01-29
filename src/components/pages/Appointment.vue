<template>
  <div v-if="isLoaded">
    {{ disabled }}
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
        <v-textarea
          v-model="appointment.patientStory"
          label="Patient Story"
          hide-details
          @keyup="sendRequestAfter({ patientStory: appointment.patientStory })"
          :disabled="disabled"
        ></v-textarea>
        <v-textarea
          v-model="appointment.diagnose"
          label="Diagnosis"
          hide-details
          @keyup="sendRequestAfter({ diagnose: appointment.diagnose })"
          :disabled="disabled"
        ></v-textarea>

        <div class="my-5">
          <RequestTest
            @requested="setData"
            title="Request Analysis"
            testType="analysis"
            :appointmentId="appointmentId"
            :doctorId="doctorId"
            :patientId="patientId"
            :disabled="disabled"
          />
          <RequestTest
            @requested="setData"
            title="Request Imaging"
            testType="imaging"
            :appointmentId="appointmentId"
            :doctorId="doctorId"
            :patientId="patientId"
            :disabled="disabled"
          />
          <v-btn class="ma-1" color="error" outlined :disabled="disabled"
            >Prescribe</v-btn
          >
          <v-btn
            @click="updateAppointment({ status: 'done' })"
            class="ma-1"
            color="success"
            outlined
            :disabled="disabled"
            >Finalize</v-btn
          >
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

    <Notification
      msg="Appointment Updated."
      :notif="notif"
      @remove="notif = false"
    />
  </div>
</template>

<script>
import { appointmentService } from '@/services/api';
import TestLists from '@/components/lists/Tests';
import AppointmentsPatientTable from '@/components/tables/AppointmentsPatient';
import RequestTest from '@/components/popups/RequestTest';
import Notification from '@/components/Notification';

export default {
  components: {
    TestLists,
    AppointmentsPatientTable,
    RequestTest,
    Notification,
  },
  props: {
    isReadOnly: { type: Boolean, default: false },
  },
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
      isLoaded: false,
      disabled: false,
      appointment: null,
      doneAppointmentsOfPatient: [],
      notif: false,
    };
  },
  async created() {
    await this.setData();
    if (this.appointment) {
      this.disabled = this.isReadOnly || this.appointment.status === 'done';
      this.isLoaded = true;
    }
  },
  methods: {
    async setData() {
      const { appointmentId } = this.$route.params;
      this.appointment = await appointmentService.getById(appointmentId);

      console.log('Appointment', this.appointment);
      const { _id: patientId } = this.appointment.patientId;
      console.log('PAtient', patientId);

      this.doneAppointmentsOfPatient = await appointmentService.getByPatientId(
        patientId,
        'done'
      );
    },
    async updateAppointment(payload) {
      await appointmentService.updateAppointment(this.appointmentId, payload);
      this.notif = true;
    },
    sendRequestAfter(payload) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.updateAppointment(payload);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped></style>
