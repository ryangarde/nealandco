<template>
  <div>
    <div class="header">
      <div class="header-title">BLOGS</div>
    </div>

    <v-container>
      <div class="blogs">
        <template v-if="loading">
          <v-skeleton-loader v-for="n in 9" :key="n" type="card-heading, image, list-item-three-line" />
        </template>

        <template v-else>
          <div class="blog" v-for="blog in blogs" :key="blog.id" @click="$router.push(`/blogs/${blog.id}`)">
            <div class="blog-title">
              {{ blog.name }}
            </div>
            <div>
              <img :src="blog.image" alt="" class="blog-image" />
            </div>

            <div class="blog-description">
              {{ blog.short_description }}
            </div>
          </div>
        </template>
      </div>
    </v-container>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data: () => ({
    loading: true,
    blogs: [],
  }),
  async created() {
    try {
      const { data } = await axios.get('blogs');
      this.blogs = data;
      this.loading = false;
    } catch (error) {
      this.$store.dispatch('snackbar/error', 'Failed to get blogs');
    }
  },
};
</script>

<style lang="scss" scoped>
.blogs {
  display: grid;
  grid-template-columns: repeat(auto-fit, 35rem);
  gap: 5rem;
  margin-top: 4rem;
  margin-bottom: 8rem;
  // justify-content: center;
}

.blog {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: 0.3s;
  }

  &-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--clr-primary);
    text-transform: uppercase;
    margin-bottom: 0.8rem;
  }

  &-image {
    width: 100%;
    object-fit: cover;
    object-position: center;
    height: 23rem;
  }

  &-description {
    margin-top: 0.5rem;
  }
}
</style>