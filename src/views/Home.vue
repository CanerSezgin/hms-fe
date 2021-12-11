<template>
  <div class="text-center">
    <div class="my-2">
      <v-btn to="/admin" color="primary" outlined> Login as Admin </v-btn>
    </div>
    <div class="my-2">
      <v-btn to="/doctor" color="primary" outlined> Login as Doctor </v-btn>
    </div>
    <div class="my-2">
      <v-btn to="/patient" color="primary" outlined> Login as Patient </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  components: {},
};
</script>
