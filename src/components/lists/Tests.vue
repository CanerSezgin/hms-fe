<template>
  <div>
    <v-card class="px-5 pt-2 pb-1 mb-2" color="primary" dark>
      <div class="mb-1" style="font-size: 1.2rem">{{ title }}</div>
    </v-card>
    <div v-for="(item, index) in tests" :key="index">
      <v-card class="mb-1" outlined>
        <v-list-item class="px-3" two-line>
          <v-list-item-content>
            <v-list-item-title class="primary--text mb-0">{{
              item.testTypeId.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              item.status | capitalize
            }}</v-list-item-subtitle>
            <v-list-item-subtitle class="mt-2" style="font-size: 0.75em">
              <div class="font-weight-bold">Requested At:</div>
              <div>{{ item.requestedAt | formatDateFull }}</div>
            </v-list-item-subtitle>
          </v-list-item-content>

          <div v-if="item.status === 'done'">
            <AnalysisResultTooltip :analysis="item" />
          </div>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import AnalysisResultTooltip from '@/components/elements/AnalysisResultTooltip';

export default {
  components: { AnalysisResultTooltip },
  props: {
    title: {
      type: String,
      required: true,
    },
    tests: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
