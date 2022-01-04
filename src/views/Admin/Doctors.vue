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
          <v-toolbar-title>Doctor List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="mb-2" @click="openNewItemForm">
            Add Doctor
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        {{ item.name }} {{ item.surname }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon color="primary">
          <v-icon small class="mr-2" @click="openEditItemForm(item.id)">
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
            <v-btn color="error" block @click="(e) => deleteItem(e, item.id)"
              >Delete</v-btn
            >
          </div>
        </v-menu>
      </template>
    </v-data-table>

    <v-dialog v-model="formDialog" max-width="500px">
      Form: {{ form }}
      <Doctor :form="form" @close="formDialog = false" @save="save" />
    </v-dialog>
  </div>
</template>

<script>
import { doctorService } from '@/services/api';
import Doctor from '@/components/forms/Doctor';

export default {
  components: { Doctor },
  data: () => ({
    search: '',
    form: {},
    formDialog: false,
    dialogDelete: false,

    headers: [
      { text: 'id', value: 'id' },
      {
        text: 'Name Surname',
        value: 'name',
      },
      { text: 'Specialization', value: 'specialization' },
      { text: 'Email', value: 'email' },
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
      this.items = await doctorService.getAll();
      console.log({ doctors: this.items });
    },
    getDefaultForm() {
      return {
        name: '',
        surname: '',
        specialization: '',
        email: '',
        password: '',
        fee: 0,
      };
    },
    getItem(id) {
      return this.items.find((doctor) => doctor.id === id);
    },
    openNewItemForm() {
      this.form = this.getDefaultForm();
      this.formDialog = true;
    },
    openEditItemForm(id) {
      const doctor = this.getItem(id);
      this.form = doctor;
      this.formDialog = true;
    },
    async deleteItem(e, id) {
      await doctorService.delete(id);
      await this.setItems();
    },

    async save() {
      console.log('saving', this.form);
      await doctorService.create(this.form);
      await this.setItems();
      this.formDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
