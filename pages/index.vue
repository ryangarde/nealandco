<template>
  <div class="home">
    <OfferMyPropertyModal v-model="dialogStatus" />

    <div class="cover-photo">
      <div class="content text-center">
        <div class="slogan">FIND YOUR NEXT PROPERTY INVESTMENT OR BUSINESS EXPANSION WITH US!</div>
        <div class="line"></div>
        <div class="buttons">
          <button class="button transparent-btn" @click="dialogStatus = true">-LIST-</button>
          <nuxt-link class="button transparent-btn" :to="{ path: '/properties', query: { status: 'Sale' } }" color="white">-BUY-</nuxt-link>
          <nuxt-link class="button transparent-btn" :to="{ path: '/properties', query: { status: 'Rent' } }">-RENT-</nuxt-link>
        </div>
        <div class="social-media">
          <a :href="settings.facebookLink" class="icon">
            <v-icon class="facebook">mdi-facebook</v-icon>
          </a>
          <a :href="settings.instagramLink" class="icon">
            <v-icon class="instagram">mdi-instagram</v-icon>
          </a>
          <a :href="settings.twitterLink" class="icon">
            <v-icon class="twitter">mdi-twitter</v-icon>
          </a>
          <a :href="settings.youtubeLink" class="icon">
            <v-icon class="youtube">mdi-youtube</v-icon>
          </a>
          <a :href="settings.linkedInLink" class="icon">
            <v-icon class="linkedin">mdi-linkedin</v-icon>
          </a>
        </div>
      </div>
    </div>

    <div class="featured">
      <div class="main-title text-center">FEATURED PROPERTIES</div>

      <v-row v-if="loadingFeaturedProperties">
        <v-col sm="6" md="4" cols="12" class="mt-10" v-for="n in 9" :key="n">
          <v-skeleton-loader type="image, article, list-item-three-line"></v-skeleton-loader>
        </v-col>
      </v-row>

      <div class="featured-items">
        <nuxt-link tag="div" :to="`/properties/${property.id}`" class="item card" v-for="property in featuredProperties" :key="property.id">
          <!-- =======  IMAGE ========= -->
          <div v-for="(image, index) in property.property_images" :key="image.id">
            <div class="image" :style="`background-image: url(${property.property_images[0].name})`" v-if="index == 0">
              <div class="status">for {{ property.status }}</div>
            </div>
          </div>

          <!-- =======  DEFAULT IMAGE ========= -->
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

              <div class="price text-center">Php {{ formatPrice(property.price) }}</div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="about-us text-center" ref="aboutUs">
      <div class="main-title">ABOUT US</div>
      <div class="line"></div>
      <div class="description">
        WE ARE A SECURITIES AND EXCHANGE COMMISION (S.E.C.) - REGISTERED COMPANY AND A TEAM OF TRUSTWORTHY AND DEDICATED REAL ESTATE SERVICE
        PROFESSIONALS THAT PUTS FIRST THE INTEREST OF OUR CLIENTS
      </div>
    </div>

    <div class="goal">
      <v-row class="align-center">
        <v-col md="6">
          <v-img :src="goalImg" alt class="img-fluid" eager />
        </v-col>
        <v-col md="6">
          <div class="main-title text-center">OUR GOAL</div>
          <br />
          <div class="description text-center">
            Is to make each of our client's property investing, selling and leasing experience convenient, easy & meaningful.
            <br />
            <br />
            We pride ourselves in giving our clients the best options with excellent and trustworthy services.
          </div>
        </v-col>
      </v-row>
      <div class="slogan text-center">BUY AND INVEST NOW WHILE THE PRICES ARE STILL LOW OR SELL YOURS TO EARN</div>
      <div class="line"></div>
      <div class="buttons">
        <button class="button blue-btn" @click="dialogStatus = true">SELL PROPERTY</button>
        <nuxt-link :to="{ path: '/properties', query: { status: 'Sale' } }" class="button blue-btn">BUY PROPERTY</nuxt-link>
        <nuxt-link :to="{ path: '/properties', query: { status: 'Rent' } }" class="button blue-btn">RENT PROPERTY</nuxt-link>
      </div>
    </div>

    <v-row class="container mx-auto" v-if="loadingTestimonials">
      <v-col md="4" cols="12" v-for="n in 3" :key="n">
        <v-skeleton-loader type="list-item-three-line,article"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-carousel
      height="auto"
      cycle
      hide-delimiter-background
      hide-delimiters
      show-arrows-on-hover
      :show-arrows="testimonials.length > numberOfTestimonialsInCarousel"
      dark
    >
      <v-carousel-item v-for="group in testimonialGroups" :key="group">
        <div class="testimonials" :style="`justify-content: ${testimonialJustifyCenter}`">
          <div
            class="testimonial"
            v-for="(testimonial, index) in testimonials"
            v-if="
              group * numberOfTestimonialsInCarousel - (index + 1) >= 0 &&
              group * numberOfTestimonialsInCarousel - (index + 1) < numberOfTestimonialsInCarousel
            "
            :key="testimonial.id"
          >
            <div class="testimonial-description">{{ testimonial.description }}</div>
            <div class="testimonial-footer">
              <div class="testimonial-image" :style="`background-image: url(${$config.imageUrl}${testimonial.image})`" />
              <div class="testimonial-name">{{ testimonial.name }}</div>
              <div class="testimonial-stars">
                <span v-for="star in testimonial.roundedValue" :key="star">
                  <v-icon class="icon" v-if="testimonial.stars % 1 != 0 && star == testimonial.roundedValue">mdi-star-half</v-icon>
                  <v-icon class="icon" v-else>mdi-star</v-icon>
                </span>
              </div>
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>

    <div class="contact-us" ref="contactUs">
      <div class="left">
        <div class="main-title text-center">CONTACT AND LEAVE US YOUR MESSAGE!</div>
        <v-form class="form" ref="form" @submit.prevent="submit()">
          <v-row>
            <v-col md="6" cols="12">
              <input v-model="fullName" type="text" class="input" placeholder="Name" />
              <br />
              <input v-model="contactNumber" type="text" class="input" placeholder="Mobile No." />
            </v-col>
            <v-col md="6" cols="12">
              <input v-model="address" type="text" class="input" placeholder="Address" />
              <br />
              <input v-model="emailAddress" type="text" class="input" placeholder="E-mail" />
            </v-col>
            <v-col md="12" cols="12">
              <textarea v-model="message" rows="4" class="input" placeholder="Message" style="resize: none"></textarea>
            </v-col>
          </v-row>

          <div class="text-center">
            <v-btn color="primary" type="submit" large :loading="loadingContactUs">SEND MESSAGE</v-btn>
          </div>
        </v-form>
      </div>
      <div class="right">
        <div class="text-center">
          <img src="~/assets/images/logo.png" alt class="logo" />
        </div>
        <div class="line"></div>
        <div>
          <span class="secondary-title">PHONE:</span>
          <span class="content">+63-917-312-8232</span>
        </div>
        <br />
        <div>
          <span class="secondary-title">E-MAIL:</span>
          <span class="content">{{ settings.emailReceiver }}</span>
        </div>
        <br />
        <div>
          <span class="secondary-title d-inline-block">ADDRESS:</span>
          <div class="content d-inline-block">
            #6C Oxford Street,
            <br />
            Rancho 4 West, Concepcion 2,
            <br />
            Marikina City, Philippines 1811
          </div>
        </div>
      </div>
    </div>

    <v-snackbar v-model="emailSent.status" color="success">
      {{ emailSent.message }}
      <v-btn dark text @click="emailSent.status = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="errorMessage.status" color="red" :vertical="errorMessage.message != null">
      <div v-if="errorMessage.message">
        <div v-for="(errors, index) in errorMessage.message" :key="index">
          <div v-for="(error, i) in errors" :key="i">{{ error }}</div>
        </div>
      </div>
      <div v-else>Something went wrong</div>

      <v-btn dark text @click="errorMessage.status = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import OfferMyPropertyModal from '~/components/modals/OfferMyPropertyModal';
