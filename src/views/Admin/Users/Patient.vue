<template>
  <div>
    <User
      :type="type"
      :title="title"
      :defaultForm="defaultForm"
      :dynamicHeaders="dynamicHeaders"
      :isReadOnly="isReadOnly"
    />
  </div>
</template>

<script>
import User from '@/views/Admin/Users/User';
export default {
  components: { User },
  data() {
    return {
      type: 'patient',
      title: 'Patient',
      defaultForm: {},
      dynamicHeaders: [
        { text: 'Email', value: 'email' },
      ],
      isReadOnly: true,
    };
  },
};
</script>
