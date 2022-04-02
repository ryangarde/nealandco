<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Featured Properties</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-5 mb-5"></v-text-field>
        <v-spacer></v-spacer>

        <new-featured-property-modal @addItem="onAddItem"></new-featured-property-modal>
      </v-card-title>
      <v-data-table :headers="headers" :items="featuredProperties" :search="search" :loading="loading">
        <template v-slot:item.action="{ item }">
          <v-icon color="red" class="display-2" small @click="deleteItem(item)" :disabled="loading">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-snackbar v-model="successMessage.status" color="success">
      {{ successMessage.description }}
      <v-btn dark text @click="successMessage.status = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import NewFeaturedPropertyModal from '~/components/admin/featuredProperties/NewFeaturedPropertyModal';
import axios from 'axios';

export default {
  layout: 'admin',
  components: {
    NewFeaturedPropertyModal,
  },
  data() {
    return {
      loading: true,
      search: '',
      successMessage: {
        status: false,
        message: null,
      },

      headers: [
        { text: 'Property Number', align: 'start', value: 'propertyNumber' },
        { text: 'Primary Address', value: 'primaryAddress' },
        { text: 'Secondary Address', value: 'secondaryAddress' },
        { text: 'Type', value: 'type' },
        { text: 'Status', value: 'status' },
        { text: 'Lot Area', value: 'lotArea' },
        { text: 'Floor Area', value: 'floorArea' },
        { text: 'Bedrooms', value: 'bedrooms' },
        { text: 'Bathrooms', value: 'bathrooms' },
        { text: 'Garage', value: 'garage' },
        { text: 'Price', value: 'price' },
        { text: '', value: 'action', sortable: false },
      ],
      featuredProperties: [],
    };
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    initializeData() {
      axios.get(`admin/featured-properties`).then((res) => {
        this.featuredProperties = res.data;
        this.loading = false;
      });
    },
    onAddItem(data) {
      this.featuredProperties = data.items;
      this.successMessage = data.message;
    },
    deleteItem(item) {
      this.loading = true;
      axios
        .post(`admin/featured-properties/${item.id}`)
        .then((res) => {
          this.loading = false;
          this.featuredProperties.splice(this.featuredProperties.indexOf(item), 1);
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
