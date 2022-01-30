<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="primary" dark v-bind="attrs" v-on="on">
        mdi-file-document-multiple
      </v-icon>
    </template>
    <div>
      <div class="font-weight-bold">
        {{ analysis.testTypeId.name }}
      </div>
      <v-divider dark></v-divider>
      <div>{{ analysis.fileId }}</div>
    </div>
  </v-tooltip>
</template>

<script>
export default {
  props: { analysis: { type: Object, required: true } },
};
</script>

<style lang="scss" scoped></style>
