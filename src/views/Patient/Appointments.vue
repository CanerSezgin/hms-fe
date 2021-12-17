<template>
  <div>
    My Appointments
    
    <v-btn absolute top right color="primary" to="new-appointment">New Appointment</v-btn>
    <v-row class="mt-5">
      <v-col cols="4" v-for="appointment in appointments" :key="appointment.id">
        <v-card dark height="200"> App 1 </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        appointments: [
          {},
          {},
          {},
          {}
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>