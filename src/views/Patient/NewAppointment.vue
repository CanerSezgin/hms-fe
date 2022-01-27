<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-combobox
          v-model="specialization"
          :items="specializations"
          label="Select Specializations"
          outlined
          hide-details
        ></v-combobox>
        <v-select
          v-if="specialization"
          v-model="doctor"
          :items="doctors"
          class="mt-3"
          label="Select Doctor"
          outlined
          hide-details
          item-text="fullname"
          :return-object="true"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <div v-if="doctor">
          <v-date-picker
            full-width
            v-model="date"
            :min="dates[0]"
            :max="dates[1]"
            :disabled="isAppSuccesfullyCreated"
          ></v-date-picker>

          <v-card class="mt-2 py-3 px-5">
            <table>
              <tr>
                <td>Date:</td>
                <td>{{ date }}</td>
              </tr>
              <tr>
                <td>Time:</td>
                <td>{{ slot }}</td>
              </tr>
              <tr>
                <td style="width: 65px">Doctor:</td>
                <td>{{ doctor.fullname }}</td>
              </tr>
            </table>
          </v-card>

          <v-btn
            @click="scheduleAnApp"
            class="mt-4"
            color="primary"
            large
            block
            :disabled="isAppSuccesfullyCreated || !slot"
            >Schedule an Appointment</v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-list v-if="doctor">
          <div v-for="(item, index) in timeTable" :key="index">
            <v-list-item
              @click="slot = item.time"
              :disabled="isAppSuccesfullyCreated || !!item.patientId"
              :style="`color: ${
                slot === item.time
                  ? isAppSuccesfullyCreated
                    ? 'green'
                    : 'blue'
                  : item.patientId
                  ? 'red'
                  : 'gray'
              }`"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <div style="display: flex">
                    <div style="width: 125px">{{ item.time }}</div>
                    <div class="text-center" style="width: 100%">
                      <div v-if="slot === item.time">
                        {{
                          isAppSuccesfullyCreated
                            ? 'Your Appointment Is Confirmed'
                            : 'Selected'
                        }}
                      </div>
                      <div v-else>
                        <div v-if="!item.patientId">Available</div>
                        <div v-else>Reserved</div>
                      </div>
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>

        <div v-if="isAppSuccesfullyCreated">
          <v-alert class="mt-4" color="green" dark>
            Your Appointment is Confirmed.
          </v-alert>

          <div class="text-right">
            <v-btn
              to="/patient/appointments"
              class="mr-1"
              color="primary"
              outlined
              >Go To My Appointments</v-btn
            >
            <v-btn to="/patient/" class="mr-1" color="primary" outlined
              >Go To Dashboard</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import specializations from '@/assets/json/spec.json';
import { userService, appointmentService } from '@/services/api';
import timeTable from '@/utils/timeTable';
export default {
  computed: {
    ...mapGetters(['userId']),
  },
  data: () => ({
    slot: '',
    specializations,
    specialization: '',
    doctors: [],
    doctor: null,
    appointments: [],
    timeTable: null,

    dates: [
      new Date().toISOString().split('T')[0],
      new Date(new Date().getTime() + 7 * 86400000).toISOString().split('T')[0], // 7 days
    ],
    date: new Date().toISOString().split('T')[0],
    isAppSuccesfullyCreated: false,
  }),
  watch: {
    async specialization(spec) {
      this.doctor = null;
      if (spec) await this.fetchDoctors(spec);
    },
    async doctor(doctor) {
      if (doctor) await this.fetchAppointmets(doctor, this.date);
    },
    async date(date) {
      if (date) await this.fetchAppointmets(this.doctor, date);
    },
    timeTable(data) {
      console.log('timetable', data);
      this.slot = '';
    },
  },

  methods: {
    allowedDates: (val) => !['2021-11-06', '2021-11-07'].includes(val),
    async fetchDoctors(spec) {
      this.doctors = (await userService.getDoctorsBySpec(spec)) || [];
      console.log(this.doctors);
    },
    async fetchAppointmets(doctor, date) {
      const { appointments, timeSlots } =
        await appointmentService.getByDoctorIdAndData(doctor._id, date);
      console.log({ appointments, timeSlots });
      this.appointments = appointments;
      this.timeTable = timeTable(appointments, timeSlots);
      console.log('TT', this.timeTable);
    },
    async scheduleAnApp() {
      const payload = {
        doctorId: this.doctor._id,
        patientId: this.userId,
        date: this.date,
        time: this.slot,
      };
      console.log(payload, 'creating appointment');
      // await appointmentService.createAppointment(payload);
      this.isAppSuccesfullyCreated = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
