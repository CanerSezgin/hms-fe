<template>
  <div>
    <div class="title">{{ title }}</div>
    <v-data-table :headers="headers" :items="appointments" hide-default-footer>
      <template v-slot:[`item.date`]="{ item }">
        {{ item.date | formatDate }} <span class="ml-2">({{ item.time }})</span>
      </template>

      <template v-slot:[`item.doctorId`]="{ item }">
        {{ item.doctorId.name }} {{ item.doctorId.surname }}
      </template>

      <template v-slot:[`item.speciality`]="{ item }">
        {{ item.doctorId.specialization }}
      </template>

      <template v-slot:[`item.prescription`]="{ item }">
        {{ item.prescription ? item.prescription.description : '' }}
      </template>

      <template v-slot:[`item.tests`]="{ item }">
        <div>
          <span
            v-for="analysis in [
              ...(item.tests.analysis || []),
              ...(item.tests.imaging || []),
            ]"
            :key="analysis._id"
          >
            <span class="mr-1">
              <AnalysisResultTooltip :analysis="analysis" />
            </span>
          </span>
        </div>
      </template>

      <template v-slot:[`item.actions`]>
        <v-btn outlined small color="red darken-2">Cancel</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import AnalysisResultTooltip from '@/components/elements/AnalysisResultTooltip';
export default {
  props: {
    title: { type: String },
    appointments: { type: Array, required: true },
    isDone: { type: Boolean, required: true },
  },
  components: { AnalysisResultTooltip },
  computed: {
    headers() {
      if (this.isDone) {
        return [...this.baseHeaders, ...this.doneHeaders];
      } else {
        return [...this.baseHeaders, ...this.pendingHeaders];
      }
    },
  },
  data() {
    return {
      baseHeaders: [
        { text: 'Date', value: 'date' },
        { text: 'Doctor', value: 'doctorId' },
        { text: 'Speciality', value: 'speciality' },
      ],
      doneHeaders: [
        { text: 'Prescription', value: 'prescription', sortable: false },
        { text: 'Diagnosis', value: 'diagnose', sortable: false },

        { text: 'Analysis / Imaging Results', value: 'tests', sortable: false },
      ],
      pendingHeaders: [{ text: 'Actions', value: 'actions', sortable: false }],
    };
  },
};
</script>

<style lang="scss" scoped></style>
