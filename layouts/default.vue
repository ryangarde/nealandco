<template>
  <v-app>
    <MainNavbar />

    <Nuxt />

    <div class="footer">
      Copyright © 2020
      <strong>Neal & Co. Realty</strong>
      . All rights reserved.
    </div>

    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue';
import MainNavbar from '~/components/MainNavbar.vue';

export default {
  components: {
    Snackbar,
    MainNavbar,
  },
};
</script>
