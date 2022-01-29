<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <UserInfo />

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.icon"
          link
          exact
          :to="`/doctor/${link.to}`"
          active-class="primary white--text"
          class="py-3 px-2"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <!-- Dashboard -->
          <div v-if="isHomepage">
            <div v-if="isLoading">
              <Loader />
            </div>
            <div v-else>
              <TestsTable title="Imaging List" :tests="imaging" @submitted="setData" />
              <TestsTable
                class="mt-5"
                title="Analysis List"
                :tests="analysis"
                 @submitted="setData"
              />
            </div>
          </div>

          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { appointmentService } from '@/services/api';
import UserInfo from '@/components/menu/UserInfo';
import TestsTable from '@/components/tables/Tests';
import Loader from '@/components/elements/Loader';

export default {
  components: { UserInfo, Loader, TestsTable },
  computed: {
    ...mapState(['user']),
    isHomepage() {
      return this.$route.name === 'Lab';
    },
  },
  data: () => ({
    drawer: null,
    links: [
      { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '', img: '' },
    ],
    isLoading: true,
    imaging: [],
    analysis: [],
  }),
  async created() {
    await this.setData();
    this.isLoading = false;
  },
  methods: {
    async setData() {
      const tests = await appointmentService.getPendingTests();
      this.imaging = tests.imaging;
      this.analysis = tests.analysis;
      console.log(tests)
    },
  },
};
</script>

<style lang="scss" scoped></style>
