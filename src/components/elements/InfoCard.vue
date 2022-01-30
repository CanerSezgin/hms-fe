<template>
  <v-card :width="width"  class="text-center">
    <v-card :color="color" :dark="dark">
        <div class="py-3 title">{{ title }}</div>
    </v-card>

    <v-card-text class="display-1">
      {{ prefix }} {{ value }} {{ suffix }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['title', 'value', 'prefix', 'suffix', 'color', 'dark', 'width'],
};
</script>

<style lang="scss" scoped></style>
