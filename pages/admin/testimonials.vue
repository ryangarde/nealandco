<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Testimonials</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-5 mb-5"></v-text-field>
        <v-spacer></v-spacer>
        <new-testimonial-modal @addItem="onAddItem" formType="add"></new-testimonial-modal>
      </v-card-title>
      <v-data-table :headers="headers" :items="testimonials" :search="search" :loading="loading" loading-text="Loading... Please wait">
        <template v-slot:item.action="{ item }">
          <new-testimonial-modal @editItem="onEditItem" formType="edit" :testimonial="item"></new-testimonial-modal>
        </template>

        <template v-slot:item.action2="{ item }">
          <v-icon loading color="red" class="display-2" small @click="deleteItem(item)" :disabled="loading">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-snackbar v-model="successMessage.status" color="success">
      {{ successMessage.description }}
      <v-btn dark text @click="successMessage.status = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import NewTestimonialModal from '~/components/admin/testimonials/NewTestimonialModal';
import axios from 'axios';

export default {
  layout: 'admin',
  components: {
    NewTestimonialModal,
  },
  data() {
    return {
      loading: true,
      testimonials: [],
      search: '',
      successMessage: {
        status: false,
        description: null,
      },

      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Comment', value: 'description' },
        { text: 'Stars', value: 'stars' },
        { text: '', value: 'action', sortable: false },
        { text: '', value: 'action2', sortable: false },
      ],
    };
  },
  mounted() {
    axios.get(`admin/testimonials`).then((res) => {
      this.testimonials = res.data;
      this.loading = false;
    });
  },
  methods: {
    onAddItem(data) {
      this.testimonials.push(data.item);
      this.successMessage = data.message;
    },

    onEditItem(data) {
      this.$set(this.testimonials, this.testimonials.indexOf(data.previousItem), data.item);
      this.successMessage = data.message;
    },

    deleteItem(item) {
      this.loading = true;
      axios
        .delete(`admin/testimonials/${item.id}`)
        .then((res) => {
          this.loading = false;
          this.testimonials.splice(this.testimonials.indexOf(item), 1);
          this.successMessage = {
            status: true,
            description: 'Testimonial successfully deleted!',
          };
        })
        .catch((error) => (this.loading = false));
    },
  },
};
</script>
