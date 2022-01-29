<template>
  <div>
    <Appointment :isReadOnly="true" />
  </div>
</template>

<script>
import Appointment from '@/components/pages/Appointment';
export default {
  components: { Appointment },
};
</script>

<style lang="scss" scoped></style>
