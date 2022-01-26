<template>
  <div class="text-center">
    <div class="mt-16">
      <v-card class="px-4" style="margin: auto" height="500" width="500">
        <v-toolbar elevation="0">
          <div class="title">Login</div>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <LoginForm />
      </v-card>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/forms/Login';
export default {
  name: 'Home',
  components: { LoginForm },
};
</script>
