<template>
  <span>
    <v-btn @click="openDialog" class="mx-1" color="primary" outlined :disabled="disabled">{{
      title
    }}</v-btn>
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-toolbar class="title" color="primary" dark>{{ title }}</v-toolbar>
        <v-card-text>
          <SelectTest
            :testType="testType"
            class="mt-10"
            @selected="(v) => (selected = v)"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="primary" @click="submit">Request</v-btn>

          <v-btn text @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { appointmentService } from '@/services/api';
import SelectTest from '@/components/selectors/SelectTest';
export default {
  components: { SelectTest },
  props: {
    title: { type: String, required: true },
    testType: { type: String, required: true },
    appointmentId: { type: String, required: true },
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      dialog: false,
      selected: null,
    };
  },
  methods: {
    async submit() {
      if (this.selected) {
        const payload = {
          appointmentId: this.appointmentId,
          doctorId: this.doctorId,
          patientId: this.patientId,
          testTypeId: this.selected._id,
        };
        console.log(payload);
        await appointmentService.requestTest(payload);
        this.closeDialog();
        this.$emit("requested")
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
