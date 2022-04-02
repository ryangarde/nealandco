<template>
  <v-dialog v-model="dialog" width="100rem" :persistent="loading" transition="fade-transition">
    <v-card>
      <v-form ref="form" @submit.prevent="submit()">
        <v-container>
          <v-row>
            <v-col md="12" cols="12">
              <BaseFileInput accept="image/*" v-model="form.image" label="Image" />
            </v-col>
            <v-col md="12" cols="12">
              <BaseTextField v-model="form.name" label="Name" :rules="rule.required" />
            </v-col>
            <v-col md="12" cols="12">
              <BaseTextArea v-model="form.short_description" label="Short Description" :rules="rule.required" />
            </v-col>
            <v-col md="12" cols="12">
              <BaseTextEditor ref="description" v-model="form.description" label="Description" />
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" large dark :loading="loading" type="submit">Save</v-btn>
          <v-btn color="red darken-1" large dark @click="dialog = false" :disabled="loading">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <v-snackbar v-model="successMessage.status" color="success">
      {{ successMessage.description }}
      <v-btn dark text @click="successMessage.status = false">Close</v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import NewTestimonialImageModal from '~/components/admin/testimonials/NewTestimonialImageModal';
import BaseTextField from '~/components/form/BaseTextField';
import BaseTextArea from '~/components/form/BaseTextArea';
import BaseTextEditor from '~/components/form/BaseTextEditor';
import BaseFileInput from '~/components/form/BaseFileInput';
import axios from 'axios';

export default {
  props: ['value', 'formType', 'blog'],
  components: {
    NewTestimonialImageModal,
    BaseTextField,
    BaseTextArea,
    BaseTextEditor,
    BaseFileInput,
  },

  data: () => ({
    imageUrl: null,
    loading: false,
    successMessage: false,

    form: {
      name: null,
      image: null,
      short_description: null,
      description: null,
    },

    rule: {
      required: [(value) => !!value || 'Required.'],
    },
  }),

  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  watch: {
    blog(value) {
      this.$nextTick(() => {
        if (this.formType === 'edit') {
          this.form = { ...this.blog };
          this.$refs.description.updateText(null);
          this.$refs.description.updateText(this.blog.description);
          this.form.image = null;
        } else if (this.formType === 'add') {
          this.$refs.description.updateText(null);
          this.$refs.form.reset();
        }
      });
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        let formData = new FormData();
        Object.keys(this.form).forEach((property) => {
          if (this.form[property]) {
            formData.append(property, this.form[property]);
          }
        });

        let url = '';
        let message = '';
        let errorMessage = '';
        let method = '';

        if (this.formType === 'add') {
          url = 'admin/blogs';
          message = 'Blog successfully created!';
          errorMessage = 'Failed to create blog';
        } else if (this.formType === 'edit') {
          url = `admin/blogs/${this.blog.id}/update`;
          message = 'Blog successfully updated!';
          errorMessage = 'Failed to update blog';
        }

        try {
          const { data } = await axios({ method: 'post', url, data: formData });
          this.dialog = false;
          this.loading = false;
          this.$emit(`${this.formType}Item`, data);
          this.$refs.form.reset();
          this.$store.dispatch('snackbar/success', message);
        } catch (error) {
          this.loading = false;
          this.$store.dispatch('snackbar/error', errorMessage);
        }
      }
    },
  },
};
</script>
