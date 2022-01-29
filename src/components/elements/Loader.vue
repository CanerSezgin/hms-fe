<template>
  <div
    class="text-center d-flex justify-space-around"
    style="margin-top: 300px"
  >
    <v-progress-circular
      v-for="(color, index) in colors"
      :key="index"
      :size="size"
      indeterminate
      :color="color"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 100,
      colors: ['primary', 'red', 'purple', 'green', 'amber'],
    };
  },
};
</script>

<style lang="scss" scoped></style>
