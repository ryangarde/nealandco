<template>
  <div>
    <div class="header">
      <div class="header-title">PROPERTIES</div>
    </div>
    <div class="properties">
      <v-card class="with-padding" elevation="4">
        <v-form ref="form" @submit.prevent="search()">
          <v-row style="margin-left: 0; width: 100%">
            <v-col lg="2" md="3" sm="6" cols="12">
              <v-select
                v-model="status"
                label="Buy or Rent"
                hide-details="auto"
                :items="propertyStatuses"
                clearable
                :loading="loadingStatus"
                @change="search('instant')"
                @click:clear="search('instant')"
              ></v-select>
            </v-col>
            <v-col lg="2" md="3" sm="6" cols="12">
              <v-text-field
                v-model="propertyNumber"
                label="Property ID"
                hide-details="auto"
                clearable
                @keydown="search()"
                @click:clear="search()"
              ></v-text-field>
            </v-col>
            <v-col lg="8" md="6" cols="12">
              <v-text-field
                v-model="location"
                label="Location"
                hide-details="auto"
                clearable
                @keydown="search()"
                @click:clear="search()"
              ></v-text-field>
            </v-col>

            <v-col lg="4" md="8" cols="12">
              <v-select
                v-model="type"
                label="Type"
                hide-details="auto"
                :items="propertyTypes"
                clearable
                multiple
                :loading="loadingType"
                @change="search('instant')"
                @click:clear="search('instant')"
              >
                <template v-slot:prepend-item>
                  <v-list-item ripple @click="propertyTypeSelectionChanged">
                    <v-list-item-action>
                      <v-icon color="primary">{{ propertyTypeIcon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Select All</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
            </v-col>
            <v-col lg="2" md="4" sm="6" cols="12">
              <v-text-field
                v-model="lotArea"
                label="Lot Area"
                hide-details="auto"
                type="number"
                clearable
                @keydown="search()"
                @click:clear="search()"
              ></v-text-field>
            </v-col>
            <v-col lg="2" md="4" sm="6" cols="12">
              <v-text-field
                v-model="bedrooms"
                label="No. of Bedrooms"
                hide-details="auto"
                type="number"
                clearable
                @keydown="search()"
                @click:clear="search()"
              ></v-text-field>
            </v-col>
            <v-col lg="2" md="4" sm="6" cols="12">
              <v-select
                v-model="minPrice"
                label="Min Price"
                hide-details="auto"
                :items="minPriceRange"
                clearable
                :loading="loadingPrice"
                @change="search('instant')"
                @click:clear="search('instant')"
              ></v-select>
            </v-col>
            <v-col lg="2" md="4" sm="6" cols="12">
              <v-select
                v-model="maxPrice"
                label="Max Price"
                hide-details="auto"
                :items="maxPriceRange"
                clearable
                :loading="loadingPrice"
                @change="search('instant')"
                @click:clear="search('instant')"
              ></v-select>
            </v-col>

            <v-col class="mt-4" offset-lg="10" offset-md="9" lg="2" md="3">
              <v-btn color="primary" block large :loading="loadingProperties" type="submit">
                <v-icon>mdi-magnify</v-icon>
                <v-spacer></v-spacer>
                Search
                <v-spacer></v-spacer>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>

      <br />
      <br />

      <v-row v-if="loadingProperties">
        <v-col md="4" cols="12" class="mt-10" v-for="n in 9" :key="n">
          <v-skeleton-loader type="image, article, list-item-three-line, actions"></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-row class="featured-items">
        <v-col class="item" v-for="property in properties" :key="property.id" md="4" sm="6" cols="12">
          <div v-for="(image, index) in property.property_images" :key="image.id">
            <div class="image" :style="`background-image: url(${property.property_images[0].name})`" v-if="index == 0">
              <div class="status">for {{ property.status }}</div>
            </div>
          </div>

          <div class="image default" v-if="property.property_images.length == 0">
            <div class="status">for {{ property.status }}</div>
          </div>

          <div class="content">
            <div class="type">{{ property.type }}</div>
            <div class="description">
              <div>
                <div class="primary-address">{{ property.primaryAddress }}</div>
                <div class="secondary-address">{{ property.secondaryAddress }}</div>
                <br />
                <div class="area">
                  {{ property.lotArea }} sqm lot area
                  <br />
                  {{ property.floorArea }} sqm floor area
                  <br />
                </div>
                <br />
                {{ property.bedrooms }} BEDROOMS
                <br />
                {{ property.bathrooms }} BATHROOMS
                <br />
                {{ property.garage }} GARAGE
              </div>

              <div>
                <div class="price text-center">Php {{ formatPrice(property.price) }}</div>
                <div class="d-flex justify-center">
                  <inquire-property-modal
                    :property="property"
                    :dialog="dialogStatus"
                    :dialogID="dialogID"
                    @closeDialog="onCloseDialog"
                    @emailSent="onEmailSent"
                    @errorMessage="onErrorMessage"
                  ></inquire-property-modal>
                  <button class="button white-btn" @click="openDialog(property.id)">CONTACT</button>
                  <nuxt-link class="button white-btn" :to="'/properties/' + property.id">DETAILS</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="paginationLength"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          @input="choosePage"
          :total-visible="7"
        ></v-pagination>
      </div>
    </div>

    <v-snackbar v-model="emailSent.status" color="success">
      {{ emailSent.message }}
      <v-btn dark text @click="emailSent.status = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="errorMessage.status" color="red" :vertical="errorMessage.message != null">
      <div v-if="errorMessage.message != null">
        <div v-for="errors in errorMessage.message" :key="errors">
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </div>
      </div>
      <div v-else>Something went wrong</div>

      <v-btn dark text @click="errorMessage.status = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios';
import InquirePropertyModal from '~/components/modals/InquirePropertyModal';

export default {
  components: {
    InquirePropertyModal,
  },

  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Buy and invest now while the prices are still low or sell yours to earn' || '',
        },
        { name: 'og:image', content: '/COVER.jpg' || '' },
        { name: 'og:site_name', content: 'Neal & Co. Realty' },
        { name: 'og:description', content: 'Buy and invest now while the prices are still low or sell yours to earn' },
        {
          name: 'twitter:description',
          content: 'Buy and invest now while the prices are still low or sell yours to earn',
        },
        { name: 'twitter:image', content: '/COVER.jpg' },
      ],
    };
  },

  data() {
    return {
      page: 1,
      paginationLength: null,
      emailSent: false,
      errorMessage: false,
      searchStatus: false,
      dialogStatus: false,
      dialogID: null,

      loadingProperties: true,
      loadingPrice: true,
      loadingStatus: true,
      loadingType: true,

      propertyStatuses: [],
      propertyTypes: [],
      properties: [],
      minPriceRange: [],
      maxPriceRange: [],

      status: null,
      propertyNumber: null,
      location: null,
      type: [],
      lotArea: null,
      bedrooms: null,
      minPrice: null,
      maxPrice: null,

      typingTimer: null,
      typingTimerSeconds: 1000,
    };
  },

  mounted() {
    axios.get(`properties`).then((res) => {
      if (this.$route.query.status) {
        this.status = this.$route.query.status;
        this.search('instant');
      } else {
        this.properties = res.data.data;
        this.page = res.data.current_page;
        this.paginationLength = res.data.last_page;
        this.loadingProperties = false;
      }
    });

    axios.get(`properties/types`).then((res) => {
      this.propertyTypes = res.data;
      this.loadingType = false;
    });
    axios.get(`properties/statuses`).then((res) => {
      this.propertyStatuses = res.data;
      this.loadingStatus = false;
    });
    axios.get(`properties/prices`).then((res) => {
      for (let i = res.data.minPrice; i <= res.data.maxPrice; i++) {
        if (i >= 1000) {
          this.minPriceRange.push(i / 1000 + ' billion');
          this.maxPriceRange.push(i / 1000 + ' billion');
        } else if (i < 1000) {
          this.minPriceRange.push(i + ' million');
          this.maxPriceRange.push(i + ' million');
        }
      }

      if (this.minPriceRange[0] == '0 million') this.minPriceRange[0] = 0;
      this.minPriceRange.pop();
      this.maxPriceRange.shift();
      this.loadingPrice = false;
    });
  },

  computed: {
    likesAllPropertyType() {
      return this.type.length === this.propertyTypes.length;
    },
    likesSomePropertyType() {
      return this.type.length > 0 && !this.likesAllPropertyType;
    },
    propertyTypeIcon() {
      if (this.likesAllPropertyType) return 'mdi-close-box';
      if (this.likesSomePropertyType) return 'mdi-minus-box';
      return 'mdi-checkbox-blank-outline';
    },
  },
  methods: {
    openDialog(propertyID) {
      this.dialogStatus = true;
      this.dialogID = propertyID;
    },
    onCloseDialog(dialogStatus) {
      this.dialogStatus = dialogStatus;
    },
    propertyTypeSelectionChanged() {
      this.$nextTick(() => {
        if (this.likesAllPropertyType) {
          this.type = [];
          this.search('instant');
        } else {
          this.type = this.propertyTypes;
          this.search('instant');
        }
      });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    choosePage(page) {
      this.properties = [];
      this.loadingProperties = true;

      if (this.searchStatus) {
        axios
          .post(`properties/search`, this.formData(), { params: { page: page } })
          .then((res) => {
            this.properties = res.data.data;
            this.loadingProperties = false;
          })
          .catch((error) => (this.loadingProperties = false));
      } else {
        axios
          .get(`properties`, { params: { page: page } })
          .then((res) => {
            this.properties = res.data.data;
            this.loadingProperties = false;
          })
          .catch((error) => (this.loadingProperties = false));
      }
    },
    onEmailSent(success) {
      this.emailSent = success;
    },
    onErrorMessage(message) {
      this.errorMessage = message;
    },
    formData() {
      let formData = {
        status: this.status,
        propertyNumber: this.propertyNumber,
        location: this.location,
        type: this.type,
        lotArea: this.lotArea,
        bedrooms: this.bedrooms,
        status: this.status,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      };
      if (this.minPrice) formData['minPrice'] = this.minPrice.replace(' million', '');
      if (this.maxPrice) formData['maxPrice'] = this.maxPrice.replace(' million', '');

      return formData;
    },
    search(type = null) {
      if (type == 'instant') {
        this.loadingProperties = true;
        this.searchStatus = true;
        this.searchApi();
      } else {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {
          this.loadingProperties = true;
          this.searchStatus = true;
          this.searchApi();
        }, this.typingTimerSeconds);
      }
    },
    searchApi() {
      return axios
        .post(`properties/search`, this.formData())
        .then((res) => {
          this.properties = res.data.data;
          this.page = res.data.current_page;
          this.paginationLength = res.data.last_page;
          this.loadingProperties = false;
        })
        .catch((error) => {
          this.loadingProperties = false;
          this.errorMessage = {
            status: true,
          };
        });
    },
  },
};
</script>
