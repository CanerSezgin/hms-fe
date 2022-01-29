<template>
  <span>
    <v-btn
      @click="openDialog"
      class="mx-1"
      color="error"
      outlined
      :disabled="disabled"
      >Prescribe</v-btn
    >
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-toolbar class="title" color="primary" dark>Prescription</v-toolbar>
        <v-card-text>
          <v-textarea
            v-model="prescription"
            label="Prescription"
            hide-details
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="primary" @click="submit">Prescribe</v-btn>

          <v-btn text @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { appointmentService } from '@/services/api';
export default {
  props: {
    appointmentId: { type: String, required: true },
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      dialog: false,
      prescription: '',
    };
  },
  methods: {
    async submit() {
      if (this.prescription.length) {
        const payload = {
          appointmentId: this.appointmentId,
          doctorId: this.doctorId,
          patientId: this.patientId,
          description: this.prescription
        };
        console.log(payload);

        await appointmentService.prescribe(payload);
        this.closeDialog();
        this.$emit('prescribed');
      }
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
