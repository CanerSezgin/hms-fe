<template>
  <div>
    <div v-if="isLoading">
      <Loader />
    </div>

    <div v-else>
      <TestsTable
        class="mt-5"
        title="Imaging List"
        :tests="tests"
        @submitted="setData"
        :isResultReadOnly="true"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { appointmentService } from '@/services/api';
import Loader from '@/components/elements/Loader';
import TestsTable from '@/components/tables/Tests';
export default {
  components: { Loader, TestsTable },
  computed: {
    ...mapGetters(['userId']),
  },
  data() {
    return {
      isLoading: true,
      tests: [],
    };
  },
  async created() {
    await this.setData();
    this.isLoading = false;
  },
  methods: {
    async setData() {
      this.tests = (
        await appointmentService.getTestsByPatientId(this.userId)
      ).imaging;
    },
  },
};
</script>

<style lang="scss" scoped></style>
