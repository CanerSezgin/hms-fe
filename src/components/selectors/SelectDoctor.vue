<template>
  <div>
    <v-combobox
      v-model="specialization"
      :items="specializations"
      label="Select Specializations"
      outlined
      hide-details
    ></v-combobox>
    <v-select
      v-if="specialization"
      v-model="doctor"
      :items="doctors"
      class="mt-3"
      label="Select Doctor"
      outlined
      hide-details
      item-text="fullname"
      :return-object="true"
    >
    </v-select>
  </div>
</template>

<script>
import { userService } from '@/services/api';
import specializations from '@/assets/json/spec.json';

export default {
  data() {
    return {
      specializations,
      specialization: '',
      doctors: [],
      doctor: null,
    };
  },
  watch: {
    async specialization(val) {
      this.doctor = null;
      if (val) {
        await this.fetchDoctors(val);
      }
      this.$emit('changeSpecialization', val);
    },
    async doctor(val) {
      this.$emit('changeDoctor', val);
    },
  },
  methods: {
    async fetchDoctors(spec) {
      this.doctors = (await userService.getDoctorsBySpec(spec)) || [];
    },
  },
};
</script>

<style lang="scss" scoped></style>
