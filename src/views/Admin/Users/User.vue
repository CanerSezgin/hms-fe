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
      <template v-slot:top v-if="!isReadOnly">
        <v-toolbar flat>
          <v-toolbar-title>{{ title }} List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="mb-2" @click="openNewItemForm">
            Add {{ title }}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        {{ item.name }} {{ item.surname }}
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
      <UserForm
        :title="title"
        :form="form"
        :actionType="actionType"
        @close="formDialog = false"
        @save="save"
      />
    </v-dialog>
  </div>
</template>

<script>
import { userService } from '@/services/api';
import UserForm from '@/components/forms/User';

export default {
  components: { UserForm },
  props: {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    defaultForm: {
      type: Object,
      required: true,
    },
    dynamicHeaders: {
      type: Array,
      default: [],
    },
    isReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      form: {},
      formDialog: false,
      dialogDelete: false,
      actionType: '',
      items: [],
    };
  },
  computed: {
    headers() {
      const headers = [
        { text: 'id', value: '_id' },
        { text: 'Name Surname', value: 'name' },
        ...this.dynamicHeaders,
      ];

      if (!this.isReadOnly) {
        headers.push({ text: 'Actions', value: 'actions', sortable: false });
      }
      return headers;
    },
  },
  async created() {
    await this.setItems();
  },

  methods: {
    async setItems() {
      this.items = await userService.getAll(this.type);
      console.log({ users: this.items });
    },
    getItem(id) {
      return this.items.find((user) => user._id === id);
    },
    openNewItemForm() {
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
      this.actionType = 'new';
      this.formDialog = true;
    },
    openEditItemForm(id) {
      const doctor = this.getItem(id);
      this.form = doctor;
      this.actionType = 'edit';
      this.formDialog = true;
    },

    async deleteItem(e, id) {
      await userService.delete(id);
      await this.setItems();
    },

    async save() {
      console.log('saving', this.form);
      if (this.actionType === 'edit') {
        await userService.update({
          userType: this.type,
          ...this.form,
        });
      } else if (this.actionType === 'new') {
        await userService.create({
          userType: this.type,
          ...this.form,
        });
      }

      await this.setItems();
      this.formDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
