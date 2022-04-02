<template>
  <v-dialog v-model="dialog" width="150rem" :persistent="loading">
    <template v-slot:activator="{ on }">
      <v-btn color="success" dark large v-on="on" @click="initializeData()">
        <v-icon dark>mdi-home-group</v-icon>
        &nbsp;Choose
      </v-btn>
    </template>
    <v-card :loading="loading">
      <v-container>
        <v-row>
          <v-col md="4" v-for="property in properties" :key="property.id">
            <v-card
              class="no-padding featured-properties"
              :class="{ active: property.isChosen, invalid: isInvalid }"
              elevation="4"
              @click="chooseProperty(property.id)"
            >
              <!-- --------  DEFAULT IMAGE -------- -->
              <div class="image default" v-if="property.property_images.length == 0">
                <div class="status">{{ property.status }}</div>
              </div>
              <!-- ================================= -->

              <!-- --------  PROPERTY IMAGE -------- -->
              <div v-for="(image, index) in property.property_images" :key="image.id">
                <div
                  class="image"
                  :style="`background-image: url(${$config.imageUrl}${property.property_images[0].name})`"
                  v-if="index == 0"
                >
                  <div class="status">{{ property.status }}</div>
                </div>
              </div>
              <!-- ================================= -->

              <v-card-text class="padding">{{ property.type }}</v-card-text>
              <v-card-text class="padding text--primary">
                {{ property.primaryAddress }}
                <br />
                {{ property.secondaryAddress }}
                <br />
                Property Number: {{ property.propertyNumber }}
                <br />
                Lot area: {{ property.lotArea }}
                <br />
                Floor area: {{ property.floorArea }}
                <br />
                Bedrooms: {{ property.bedrooms }}
                <br />
                Bathrooms: {{ property.bathrooms }}
                <br />
                Garage: {{ property.garage }}
                <br />
                <div class="text-danger display-1 mt-4">Php {{ formatPrice(property.price) }}</div>

                <br />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" large dark @click="submit()" :loading="loading">Save</v-btn>
        <v-btn color="red darken-1" large dark @click="dialog = false" :disabled="loading">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      loading: true,
      chosenPropertiesCount: 0,
      properties: [],
      featuredProperties: [],
      isInvalid: false,
      defaultImageUrl: require('~/assets/images/home_default.jpg'),
    };
  },
  methods: {
    initializeData() {
      axios
        .get(`admin/properties/not-sold`)
        .then((res) => {
          this.properties = res.data;

          this.loading = false;
        })
        .catch((error) => (this.loading = false));

      axios.get(`admin/featured-properties`).then((res) => {
        this.featuredProperties = res.data;
      });
    },
    chooseProperty(id) {
      for (var i = 0; i < this.properties.length; i++) {
        if (id == this.properties[i].id && this.properties[i]['isChosen'] == 0) {
          if (this.chosenPropertiesCount < 9) {
            this.properties[i]['isChosen'] = 1;
            this.chosenPropertiesCount++;
            this.featuredProperties.push(this.properties[i]);
            if (this.chosenPropertiesCount == 9) this.isInvalid = true;
          }
        } else if (id == this.properties[i].id && this.properties[i]['isChosen'] == 1) {
          this.properties[i]['isChosen'] = 0;
          this.chosenPropertiesCount--;
          this.featuredProperties = this.properties.filter((property) => {
            return property.isChosen == 1;
          });
          this.isInvalid = false;
        }
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    submit() {
      this.loading = true;

      var formData = {
        properties: this.featuredProperties,
      };

      axios
        .post(`admin/featured-properties`, formData)
        .then((res) => {
          this.$emit('addItem', {
            items: res.data,
            message: {
              status: true,
              description: 'Featured properties updated!',
            },
          });
          this.dialog = false;
          this.loading = false;
        })
        .catch((error) => (this.loading = false));
    },
  },
};
</script>
