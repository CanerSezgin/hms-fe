<template>
  <div v-if="user">
    <v-sheet color="grey lighten-4" class="pa-4 text-center">
      <v-avatar class="mb-4" color="grey darken-1" size="64">
        <img src="" />
      </v-avatar>

      <div>
        <div>{{ user.name }} {{ user.surname }}</div>
        <div>{{ user.email }}</div>
        <div>{{ user.userType | capitalize }}</div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style lang="scss" scoped></style>
