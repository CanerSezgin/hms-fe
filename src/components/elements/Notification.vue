<template>
  <div>
    <v-alert
      v-model="notif"
      color="primary"
      dark
      style="position: fixed; bottom: 0; right: 0"
      :style="`width: ${width}px;`"
    >
      {{ msg }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    width: { type: Number, default: 330 },
    msg: { type: String, required: true },
    notif: { type: Boolean, required: true },
  },
  watch: {
    notif(val) {
      if (val) {
        setTimeout(() => {
          this.$emit('remove');
        }, 3000);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
