<template>
  <div>
    <template>
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

          <v-card v-if="doctor" class="mt-2">
            <v-img height="" contain :src="doctor.img"></v-img>
            <div class="pa-4">{{ doctor.brief }}</div>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <div v-if="doctor">
            <v-date-picker
              full-width
              v-model="date"
              :min="dates[0]"
              :max="dates[1]"
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

            <v-btn class="mt-4" color="primary" large block :disabled="!slot"
              >Schedule an Appointment</v-btn
            >
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-list v-if="doctor">
            <div v-for="(item, index) in timeTable" :key="index">
              <v-list-item
                @click="slot = item.time"
                :disabled="!!item.patient"
                :style="`color: ${
                  slot === item.time ? 'blue' : item.patient ? 'red' : 'gray'
                }`"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <div style="display: flex">
                      <div style="width: 125px">{{ item.time }}</div>
                      <div class="text-center" style="width: 100%">
                        <div v-if="slot === item.time">Selected</div>
                        <div v-else>
                          <div v-if="!item.patient">Available</div>
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
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import specializations from '@/assets/json/spec.json';
import { userService, appointmentService } from '@/services/api';
import timeTable from '@/utils/timeTable';
export default {
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
    mockData: {
      doc1: {
        '2021-12-14': [
          {
            status: true,
            time: '09:00 - 09:30',
            patient: {
              name: 'Jane Doe',
              gender: 'f',
              phone: 5126578565,
              age: '38',
            },
          },
          {
            status: true,
            time: '09:30 - 10:00',
            patient: {
              name: 'John Doe',
              gender: 'm',
              email: 'john.doe@mail.com',
              phone: 5786523564,
              age: '16',
            },
          },
          {
            status: true,
            time: '10:00 - 10:30',
            patient: {
              name: 'Mary Jane',
              gender: 'f',
              email: 'mary.jane@mail.com',
              age: '21',
            },
          },
          {
            status: false,
            time: '14:00 - 14:30',
            patient: {
              name: 'William Jones',
              gender: 'm',
              email: 'william.jones@mail.com',
              phone: 5972648835,
              age: '22',
            },
          },
        ],
        '2021-11-05': [
          {
            status: true,
            time: '10:00 - 10:30',
            patient: {
              name: 'Mary Jane',
              gender: 'f',
              email: 'mary.jane@mail.com',
              age: '21',
            },
          },
          {
            status: true,
            time: '10:30 - 11:00',
            patient: {
              name: 'Mary Jane',
              gender: 'f',
              email: 'mary.jane@mail.com',
              age: '21',
            },
          },
          {
            status: true,
            time: '14:00 - 14:30',
            patient: {
              name: 'Mary Jane',
              gender: 'f',
              email: 'mary.jane@mail.com',
              age: '21',
            },
          },
          {
            status: false,
            time: '15:00 - 15:30',
            patient: {
              name: 'William Jones',
              gender: 'm',
              email: 'william.jones@mail.com',
              phone: 5972648835,
              age: '22',
            },
          },
        ],
      },
      doc2: {
        '2021-11-04': [
          {
            status: true,
            time: '09:00 - 09:30',
            patient: {
              name: 'Jane Doe',
              gender: 'f',
              phone: 5126578565,
              age: '38',
            },
          },
          {
            status: true,
            time: '09:30 - 10:00',
            patient: {
              name: 'John Doe',
              gender: 'm',
              email: 'john.doe@mail.com',
              phone: 5786523564,
              age: '16',
            },
          },
          {
            status: true,
            time: '10:00 - 10:30',
            patient: {
              name: 'Mary Jane',
              gender: 'f',
              email: 'mary.jane@mail.com',
              age: '21',
            },
          },
          {
            status: false,
            time: '14:00 - 14:30',
            patient: {
              name: 'William Jones',
              gender: 'm',
              email: 'william.jones@mail.com',
              phone: 5972648835,
              age: '22',
            },
          },
        ],
        '2021-11-05': [
          {
            status: true,
            time: '14:00 - 14:30',
            patient: {
              name: 'Mary Jane',
              gender: 'f',
              email: 'mary.jane@mail.com',
              age: '21',
            },
          },
          {
            status: false,
            time: '15:00 - 15:30',
            patient: {
              name: 'William Jones',
              gender: 'm',
              email: 'william.jones@mail.com',
              phone: 5972648835,
              age: '22',
            },
          },
        ],
      },
    },
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
  },

  methods: {
    allowedDates: (val) => !['2021-11-06', '2021-11-07'].includes(val),
    async fetchDoctors(spec) {
      this.doctors = (await userService.getDoctorsBySpec(spec)) || [];
      console.log(this.doctors)
    },
    async fetchAppointmets(doctor, date) {
      const { appointments, timeSlots } = await appointmentService.getByDoctorIdAndData(doctor._id, date)
      console.log({ appointments, timeSlots })
      this.appointments = appointments
      this.timeTable = timeTable(appointments, timeSlots)
      console.log("TT", this.timeTable)
    },
  },
};
</script>

<style lang="scss" scoped></style>
