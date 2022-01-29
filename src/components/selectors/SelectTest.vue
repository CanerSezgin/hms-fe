<template>
  <div>
    <v-combobox
      v-model="selected"
      :items="types"
      item-text="name"
      label="Select Test Type"
      outlined
      hide-details
    ></v-combobox>
  </div>
</template>

<script>
import { testTypesService } from '@/services/api';
export default {
  props: {
    testType: { type: String, required: true },
  },
  data() {
    return {
      types: [],
      selected: null,
    };
  },
  async created() {
    this.types = await testTypesService.get(this.testType);
    console.log(this.types);
  },
  watch: {
    selected(val) {
      this.$emit('selected', val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
