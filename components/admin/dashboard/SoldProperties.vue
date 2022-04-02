<template>
  <v-dialog v-model="dialog" width="80rem">
    <template v-slot:activator="{ on }">
      <v-progress-circular
        color="primary"
        size="150"
        :value="(soldProperties.length/totalProperties.length)*100"
        width="15"
        v-on="on"
        style="cursor: pointer"
      >
        <div class="display-1">{{soldProperties.length}}/{{totalProperties.length}}</div>
      </v-progress-circular>
    </template>

    <v-card class="admin-container">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mr-5"
        ></v-text-field>
        <v-spacer></v-spacer>

        <!-- <new-featured-property :properties="featuredProperties"></new-featured-property> -->
      </v-card-title>
      <v-data-table :headers="headers" :items="soldProperties" :search="search"></v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,

      search: '',
      headers: [
        {
          text: 'Property Number',
          value: 'propertyNumber'
        },
        { text: 'Price', value: 'price' }
      ]
    };
  },
  props: ['soldProperties', 'totalProperties'],
  methods: {
    initializeData() {}
  }
};
</script>
