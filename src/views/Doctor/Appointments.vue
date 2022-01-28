<template>
  <div>
    <AppointmentsDrCtrl :doctorId="doctorId" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppointmentsDrCtrl from '@/components/tables/AppointmentsDrCtrl';
export default {
  components: {
    AppointmentsDrCtrl,
  },
  computed: {
    ...mapState(['user']),
    doctorId(){
      return this.user && this.user.doctorId
    }
  },
};
</script>

<style lang="scss" scoped></style>