import axios from 'axios';

export default {
  components: {
    OfferMyPropertyModal,
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
      goalImg: require('~/assets/images/Group 5.png'),
      loadingFeaturedProperties: true,
      loadingTestimonials: true,
      loadingContactUs: false,
      settings: false,
      dialogStatus: false,

      testimonialGroups: null,
      numberOfTestimonialsInCarousel: 3,
      testimonialJustifyCenter: 'unset',

      testimonials: [],
      featuredProperties: [],

      emailAddress: null,
      fullName: null,
      address: null,
      contactNumber: null,
      message: null,

      emailSent: false,
      errorMessage: false,
    };
  },
  mounted() {
    if (window.innerWidth <= 768) {
      this.numberOfTestimonialsInCarousel = 2;
      this.testimonialJustifyCenter = 'center';
    }
    if (window.innerWidth <= 460) this.numberOfTestimonialsInCarousel = 1;

    axios.get(`testimonials`).then((res) => {
      this.testimonials = res.data;
      this.testimonialGroups = Math.ceil(this.testimonials.length / this.numberOfTestimonialsInCarousel);
      this.loadingTestimonials = false;
    });

    axios.get(`featured-properties`).then((res) => {
      this.featuredProperties = res.data;
      this.loadingFeaturedProperties = false;
    });

    axios.get(`settings`).then((res) => {
      this.settings = res.data;
    });
  },
  updated() {
    if (this.$route.query.target == 'contactUs') {
      this.$refs.contactUs.scrollIntoView();
    } else if (this.$route.query.target == 'aboutUs') {
      this.$refs.aboutUs.scrollIntoView();
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.target) this.$refs[to.query.target].scrollIntoView();
    },
  },

  methods: {
    onCloseDialog(dialogStatus) {
      this.dialogStatus = dialogStatus;
    },
    resetForm() {
      this.emailAddress = null;
      this.fullName = null;
      this.address = null;
      this.contactNumber = null;
      this.message = null;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    onEmailSentOfferMyProperty(success) {
      this.emailSent = success;
    },
    submit() {
      this.loadingContactUs = true;

      let formData = {
        emailAddress: this.emailAddress,
        fullName: this.fullName,
        address: this.address,
        contactNumber: this.contactNumber,
        message: this.message,
        origin: 'Contact Us',
      };

      axios
        .post(`mail/inquire-properties`, formData)
        .then((res) => {
          this.loadingContactUs = false;
          this.emailSent = {
            status: true,
            message: 'Your message has been sent!',
          };
          this.resetForm();
        })
        .catch((error) => {
          this.loadingContactUs = false;
          this.errorMessage = {
            status: true,
            message: error.response.data.errors,
            default: error.response.message,
          };
        });
    },
  },
};
</script>
