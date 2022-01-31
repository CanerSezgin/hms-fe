<template>
  <span>
    <v-btn icon @click="openDialog" color="red darken-2" :disabled="disabled">
      <v-icon>mdi-credit-card-settings-outline</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="900" persistent>
      <v-card>
        <v-toolbar class="title" color="success" dark
          >Invoice & Payment</v-toolbar
        >
        <v-row no-gutters>
          <v-col class="ma-5">
            <v-card class="ml-5" elevation="0">
              <v-card-text class="mt-5">
                <table v-if="tests.length" class="tests-table">
                  <tr>
                    <th>Test Name</th>
                    <th>Test Cost</th>
                  </tr>
                  <tr v-for="(test, index) in tests" :key="index">
                    <td>{{ test.testTypeId.name }}</td>
                    <td>${{ test.testTypeId.fee }}</td>
                  </tr>
                </table>

                <table class="treatment-table">
                  <tr>
                    <td>Treatment Cost:</td>
                    <td>${{ doctorFee }}</td>
                  </tr>
                </table>

                <table class="total-table">
                  <tr>
                    <td>Total Cost:</td>
                    <td>${{ totalCost }}</td>
                  </tr>
                </table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="ma-5">
            <v-card class="mt-10 mr-10 px-5 pb-5 pt-2" color="#e8eaf6">
              <v-card-title>Pay With Credit Card</v-card-title>
              <v-text-field
                label="Credit Card Holder"
                color="blue-grey darken-2"
                hide-details
                class="mb-3"
                outlined
              ></v-text-field>
              <v-text-field
                label="Credit Card Number"
                color="blue-grey darken-2"
                hide-details
                class="mb-3"
                outlined
              ></v-text-field>
              <v-text-field
                label="Expiration Date"
                color="blue-grey darken-2"
                hide-details
                class="mb-3"
                outlined
              ></v-text-field>
              <v-text-field
                label="CVV Security Code"
                color="blue-grey darken-2"
                hide-details
                class="mb-3"
                outlined
              ></v-text-field>
            </v-card>
          </v-col>
        </v-row>

        <v-card-actions class="justify-end">
          <v-btn text color="success" @click="submit">Make Payment</v-btn>

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
    appointment: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    appointmentId() {
      return this.appointment._id;
    },
    doctorFee() {
      return this.appointment.doctorId.fee;
    },
    totalCost() {
      return this.doctorFee + this.totalTestsCost;
    },
    tests() {
      return [
        ...(this.appointment.tests.analysis || []),
        ...(this.appointment.tests.imaging || []),
      ];
    },
    totalTestsCost() {
      return this.tests.reduce((tot, test) => {
        tot += test.testTypeId.fee;
        return tot;
      }, 0);
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    async submit() {
      await appointmentService.updateAppointment(this.appointmentId, {
        isPaid: true,
      });
      this.closeDialog();
      this.$emit('submitted');
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

<style lang="scss" scoped>
table tr th,
td {
  padding: 15px 35px;
  width: 200px;
}
td:nth-child(2),
th:nth-child(2) {
  width: 150px;
}

.tests-table {
  background: #e3f2fd;
}

.treatment-table {
  background: #e8eaf6;
}

.total-table {
  background: #455a64;
  color: white;
}
</style>
