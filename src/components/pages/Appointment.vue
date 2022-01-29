<template>
  <div>
    <Loader v-if="isLoading" />

    <v-row v-else>
      <v-col cols="7">
        <v-card outlined>
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

        <v-card class="mt-5" outlined>
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

        <v-card class="mt-5" outlined>
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

        <div class="mt-5 mb-9">
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
          <Prescribe
            @prescribed="setData"
            :appointmentId="appointmentId"
            :doctorId="doctorId"
            :patientId="patientId"
            :disabled="!!prescription || disabled"
          />
          <v-btn
            @click="finalize"
            class="ma-1"
            color="success"
            outlined
            :disabled="disabled"
            >Finalize</v-btn
          >
        </div>

        <v-card class="mt-4" v-if="prescription">
          <v-card class="px-5 pt-2 pb-1 mb-2" color="primary" dark>
            Prescription
          </v-card>
          <v-card-text>
            <div>{{ prescription.description }}</div>
          </v-card-text>
        </v-card>

        <v-row class="mt-4" no-gutters>
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
import Prescribe from '@/components/popups/Prescribe';
import Notification from '@/components/elements/Notification';
import Loader from '@/components/elements/Loader';

export default {
  components: {
    TestLists,
    AppointmentsPatientTable,
    RequestTest,
    Prescribe,
    Notification,
    Loader,
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
    prescription() {
      return (this.appointment && this.appointment.prescription) || null;
    },
  },
  data() {
    return {
      isLoading: true,
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
      this.isLoading = false;
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
    async finalize(){
      await this.updateAppointment({ status: 'done' })
      this.disabled = true
      await this.setData()
    }
  },
};
</script>

<style lang="scss" scoped></style>
