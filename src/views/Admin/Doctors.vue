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
      { text: 'Password', value: 'password' },
      { text: 'Fees', value: 'fee' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    getDefaultForm() {
      return {
        name: '',
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
    initialize() {
      this.items = [
        {
          id: 1,
          name: 'Frozen Yogurt',
          specialization: 159,
          email: 6.0,
          password: 24,
          fee: 4.0,
        },
        {
          id: 2,
          name: 'Ice cream sandwich',
          specialization: 237,
          email: 9.0,
          password: 37,
          fee: 4.3,
        },
        {
          id: 3,
          name: 'Eclair',
          specialization: 262,
          email: 16.0,
          password: 23,
          fee: 6.0,
        },
        {
          id: 4,
          name: 'Cupcake',
          specialization: 305,
          email: 3.7,
          password: 67,
          fee: 4.3,
        },
        {
          id: 5,
          name: 'Gingerbread',
          specialization: 356,
          email: 16.0,
          password: 49,
          fee: 3.9,
        },
        {
          id: 6,
          name: 'Jelly bean',
          specialization: 375,
          email: 0.0,
          password: 94,
          fee: 0.0,
        },
        {
          id: 7,
          name: 'Lollipop',
          specialization: 392,
          email: 0.2,
          password: 98,
          fee: 0,
        },
        {
          id: 8,
          name: 'Honeycomb',
          specialization: 408,
          email: 3.2,
          password: 87,
          fee: 6.5,
        },
        {
          id: 9,
          name: 'Donut',
          specialization: 452,
          email: 25.0,
          password: 51,
          fee: 4.9,
        },
        {
          id: 10,
          name: 'KitKat',
          specialization: 518,
          email: 26.0,
          password: 65,
          fee: 7,
        },
      ];
    },

    deleteItem(e, id) {
      const index = this.items.findIndex((item) => item.id === id);
      this.items.splice(index, 1);
    },

    async save() {
      console.log('saving', this.form);

      // todo remove this when be implemented
      this.items.push({
        id: new Date().getTime(),
        ...this.form,
      });

      this.formDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
