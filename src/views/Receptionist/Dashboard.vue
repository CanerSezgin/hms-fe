<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-date-picker v-model="date" class="mt-4"></v-date-picker>
      </v-col>
      <v-col>
        <div v-if="isLoading">
          <Loader />
        </div>
        <div v-else>
          <v-data-table :headers="headers" :items="appointments">
            <template v-slot:[`item.status`]="{ item }">
              {{ item.status | capitalize }}
            </template>

            <template v-slot:[`item.patientId`]="{ item }">
              {{ item.patientId.name }} {{ item.patientId.surname }}
            </template>

            <template v-slot:[`item.doctorId`]="{ item }">
              {{ item.doctorId.name }} {{ item.doctorId.surname }}
            </template>

            <template v-slot:[`item.isPaid`]="{ item }">
              <span :style="`color: ${item.isPaid ? 'green' : '#D32F2F'}`">{{
                item.isPaid ? 'Paid' : 'Unpaid'
              }}</span>
            </template>

            <template v-slot:[`item.action`]="{ item }">
              <PaymentPopup :appointment="item" :disabled="item.isPaid" @submitted="setData(date)" />
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { appointmentService } from '@/services/api';
import Loader from '@/components/elements/Loader';
import PaymentPopup from "@/components/popups/Payment"

export default {
  components: { Loader, PaymentPopup },
  data() {
    return {
      isLoading: true,
      date: null,
      appointments: [],
      headers: [
        { text: 'Status', value: 'status' },
        { text: 'Time', value: 'time' },
        { text: 'Patient', value: 'patientId' },
        { text: 'Patient Email', value: 'patientId.email' },
        { text: 'Patient Phone', value: 'patientId.phone' },
        { text: 'Doctor', value: 'doctorId' },
        { text: 'Speciality', value: 'doctorId.specialization' },
        { text: 'Payment Status', value: 'isPaid' },
        { text: 'Pay Bill', value: 'action' },
      ],
    };
  },
  async created() {
    this.date = /* new Date().toISOString().split('T')[0] */ '2022-01-30';
  },
  watch: {
    async date(val) {
      if (val) {
        this.isLoading = true;
        await this.setData(val);
        this.isLoading = false;
      }
    },
  },
  methods: {
    async setData(date) {
      this.appointments = await appointmentService.getByDate(date);
      console.log(this.appointments);
    },
    openPaymentDialog() {},
  },
};
</script>

<style lang="scss" scoped></style>
