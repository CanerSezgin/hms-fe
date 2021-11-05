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
            item-text="name"
            :return-object="true"
          ></v-select>

          <v-card v-if="doctor">
            <v-img height="" contain :src="doctor.img"></v-img>
            <div class="pa-4">{{ doctor.brief }}</div>
          </v-card>

          <v-btn block color="primary" large>Schedule an Appointment</v-btn>

          <div>
            {{ specialization }} <br />
            {{ doctor }} <br />
            {{ date }}
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <v-date-picker
            full-width
            v-model="date"
            class="mt-4"
            :min="dates[0]"
            :max="dates[1]"
          ></v-date-picker>
        </v-col>
        <v-col cols="12" md="6">
          <AppointmentsTable :appointments="appointments" />
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
    specializations: ['val1', 'val2'],
    doctorList: {
      val1: [
        {
          id: 'doc1',
          name: 'Dr. Ernest Lopez',
          img: 'https://cdn3.poz.com/24954_Doctor-Patient-iStock-92723315-XLARGE.jpg_67e4ea75-849c-419d-b32b-8970f8ae05a7_x2.jpeg',
          brief:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis molestiae, enim consectetur architecto sint, non nihil dolorem ipsam harum, porro fugit at nulla sequi! Distinctio a laboriosam sint illo aut.',
        },
        {
          id: 'doc2',
          name: 'Dr. Tanya Brooks',
          img: 'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
          brief:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis molestiae, enim consectetur architecto sint, non nihil dolorem ipsam harum, porro fugit at nulla sequi! Distinctio a laboriosam sint illo aut.',
        },
      ],
      val2: ['doc3', 'doc4', 'doc5'],
    },
    specialization: '',
    doctor: '',

    dates: [
      new Date().toISOString().split('T')[0],
      new Date(new Date().getTime() + 7 * 86400000).toISOString().split('T')[0], // 7 days
    ],
    date: new Date().toISOString().split('T')[0],
    mockData: {
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
  }),
  computed: {
    doctors() {
      return this.doctorList[this.specialization] || [];
    },

    appointments() {
      return this.mockData[this.date] || [];
    },
  },
  watch: {
    specialization(val) {
      this.doctor = '';
    },
  },

  methods: {
    allowedDates: (val) => !['2021-11-06', '2021-11-07'].includes(val),
  },
};
</script>

<style lang="scss" scoped></style>
