<template>
  <v-app>
    <nuxt />
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue';

export default {
  components: {
    Snackbar,
  },
};
</script>