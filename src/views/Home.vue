<template>
  <div class="text-center">
    <div class="mt-16">
      <v-card style="margin: auto" height="500" width="500">
        <v-toolbar elevation="0" dark class="px-6" color="blue-grey darken-2">
          <div class="title">Login</div>
        </v-toolbar>
        <div class="px-8">
          <LoginForm />
        </div>
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
