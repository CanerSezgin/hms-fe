<template>
  <div>
    <v-row>
      <v-col> Appointment History of Patient </v-col>
      <v-col>
        <v-textarea label="Patient Story" hide-details></v-textarea>
        <v-textarea label="Diagnosis" hide-details></v-textarea>

        <div class="my-5">
          <v-btn class="mx-1" color="primary" outlined>Tahlil Iste</v-btn>
          <v-btn class="mx-1" color="primary" outlined>Goruntuleme Iste</v-btn>
          <v-btn class="mx-1" color="error" outlined>Prescribe</v-btn>
        </div>

        <v-row class="mt-5">
          <v-col>
            <AnalysisList title="Analysis" :analysis="analysis" />
          </v-col>
          <v-col>
            <AnalysisList title="Imaging" :analysis="imaging" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAppointmentById } from "@/services/api"
import AnalysisList from '@/components/lists/Analysis';
export default {
  components: { AnalysisList },
  data() {
    return {
      analysis: [
        {
          id: 'urine',
          text: 'Urine Analysis',
          requestedAt: '11/6/2021, 2:13:56 PM',
          status: 'pending',
        },
        {
          id: 'blood',
          text: 'Blood Analysis',
          requestedAt: '11/6/2021, 2:13:56 PM',
          status: 'done',
          result: 'x',
        },
      ],
      imaging: [
        {
          id: 'urine',
          text: 'Ultrasound Imaging',
          requestedAt: '11/6/2021, 2:13:56 PM',
          status: 'done',
          result: 'x',
        },
      ],
    };
  },
    async created(){
    const appointment = await getAppointmentById("61c86ca12e513175bc9410c9");
    console.log(appointment)
  },

};
</script>

<style lang="scss" scoped></style>
