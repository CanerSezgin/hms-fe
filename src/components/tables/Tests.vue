<template>
  <div>
    <v-row>
      <v-col cols="10" offset="1">
        <div class="title mb-5">{{ title }}</div>
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

          <template v-slot:[`item.result`]="{ item }">
            <div v-if="isResultReadOnly">
              {{ item.fileId }}
            </div>
            <div v-else>
              <TestResult
                :testId="item._id"
                @submitted="$emit('submitted')"
              />
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TestResult from '@/components/popups/TestResult';
export default {
  components: { TestResult },
  props: {
    title: { type: String, required: true },
    tests: { type: Array, required: true },
    isResultReadOnly: { type: Boolean, default: false },
  },
  data() {
    return {
      isLoading: true,
      headers: [
        { text: 'Date', value: 'requestedAt' },
        { text: 'Status', value: 'status' },
        { text: 'Doctor', value: 'doctorId' },
        { text: 'Test', value: 'testTypeId.name' },
        { text: 'Result', value: 'result' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
