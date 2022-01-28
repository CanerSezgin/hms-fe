<template>
  <div class="text-center">
    <v-row>
      <v-col cols="8" offset="2">
        <SelectDoctor
          @changeSpecialization="onChangeSpecialization"
          @changeDoctor="onChangeDoctor"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <AppointmentsCtrl
          v-if="doctorId"
          :doctorId="doctorId"
          :key="doctorId"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AppointmentsCtrl from '@/components/tables/AppointmentsCtrl';
import SelectDoctor from '@/components/selectors/SelectDoctor';
export default {
  components: {
    AppointmentsCtrl,
    SelectDoctor,
  },
  data() {
    return {
      doctorId: null,
    };
  },
  methods: {
    onChangeSpecialization(val) {
      console.log(val);
    },
    onChangeDoctor(doctor) {
      if (!doctor) {
        this.doctorId = null;
      } else {
        const { _id: doctorId } = doctor;
        console.log('on change doc', doctorId);
        this.doctorId = doctorId;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
