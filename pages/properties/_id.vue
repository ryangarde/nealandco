<template>
  <client-only>
  <div>
    <div class="header">
      <div class="header-title">PROPERTIES</div>
    </div>
    <div class="view-property" v-if="property">
      <div v-if="loading">
        <div class="skeleton-loader-image"></div>
        <div class="skeleton-loader-status"></div>
        <div class="skeleton-loader-price"></div>
        <br />
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-location"></div>
        <br />
        <div class="skeleton-loader-number"></div>
        <div class="skeleton-loader-type"></div>
        <div class="skeleton-loader-stats">
          <div class="skeleton-loader-stat" v-for="n in 5" :key="n">
            <v-icon class="skeleton-loader--icon" v-if="n == 1 || n == 2">mdi-alpha-b-box</v-icon>
            <v-icon class="skeleton-loader--icon" v-if="n == 3">mdi-alpha-g-box</v-icon>
            <v-icon class="skeleton-loader--icon" v-if="n == 4">mdi-alpha-f-box</v-icon>
            <v-icon class="skeleton-loader--icon" v-if="n == 5">mdi-alpha-l-box</v-icon>
            <div class="skeleton-loader--number"></div>
            <div class="skeleton-loader--text"></div>
          </div>
        </div>
        <br />
        <br />
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-description"></div>
        <div class="skeleton-loader-description"></div>
        <div class="skeleton-loader-description"></div>
        <br />
        <br />
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-list"></div>
        <div class="skeleton-loader-list"></div>
        <div class="skeleton-loader-list"></div>
        <div class="skeleton-loader-list"></div>
        <div class="skeleton-loader-list"></div>
      </div>

      <div>
        <v-carousel
          show-arrows-on-hover
          height="auto"
          :show-arrows="property.property_images.length > 1"
          v-if="property.property_images.length > 0"
          ref="carousel"
        >
          <v-carousel-item v-for="image in property.property_images" :key="image.id" eager>
            <div :id="`panorama-image-${image.id}`" class="panorama-image" v-if="image.type == 'panorama'" />
            <div id="panorama-widget" class="panorama-widget"></div>
            <v-img :src="image.name" height="100%" contain eager v-if="image.type !== 'panorama'" />
            <!-- <iframe
              allowfullscreen
              :src="$config.imageUrl + image.name"
              width="100%"
              height="100%"
              v-if="image.type == 'panorama'"
            ></iframe> -->
          </v-carousel-item>
        </v-carousel>

        <div class="image default" v-if="property.property_images.length == 0 && !loading"></div>
      </div>

      <div v-if="!loading">
        <div class="status">FOR {{ property.status }}</div>
        <div class="price">₱ {{ formatPrice(property.price) }}</div>

        <div class="mt-10 mb-3">
          <span class="main-title">LOCATION: &nbsp;</span>
          {{ property.primaryAddress }}, {{ property.secondaryAddress }}
        </div>
        <div class="property-id">Property No. {{ property.propertyNumber }}</div>
        <div class="property-type">Property Type: {{ property.type }}</div>

        <div class="stats">
          <div class="stat">
            <v-icon class="icon">mdi-bed</v-icon>
            <div class="number">{{ property.bedrooms }}</div>
            <div class="text">BEDROOMS</div>
          </div>
          <div class="stat">
            <v-icon class="icon">mdi-shower-head</v-icon>
            <div class="number">{{ property.bathrooms }}</div>
            <div class="text">BATHROOMS</div>
          </div>
          <div class="stat">
            <v-icon class="icon">mdi-garage-variant</v-icon>
            <div class="number">{{ property.garage }}</div>
            <div class="text">GARAGE</div>
          </div>
          <div class="stat">
            <v-icon class="icon">mdi-floor-plan</v-icon>
            <div class="number">{{ property.floorArea }} m&sup2;</div>
            <div class="text">FLOOR AREA</div>
          </div>
          <div class="stat">
            <v-icon class="icon">mdi-ruler-square</v-icon>
            <div class="number">{{ property.lotArea }} m&sup2;</div>
            <div class="text">LOT AREA</div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div class="main-title">DESCRIPTION</div>
        <br />
        <div class="description">{{ property.description }}</div>

        <div class="list" v-if="property.amenities.length > 0">
          <br />
          <br />
          <div class="main-title">AMENITIES</div>
          <ul class="mt-5">
            <li v-for="amenity in property.amenities" :key="amenity.id">{{ amenity.description }}</li>
          </ul>
        </div>
        <br />
        <br />
        <br />
        <div class="text-center">
          <inquire-property-modal
            origin="View Property"
            :property="property"
            @emailSent="onEmailSent"
            @errorMessage="onErrorMessage"
          ></inquire-property-modal>
        </div>
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
  </client-only>
</template>

<script>
import axios from 'axios';
import InquirePropertyModal from '~/components/modals/InquirePropertyModal';

export default {
  components: {
    InquirePropertyModal,
  },

  asyncData({ params, $config }) {
    const instance = axios.create();

    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // ...
      }
    );

    return instance
      .get(`${$config.baseUrl}properties/${params.id}`)
      .then((res) => {
        return {
          property: res.data,
          propertyDescription: res.data.description,
          propertyImage: res.data.property_images[0] ? res.data.property_images[0].name : '',
        };
      })
      .catch((error) => {
        console.log(error);
      });
  },

  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.propertyDescription || '',
        },
        { name: 'og:description', content: this.propertyDescription || '' },
        { name: 'twitter:description', content: this.propertyDescription || '' },
        { name: 'og:image', content: `${this.$config.imageUrl}${this.propertyImage}` || '' },
        { name: 'twitter:image', content: `${this.$config.imageUrl}${this.propertyImage}` || '' },
      ],
    };
  },

  data() {
    return {
      property: null,
      loading: false,
      emailSent: false,
      errorMessage: false,
    };
  },

  mounted() {
    axios
      .get(`properties/${this.$route.params.id}`)
      .then((res) => {
        this.property = res.data;

        this.property.property_images.forEach((image) => {
          if (image.type !== 'panorama') return;
          const panorama = new PANOLENS.ImagePanorama(image.name);
          // const panorama = new PANOLENS.ImagePanorama(require('~/assets/images/panorama.jpeg'));
          const viewer = new PANOLENS.Viewer({
            container: document.getElementById(`panorama-image-${image.id}`),
          });
          viewer.add(panorama);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    onEmailSent(success) {
      this.emailSent = success;
    },
    onErrorMessage(message) {
      this.errorMessage = message;
    },
  },
};
</script>

<style scoped>
.panorama-image {
  width: 100%;
  height: 100%;
}

.panorama-image div {
  background-color: red;
  /* position: absolute; */
  z-index: 100;
}
</style>