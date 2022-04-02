<template>
  <div class="navigation" :class="{ solid: isNotHome }">
    <OfferMyPropertyModal v-model="dialog.offerMyProperty" />

    <BookAViewingModal v-model="dialog.bookAViewing" />

    <img src="~/assets/images/logo.png" alt class="logo" />
    <div class="links">
      <nuxt-link to="/" class="link" active-class="active" exact>HOME</nuxt-link>
      <nuxt-link to="/properties" class="link" active-class="active">PROPERTIES</nuxt-link>
      <button class="link text-center" @click="dialog.offerMyProperty = true">OFFER MY PROPERTY</button>
      <nuxt-link to="/services" class="link" active-class="active">SERVICES</nuxt-link>
      <nuxt-link :to="{ path: '/', query: { target: 'contactUs' } }" class="link" active-class="active" exact>CONTACT US</nuxt-link>
      <nuxt-link :to="{ path: '/', query: { target: 'aboutUs' } }" class="link" active-class="active" exact>ABOUT US</nuxt-link>
      <button class="link" @click="dialog.bookAViewing = true">BOOK A VIEWING</button>
      <nuxt-link to="/blogs" active-class="active" class="link">BLOGS</nuxt-link>
    </div>

    <input id="toggle-button" type="checkbox" class="toggle-button" v-model="isMobile" />
    <label for="toggle-button" class="toggle-menu">
      <div class="icon-bars"></div>
    </label>

    <div class="overlay-menu">
      <div class="links">
        <nuxt-link to="/" class="link" active-class="active" exact>HOME</nuxt-link>
        <nuxt-link to="/properties" class="link" active-class="active">PROPERTIES</nuxt-link>
        <button class="link text-center" @click="dialog.offerMyProperty = true">OFFER MY PROPERTY</button>
        <nuxt-link to="/services" class="link" active-class="active">SERVICES</nuxt-link>
        <nuxt-link :to="{ path: '/', query: { target: 'contactUs' } }" class="link" active-class="active" exact>CONTACT US</nuxt-link>
        <nuxt-link :to="{ path: '/', query: { target: 'aboutUs' } }" class="link" active-class="active" exact>ABOUT US</nuxt-link>
        <button class="link" @click="dialog.bookAViewing = true">BOOK A VIEWING</button>
        <nuxt-link to="/blogs" active-class="active" class="link">BLOGS</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import OfferMyPropertyModal from '~/components/modals/OfferMyPropertyModal';
import BookAViewingModal from '~/components/modals/BookAViewingModal';

export default {
  components: {
    OfferMyPropertyModal,
    BookAViewingModal,
  },

  data: () => ({
    dialog: {
      bookAViewing: false,
      offerMyProperty: false,
    },

    isNotHome: false,
    isMobile: false,
    headerAnimation: false,
    headerName: '',
    showHeader: false,
  }),

  beforeMount() {
    if (this.$route.path != '/') {
      this.showHeader = true;

      if (this.$route.name.indexOf('-') < 0) this.headerName = this.$route.name;
      else this.headerName = this.$route.name.substring(0, this.$route.name.indexOf('-'));
    } else this.showHeader = false;
  },

  watch: {
    $route() {
      this.isMobile = false;
      if (this.$route.path != '/') {
        this.isNotHome = true;
        this.showHeader = true;

        if (this.$route.name.indexOf('-') < 0) this.headerName = this.$route.name;
        else this.headerName = this.$route.name.substring(0, this.$route.name.indexOf('-'));
      } else {
        this.isNotHome = false;
        this.showHeader = false;
      }
    },
  },
  methods: {
    collapseOverlayMenu() {
      this.isMobile = false;
    },
  },
};
</script>
