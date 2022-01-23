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

     <v-btn @click="authDialog = true" color="primary"> Login</v-btn>

    <v-dialog
      v-model="authDialog"
      persistent
      max-width="600px"
      min-width="360px"
    >
      <v-card class="px-4" height="500">
        <v-toolbar elevation="0">
          <div class="title">Login</div>
          <v-spacer></v-spacer>
          <v-btn icon @click="authDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <LoginForm />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LoginForm from '@/components/forms/Login';
export default {
  name: 'Home',

  data() {
    return {
      authDialog: false,
    };
  },

  components: { LoginForm },
};
</script>
