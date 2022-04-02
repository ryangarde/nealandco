<template>
  <v-dialog v-model="dialog" width="80rem" :persistent="loading">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark large v-on="on">
        <v-icon dark>mdi-pencil</v-icon>
        &nbsp;Change
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" @submit.prevent="submit()">
        <v-container>
          <v-file-input
            accept="image/*"
            v-model="image"
            color="primary"
            label="Image"
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            outlined
            show-size
            :rules="rule.required"
          >
            <template v-slot:selection="{ index, text }">
              <v-chip v-if="index < 2" color="primary accent-4" dark label>{{ text }}</v-chip>
            </template>
          </v-file-input>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" large dark :loading="loading" type="submit">Save</v-btn>
          <v-btn color="red darken-1" large dark @click="dialog = false" :disabled="loading">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      image: null,

      rule: {
        required: [(value) => !!value || 'Required.'],
      },
    };
  },
  props: ['testimonial'],
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        let formData = new FormData();
        formData.append('image', this.image);

        axios
          .post(`admin/testimonials/${this.testimonial.id}/image`, formData)
          .then((res) => {
            this.dialog = false;
            this.loading = false;
            this.$emit('editImage', {
              item: res.data,
              message: {
                status: true,
                description: 'Image updated!',
              },
            });

            this.$refs.form.reset();
          })
          .catch((error) => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
