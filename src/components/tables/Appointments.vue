<template>
  <v-card>
    <v-card-title>
      Appointments
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="timeTable"
      :items-per-page="20"
      sort-by="time"
      disable-sort
      hide-default-footer
    >
      <template v-slot:[`item.status`]="{ item }">
        <div v-if="item.status">
          <v-icon color="primary"> mdi-check </v-icon>
        </div>
        <div v-else>---</div>
      </template>

      <template v-slot:[`item.patient`]="{ item }">
        <div v-if="item.patient" style="display: flex">
          <div class="mx-2" style="width: 100px">
            {{ item.patient.name }}
          </div>

          <div class="mx-2">{{ item.patient.age }} y.</div>
          <div>
            <div v-if="item.patient.gender === 'm'">
              <v-icon color="primary" class="mx-2"> mdi-gender-male </v-icon>
            </div>
            <div v-else-if="item.patient.gender === 'f'">
              <v-icon color="pink" class="mx-2">mdi-gender-female</v-icon>
            </div>
          </div>

          <div>
            <v-menu open-on-hover :close-on-content-click="false" right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="mx-2"
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!item.patient.email"
                  >mdi-email</v-icon
                >
              </template>

              <v-card class="py-2 px-4">{{ item.patient.email }}</v-card>
            </v-menu>
          </div>
          <div>
            <v-menu open-on-hover :close-on-content-click="false" right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="mx-2"
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!item.patient.phone"
                  >mdi-cellphone</v-icon
                >
              </template>

              <v-card class="py-2 px-4">
                <span>{{ item.patient.phone | formatPhone }}</span>
              </v-card>
            </v-menu>
          </div>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    appointments: { type: Array, required: true },
  },
  data() {
    return {
      headers: [
        { text: 'Status', value: 'status' },
        { text: 'Time', value: 'time' },
        { text: 'Patient', value: 'patient' },
      ],
      time: [
        '09:00 - 09:30',
        '09:30 - 10:00',
        '10:00 - 10:30',
        '10:30 - 11:00',
        '11:00 - 11:30',
        '11:30 - 12:00',
        '13:00 - 13:30',
        '13:30 - 14:00',
        '14:00 - 14:30',
        '14:30 - 15:00',
        '15:00 - 15:30',
        '15:30 - 16:00',
      ],
    };
  },
  computed: {
    timeTable() {
      return this.time.map((t) => {
        const appointment =
          this.appointments.find((app) => app.time === t) || {};
        return {
          time: t,
          ...appointment,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
