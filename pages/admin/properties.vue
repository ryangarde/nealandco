<template>
  <div>
    <PropertyFormModal v-model="dialog.add" @addItem="onAddItem" formType="add" />

    <PropertyFormModal v-model="dialog.edit" @editItem="onEditItem" formType="edit" :property="property" />

    <AmenitiesListModal v-model="dialog.amenities" @updateAmenities="onUpdateAmenities" :property="property" />

    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Properties</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-5 mb-5"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" dark large @click="openAddModal">
          <v-icon dark>mdi-home-plus</v-icon>
          &nbsp;Add
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="properties" :search="search" :loading="loading">
        <template v-slot:item.featured="{ item }">
          <v-checkbox
            color="success"
            v-model="item.isChosen"
            @change="markAsFeatured(item)"
            :disabled="
              loadingMarkAsFeatured || (featuredPropertiesCount >= maxFeaturedProperties && item.isChosen == 0) || item.isSold == 1
            "
          ></v-checkbox>
        </template>

        <template #item.sold="{ item }">
          <v-checkbox color="success" v-model="item.isSold" @change="markAsSold(item)" :disabled="loadingMarkAsSold"></v-checkbox>
        </template>

        <template #item.amenities="{ item }"></template>

        <template #item.action="{ item }">
          <div class="d-flex">
            <v-icon @click="openAmenitiesModal(item)" color="success" class="mr-2" large>mdi-home-analytics</v-icon>
            <v-icon @click="openEditModal(item)" color="primary" class="mr-2 display-2">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)" :disabled="loading" color="red" class="display-2">mdi-delete</v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import AmenitiesListModal from '~/components/admin/properties/AmenitiesListModal';
import PropertyFormModal from '~/components/admin/properties/PropertyFormModal';
import axios from 'axios';

export default {
  layout: 'admin',
  components: {
    AmenitiesListModal,
    PropertyFormModal,
  },
  data: () => ({
    loading: true,
    loadingMarkAsSold: false,
    loadingMarkAsFeatured: false,
    search: '',
    dialog: {
      add: false,
      edit: false,
      amenities: false,
    },

    featuredPropertiesCount: null,
    maxFeaturedProperties: 9,

    properties: [],
    property: {},
    headers: [
      { text: 'Property Number', value: 'propertyNumber' },
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
      { text: 'Is Featured', value: 'featured', sortable: false },
      { text: 'Is Done', value: 'sold', sortable: false },
      { text: '', value: 'amenities', sortable: false },
      { text: '', value: 'action', sortable: false },
    ],
  }),

  created() {
    axios
      .get(`admin/properties`)
      .then((res) => {
        this.properties = res.data.data;
        this.featuredPropertiesCount = res.data.featuredPropertiesCount;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    openAddModal() {
      this.dialog.add = true;
    },

    openEditModal(item) {
      this.property = item;
      this.dialog.edit = true;
    },

    openAmenitiesModal(item) {
      this.property = item;
      this.dialog.amenities = true;
    },

    onAddItem(item) {
      this.properties.push(item);
    },

    onEditItem(item) {
      this.$set(this.properties, this.properties.indexOf(this.property), item);
    },

    onUpdateAmenities() {},

    async deleteItem(item) {
      this.loading = true;

      try {
        await axios.delete(`admin/properties/${item.id}`);
        this.loading = false;
        this.properties.splice(this.properties.indexOf(item), 1);
      } catch (error) {
        this.loading = false;
      }
    },

    markAsSold(item) {
      this.loadingMarkAsSold = true;
      axios
        .post(`admin/properties/${item.id}`)
        .then((res) => {
          this.loadingMarkAsSold = false;
          item['isSold'] = res.data.isSold;
          if (item['isChosen'] == 1 && res.data.isChosen == 0) this.featuredPropertiesCount--;
          item['isChosen'] = res.data.isChosen;
        })
        .catch((error) => {
          this.loadingMarkAsSold = false;
          item.isSold == 1 ? (item['isSold'] = 0) : (item['isSold'] = 1);
        });
    },

    markAsFeatured(item) {
      this.loadingMarkAsFeatured = true;

      axios
        .patch(`admin/featured-properties/${item.id}`, { isChosen: item.isChosen })
        .then((res) => {
          this.loadingMarkAsFeatured = false;
          item['isChosen'] = res.data.isChosen;
          if (item['isChosen'] == 0) this.featuredPropertiesCount--;
          else if (item['isChosen'] == 1) this.featuredPropertiesCount++;
        })
        .catch((error) => {
          this.loadingMarkAsFeatured = false;
          item.isChosen == 1 ? (item['isChosen'] = 0) : (item['isChosen'] = 1);
        });
    },
  },
};
</script>
