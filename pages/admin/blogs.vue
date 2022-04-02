<template>
  <div>
    <BlogFormModal v-model="dialog" :blog="blog" @addItem="onAddItem" @editItem="onEditItem" :formType="formType" />

    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Blogs</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-5 mb-5"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" dark large @click="openAddDialog">
          <v-icon dark>mdi-comment-plus</v-icon>
          &nbsp;Add
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="blogs" :search="search" :loading="loading" loading-text="Loading... Please wait">
        <template #item.image="{ item }">
          <v-avatar size="60" class="my-1 rounded-lg">
            <img :src="item.image" :alt="item.name" />
          </v-avatar>
        </template>

        <template #item.actions="{ item }">
          <v-icon color="primary" small class="mr-2 display-2" @click="openEditDialog(item)">mdi-pencil</v-icon>
          <v-icon loading color="red" class="display-2" small @click="deleteItem(item)" :disabled="loading">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import BlogFormModal from '~/components/admin/blogs/BlogFormModal';
import axios from 'axios';

export default {
  layout: 'admin',
  components: {
    BlogFormModal,
  },
  data: () => ({
    loading: true,
    dialog: false,
    blogs: [],
    blog: {},
    formType: null,
    search: '',
    successMessage: {
      status: false,
      description: null,
    },

    headers: [
      { text: '', value: 'image', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Short Description', value: 'short_description' },
      { text: '', value: 'actions', sortable: false },
    ],
  }),

  async created() {
    try {
      const { data } = await axios.get(`admin/blogs`);
      this.blogs = data;
      this.loading = false;
    } catch (error) {
      this.$store.dispatch('snackbar/error', 'Failed to get blogs list');
    }
  },

  methods: {
    openAddDialog() {
      this.formType = 'add';
      this.dialog = true;
      this.blog = {};
    },

    openEditDialog(item) {
      this.formType = 'edit';
      this.blog = item;
      this.dialog = true;
    },

    onAddItem(item) {
      this.blogs.push(item);
    },

    onEditItem(item) {
      this.$set(this.blogs, this.blogs.indexOf(this.blog), item);
    },

    async deleteItem(item) {
      this.loading = true;
      try {
        await axios.delete(`admin/blogs/${item.id}`);
        this.loading = false;
        this.blogs.splice(this.blogs.indexOf(item), 1);
        this.$store.dispatch('snackbar/success', 'Blog successfully deleted!');
      } catch (error) {
        this.loading = false;
        this.$store.dispatch('snackbar/error', 'Failed to delete blog');
      }
    },
  },
};
</script>
