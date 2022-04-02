<template>
  <v-container class="blog">
    <div class="blog-title">{{ blog.name }}</div>

    <div>
      <img :src="blog.image" alt="" class="blog-image" />
    </div>

    <div class="blog-description" v-html="blog.description"></div>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    blog: {},
  }),

  async created() {
    try {
      const { data } = await axios.get(`blogs/${this.$route.params.blog}`);
      this.blog = data;
    } catch (error) {
      this.$store.dispatch('snackbar/error', 'Failed to get blog. Please refresh the page');
    }
  },
};
</script>

<style lang="scss" scoped>
.blog {
  margin-top: 14rem;
  margin-bottom: 10rem;

  &-title {
    font-size: 2.8rem;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    margin: 0 auto;
    margin-bottom: 2rem;
    max-width: 80%;
  }

  &-image {
    width: 100%;
  }

  &-description {
    margin-top: 2rem;
  }
}
</style>