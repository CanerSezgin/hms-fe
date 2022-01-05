<template>
  <v-card>
    <v-card-title class="primary white--text">
      <span class="text-h6">Add Doctor</span>
    </v-card-title>

    <v-card-text class="mt-6">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="Name"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.surname"
              label="Surname"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-combobox
              v-model="form.specialization"
              :items="specializations"
              label="Specializations"
              outlined
              hide-details
            ></v-combobox>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.email"
              label="Email"
              outlined
              hide-details
              :readonly="actionType === 'edit'"
              :filled="actionType === 'edit'"
            ></v-text-field>
          </v-col>
          <v-col cols="12" v-if="Object.keys(form).includes('password')">
            <v-text-field
              v-model="form.password"
              label="Password"
              outlined
              hide-details
            ></v-text-field>
            <v-btn dark small color="primary" @click="generatePassword">Generate Random Password</v-btn>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.fee"
              label="Consultancy Fee"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('close')"> Cancel </v-btn>
      <v-btn color="blue darken-1" text @click="$emit('save')"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    form: { type: Object, required: true },
    actionType: { type: String, required: true }
  },

  data() {
    return {
      specializations: ['val1', 'val2'],
    };
  },
  methods: {
    generatePassword() {
      this.form.password = Math.random().toString(36).slice(-8);
    }
  },
};
</script>

<style lang="scss" scoped></style>
