<template>
  <v-form ref="loginForm" v-model="isFormValid" lazy-validation>
    <v-row class="mt-10">
      <v-col cols="12">
        <v-text-field
          v-model="form.email"
          @keypress="handleKeyPress"
          :rules="validationRules.email"
          label="E-mail"
          required
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="form.password"
          @click:append="showPassword = !showPassword"
          @keypress="handleKeyPress"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="validationRules.password"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          outlined
          required
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
        <v-btn
          x-large
          block
          :disabled="!isFormValid"
          color="primary"
          @click="submit"
        >
          Login
        </v-btn>
      </v-col>
    </v-row>

    <v-alert class="mt-7" v-if="error" color="error" dark>
      {{ error }}
    </v-alert>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

class LoginForm {
  constructor() {
    this.email = 'test@patient.com';
    this.password = '12345678';
  }
}

export default {
  data() {
    return {
      form: new LoginForm(),
      validationRules: {
        email: [
          (v) => !!v || 'Email is required.',
          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: [
          (v) => !!v || 'Password is required.',
          (v) => (v && v.length >= 8) || 'Min 8 characters',
        ],
      },
      isFormValid: true,
      showPassword: false,
      error: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    handleKeyPress(e) {
      if (this.error) this.error = '';
    },
    async submit() {
      if (this.$refs.loginForm.validate()) {
        console.log('submitting');
        try {
          await this.login(this.form);
        } catch ({ response }) {
          const errors = response.data.errors || [];

          console.log(errors);
          const msg = errors.map((e) => e.message).join(' | ');
          this.error = msg;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
