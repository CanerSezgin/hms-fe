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
      type: 'receptionist',
      title: 'Receptionist',
      defaultForm: {
        name: '',
        surname: '',
        email: '',
        password: '',
      },
      dynamicHeaders: [
        { text: 'Email', value: 'email' },
      ],
      isReadOnly: false,
    };
  },
};
</script>
