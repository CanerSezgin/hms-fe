<template>
  <v-card>
    <v-card-title class="primary white--text">
      <span class="text-h6">Add Imaging</span>
    </v-card-title>

    <v-card-text class="mt-6">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="Name"
              outlined
              :readonly="actionType === 'edit'"
              :filled="actionType === 'edit'"
              hide-details
            ></v-text-field>
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
};
</script>

<style lang="scss" scoped></style>
