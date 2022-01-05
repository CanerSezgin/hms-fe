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
      type: 'doctor',
      title: 'Doctor',
      defaultForm: {
        name: '',
        surname: '',
        specialization: '',
        email: '',
        password: '',
        fee: 0,
      },
      dynamicHeaders: [
        { text: 'Specialization', value: 'specialization' },
        { text: 'Email', value: 'email' },
        { text: 'Fees', value: 'fee' },
      ],
      isReadOnly: false,
    };
  },
};
</script>
