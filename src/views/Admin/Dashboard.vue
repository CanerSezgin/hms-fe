<template>
  <div>
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else>
      <v-row class="mt-12 justify-center">
        <InfoCard
          class="mx-3"
          title="Number of Appointments"
          :value="stats.appointments.count"
          :width="cardWidth"
          color="teal"
          :dark="true"
        />

        <InfoCard
          class="mx-3"
          title="Number of Analysis"
          :value="stats.analysis.count"
          :width="cardWidth"
          color="teal"
          :dark="true"
        />

        <InfoCard
          class="mx-3"
          title="Number of Imaging"
          :value="stats.imaging.count"
          :width="cardWidth"
          color="teal"
          :dark="true"
        />
      </v-row>

      <v-row class="mt-10 justify-center">
        <InfoCard
          class="mx-3"
          title="Total Cost of Appointments"
          :value="stats.appointments.amount"
          suffix="USD"
          :width="cardWidth"
          color="teal"
          :dark="true"
        />

        <InfoCard
          class="mx-3"
          title="Total Cost of Analysis"
          :value="stats.analysis.amount"
          suffix="USD"
          :width="cardWidth"
          color="teal"
          :dark="true"
        />

        <InfoCard
          class="mx-3"
          title="Total Cost of Imaging"
          :value="stats.imaging.amount"
          suffix="USD"
          :width="cardWidth"
          color="teal"
          :dark="true"
        />
      </v-row>

      <v-row class="mt-16 justify-center">
        <v-card width="950">
          <v-card class="px-5 py-3 title" color="blue-grey darken-2" dark>
            Appointments Report by Specializations
          </v-card>

          <v-data-table
            :headers="[
              { text: 'Specialization', value: '_id.specialization' },
              { text: 'Amount (USD)', value: 'amount' },
              { text: 'Count', value: 'count' },
            ]"
            :items="stats.appointmentsBySpec"
          ></v-data-table>
        </v-card>
      </v-row>
    </div>
  </div>
</template>

<script>
import { statsService } from '@/services/api';
import Loader from '@/components/elements/Loader';
import InfoCard from '@/components/elements/InfoCard';

export default {
  components: { Loader, InfoCard },
  data() {
    return {
      isLoading: true,
      stats: {},
      cardWidth: 300,
    };
  },
  async created() {
    await this.setData();
    this.isLoading = false;
  },
  methods: {
    async setData() {
      const response = await statsService.get();

      const stats = {
        appointments: response.appointments.total,
        imaging: response.tests.aggregation.find(
          (test) => test._id.type === 'imaging'
        ),
        analysis: response.tests.aggregation.find(
          (test) => test._id.type === 'analysis'
        ),
        appointmentsBySpec: response.appointments.aggregation,
      };

      this.stats = stats;

      console.log(this.stats);
    },
  },
};
</script>

<style lang="scss" scoped></style>
