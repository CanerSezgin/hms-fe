<template>
  <div>
    <div v-if="isLoading">
      <Loader />
    </div>

    <!-- date
    doctor 
    specialization
    test name
    result -->

    <div v-else>
      <v-row>
        <v-col cols="10" offset="1">
          <div class="title mb-5">Imaging List</div>
          <v-data-table
            :headers="headers"
            :items="tests"
            :items-per-page="10"
            class="elevation-1"
          >
            <template v-slot:[`item.requestedAt`]="{ item }">
              {{ item.requestedAt | formatDateFull }}
            </template>

            <template v-slot:[`item.status`]="{ item }">
              {{ item.status | capitalize }}
            </template>

            <template v-slot:[`item.doctorId`]="{ item }">
              {{ item.doctorId.name }} {{ item.doctorId.surname }}
            </template>


          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { appointmentService } from '@/services/api';
import Loader from '@/components/elements/Loader';
export default {
  components: { Loader },
  computed: {
    ...mapGetters(['userId']),
  },
  data() {
    return {
      isLoading: true,
      tests: [],
      headers: [
        { text: 'Date', value: 'requestedAt' },
        { text: 'Status', value: 'status' },
        { text: 'Doctor', value: 'doctorId' },
        { text: 'Test', value: 'testTypeId.name' },
        { text: 'Result', value: 'testTypeId.result' },
      ],
    };
  },
  async created() {
    await this.setData();
    this.isLoading = false;
  },
  methods: {
    async setData() {
      this.tests = (await appointmentService.getTestsByPatientId(this.userId)).imaging
      console.log(this.tests)
    },
  },
};
</script>

<style lang="scss" scoped></style>
