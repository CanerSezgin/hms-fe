<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add Doctor</span>
    </v-card-title>
    {{ form }}

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="Name Surname"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-combobox
              v-model="form.specialization"
              :items="specializations"
              label="Specializations"
              outlined
              item-text="value"
              item-value="key"
            ></v-combobox>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="form.email" label="Email"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.password"
              label="Password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.fee"
              label="Consultancy Fee"
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
  },

  data() {
    return {
      specializations: [
        { key: 'x', value: 'val1' },
        { key: 'y', value: 'val2' },
      ],

      confirmPassword: '',
    };
  },
};
</script>

<style lang="scss" scoped></style>
