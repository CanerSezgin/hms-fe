<template>
  <span>
    <v-btn @click="openDialog" class="mx-1" color="orange" outlined small
      >Upload Test Result</v-btn
    >
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-toolbar class="title" color="primary" dark>Test Result </v-toolbar>
        <v-card-text>
          <v-textarea
            v-model="result"
            label="Test Result"
            hide-details
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="primary" @click="submit">Submit</v-btn>

          <v-btn text @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Notification
      msg="Test Result Uploaded."
      :notif="notif"
      @remove="notif = false"
    />
  </span>
</template>

<script>
import { appointmentService } from '@/services/api';
import Notification from '@/components/elements/Notification';
export default {
  components: { Notification },
  props: {
    testId: { type: String, required: true },
  },
  data() {
    return {
      dialog: false,
      result: '',
      notif: false,
    };
  },
  methods: {
    async submit() {
      if (this.result.length) {
        await appointmentService.uploadTestResult(this.testId, this.result);
        this.closeDialog();
        this.$emit('submitted');
        this.notif = true;
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
