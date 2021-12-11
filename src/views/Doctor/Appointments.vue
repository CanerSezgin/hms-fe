<template>
  <div>
    <template>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <AppointmentsTable :appointments="appointments" />
        </v-col>
        <v-col cols="12" md="4">
          <v-date-picker v-model="date" class="mt-4"></v-date-picker>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import AppointmentsTable from '@/components/tables/Appointments';
export default {
  components: {
    AppointmentsTable,
  },
  data: () => ({
    date: new Date().toISOString().split('T')[0],
    mockData: {
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
  }),
  computed: {
    appointments() {
      return this.mockData[this.date] || [];
    },
  },

  methods: {
    allowedDates: (val) => !['2021-11-06', '2021-11-07'].includes(val),
  },
};
</script>

<style lang="scss" scoped></style>
