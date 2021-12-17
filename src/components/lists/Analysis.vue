<template>
  <div>
    <div class="mb-1" style="font-size: 1.3rem">{{ title }}</div>
    <div v-for="(item, index) in analysis" :key="index">
      <v-card class="mb-1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
            <v-list-item-subtitle>{{
              item.status | capitalize
            }}</v-list-item-subtitle>

            <div
              v-if="item.result"
              style="position: absolute; right: 15px; cursor: pointer"
              @click=""
            >
              <v-icon>mdi-file-chart-outline</v-icon>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    analysis: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
