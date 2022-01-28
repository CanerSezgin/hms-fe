<template>
  <div>
    <AppointmentsCtrl :doctorId="doctorId" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppointmentsCtrl from '@/components/tables/AppointmentsCtrl';
export default {
  components: {
    AppointmentsCtrl,
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
