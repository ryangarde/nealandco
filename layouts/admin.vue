<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" permanent color="primary" absolute dark :mini-variant="mini">
      <v-list dense nav class="py-0">
        <v-list-item two-line class="false px-0">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" @click="mini = false" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <!-- <v-list-item-subtitle>Subtext</v-list-item-subtitle> -->
          </v-list-item-content>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>
        <nuxt-link v-for="item in items" :key="item.title" :to="item.link" active-class="active" :exact="isDashboard(item.title)">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </v-list>

      <template v-slot:append>
        <div class="pa-3">
          <v-btn block large :icon="mini" @click="logout()">
            <div v-if="mini">
              <v-icon dark>mdi-logout</v-icon>
            </div>
            <div v-else>Log out</div>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <div class="admin-container" :class="{ 'expand': mini, 'expand-more': !sidebar }">
      <nuxt />
    </div>

    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue';

export default {
  middleware: 'authenticated',

  components: {
    Snackbar,
  },

  data: () => ({
    name: null,
    mini: false,
    sidebar: true,

    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/admin' },
      { title: 'Properties', icon: 'mdi-home', link: '/admin/properties' },
      {
        title: 'Featured Properties',
        icon: 'mdi-home-alert',
        link: '/admin/featured-properties',
      },
      {
        title: 'Testimonials',
        icon: 'mdi-comment-text',
        link: '/admin/testimonials',
      },
      {
        title: 'Settings',
        icon: 'mdi-cog-outline',
        link: '/admin/settings',
      },
      {
        title: 'Blogs',
        icon: 'mdi-newspaper-variant-outline',
        link: '/admin/blogs',
      },
    ],
  }),

  watch: {
    sidebar() {
      console.log(this.sidebar);
    },
  },

  mounted() {
    this.name = localStorage.getItem('name');
    if (window.innerWidth < 460) this.mini = true;
  },

  methods: {
    isDashboard(title) {
      if (title == 'Dashboard') return true;
    },
    logout() {
      localStorage.clear();
      this.$cookies.removeAll();
      this.$router.push('/admin/login');
    },
  },
};
</script>
