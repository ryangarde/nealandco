<template>
  <v-snackbar v-model="status" :color="snackbar.color" :timeout="snackbar.timeout">
    <template v-if="typeof snackbar.message === 'string'">
      {{ snackbar.message }}
    </template>

    <template v-else>
      <div v-for="(errors, index) in snackbar.message" :key="index">
        <div v-for="(error, i) in errors" :key="i">{{ error }}</div>
      </div>
    </template>

    <template #action>
      <v-btn dark @click="$store.dispatch('snackbar/update', { status: false })" icon>
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    status: {
      get() {
        return this.$store.state.snackbar.status;
      },
      set() {
        this.$store.dispatch('snackbar/update', { status: false });
      },
    },

    ...mapState(['snackbar']),
  },
};
</script>