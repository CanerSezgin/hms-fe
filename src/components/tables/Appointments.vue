<template>
  <v-card>
    <v-card-title>
      Appointments
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :key="tableKey"
      :headers="headers"
      :items="timeTable"
      :items-per-page="20"
      sort-by="time"
      disable-sort
      hide-default-footer
    >
      <template v-slot:[`item.status`]="{ item }">
        <div v-if="item.status === 'done'">
          <v-icon color="primary"> mdi-check </v-icon>
        </div>
        <div v-else>---</div>
      </template>

      <template v-slot:[`item.patient`]="{ item }">
        <div v-if="item.patient" style="display: flex">
          <div class="mx-2" style="width: 100px">
            {{ item.patient.name }} {{ item.patient.surname }}
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
                <span>{{ item.patient.phone }}</span>
              </v-card>
            </v-menu>
          </div>
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div v-if="item.patient">
          <v-btn :to="`appointment/${item._id}`" color="primary" outlined small
            >Details</v-btn
          >
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import timeTable from '@/utils/timeTable';
export default {
  props: {
    tableKey: { type: String, required: true },
    appointments: { type: Array, required: true },
    timeSlots: { type: Array, required: true },
  },
  data() {
    return {
      headers: [
        { text: 'Status', value: 'status' },
        { text: 'Time', value: 'time' },
        { text: 'Patient', value: 'patient' },
        { text: 'Actions', value: 'actions' },
      ],
    };
  },
  computed: {
    timeTable() {
      return timeTable(this.appointments, this.timeSlots);
    },
  },
};
</script>

<style lang="scss" scoped></style>
