<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      outlined
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      sort-by="specialization"
      class="elevation-1 mt-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }} List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="mb-2" @click="openNewItemForm">
            Add {{ title }}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon color="primary">
          <v-icon small class="mr-2" @click="openEditItemForm(item._id)">
            mdi-pencil
          </v-icon>
        </v-btn>

        <v-menu offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red" icon v-bind="attrs" v-on="on">
              <v-icon small> mdi-delete </v-icon>
            </v-btn>
          </template>
          <div>
            <v-btn>Cancel</v-btn>
          </div>
          <div>
            <v-btn color="error" block @click="(e) => deleteItem(e, item._id)"
              >Delete</v-btn
            >
          </div>
        </v-menu>
      </template>
    </v-data-table>

    <v-dialog v-model="formDialog" max-width="500px">
      <TestType
        :form="form"
        :actionType="actionType"
        @close="formDialog = false"
        @save="save"
      />
    </v-dialog>
  </div>
</template>

<script>
import { testTypesService } from '@/services/api';
import TestType from '@/components/forms/TestType';

export default {
  components: { TestType },
  props: {
    type: { type: String, required: true },
    title: { type: String, required: true },
  },
  data: () => ({
    search: '',
    form: {},
    formDialog: false,
    dialogDelete: false,
    actionType: '',

    headers: [
      {
        text: 'Name',
        value: 'name',
      },
      { text: 'Fees', value: 'fee' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: [],
  }),

  async created() {
    await this.setItems();
  },

  methods: {
    async setItems() {
      this.items = await testTypesService.get(this.type);
      console.log(this.items);
    },
    getDefaultForm() {
      return {
        type: this.type,
        name: '',
        fee: 0,
      };
    },
    getItem(id) {
      return this.items.find((item) => item._id === id);
    },
    openNewItemForm() {
      this.form = this.getDefaultForm();
      this.actionType = 'new';
      this.formDialog = true;
    },
    openEditItemForm(id) {
      const item = this.getItem(id);
      this.form = {
        type: this.type,
        name: item.name,
        fee: item.fee,
      };
      this.actionType = 'edit';
      this.formDialog = true;
    },

    async deleteItem(e, id) {
      await testTypesService.delete(id);
      await this.setItems();
    },

    async save() {
      console.log('saving', this.form);
      if (this.actionType === 'edit') {
        await testTypesService.update(this.form);
      } else if (this.actionType === 'new') {
        await testTypesService.create(this.form);
      }

      await this.setItems();
      this.formDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
