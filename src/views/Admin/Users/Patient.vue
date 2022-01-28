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
        { text: 'Gender', value: 'gender' },
        { text: 'Age', value: 'age' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
      ],
      isReadOnly: true,
    };
  },
};
</script>
