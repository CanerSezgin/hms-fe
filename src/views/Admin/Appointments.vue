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
        <AppointmentsDrCtrl
          v-if="doctorId"
          :doctorId="doctorId"
          :key="doctorId"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AppointmentsDrCtrl from '@/components/tables/AppointmentsDrCtrl';
import SelectDoctor from '@/components/selectors/SelectDoctor';
export default {
  components: {
    AppointmentsDrCtrl,
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
