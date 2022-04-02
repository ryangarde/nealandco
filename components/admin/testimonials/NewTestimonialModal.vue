<template>
  <v-dialog v-model="dialog" width="100rem" :persistent="loading">
    <template v-slot:activator="{ on }">
      <v-icon color="primary" small class="mr-2 display-2" v-if="formType == 'edit'" v-on="on" @click="edit()">mdi-pencil</v-icon>
      <v-btn color="success" dark large v-on="on" v-else>
        <v-icon dark>mdi-comment-plus</v-icon>
        &nbsp;Add
      </v-btn>
    </template>

    <v-card>
      <v-form ref="form" @submit.prevent="submit()">
        <v-container>
          <v-row>
            <v-col md="5" class="mx-auto" v-if="imageUrl">
              <v-card class="no-padding">
                <v-img :src="imageUrl"></v-img>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <new-testimonial-image-modal :testimonial="testimonial" @editImage="onEditImage"></new-testimonial-image-modal>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col md="12" cols="12">
              <v-file-input
                accept="image/*"
                v-model="image"
                color="primary"
                label="Image"
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                outlined
                show-size
                v-if="formType == 'add'"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="primary accent-4" dark label>{{ text }}</v-chip>
                </template>
              </v-file-input>
            </v-col>
            <v-col md="12" cols="12">
              <v-text-field v-model="name" label="Name" hide-details="auto" outlined clearable :rules="rule.required"></v-text-field>
            </v-col>
            <v-col md="12" cols="12">
              <v-textarea v-model="description" label="Comment" hide-details="auto" outlined clearable :rules="rule.required"></v-textarea>
            </v-col>
            <v-col md="4" cols="12">
              <v-select
                v-model="stars"
                label="Stars"
                :items="starsComboBox"
                hide-details="auto"
                outlined
                clearable
                :value="stars"
                :rules="rule.required"
              ></v-select>
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
import axios from 'axios';

export default {
  data() {
    return {
      imageUrl: null,
      loading: false,
      successMessage: false,

      image: null,
      name: null,
      description: null,
      stars: null,
      dialog: false,
      starsComboBox: ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],

      rule: {
        required: [(value) => !!value || 'Required.'],
      },
    };
  },
  props: ['formType', 'testimonial'],
  components: {
    NewTestimonialImageModal,
  },
  methods: {
    onEditImage(data) {
      this.successMessage = data.message;
      this.testimonial = data.item;
      this.imageUrl = this.$config.imageUrl + this.testimonial.image;
    },
    edit() {
      this.imageUrl = this.$config.imageUrl + this.testimonial.image;
      this.name = this.testimonial.name;
      this.description = this.testimonial.description;
      if (Number.isInteger(parseFloat(this.testimonial.stars))) this.stars = parseFloat(this.testimonial.stars).toFixed(0).toString();
      else this.stars = parseFloat(this.testimonial.stars).toFixed(1).toString();
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        let formDataEdit = {
          name: this.name,
          description: this.description,
          stars: this.stars,
        };

        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('image', this.image);
        formData.append('description', this.description);
        formData.append('stars', this.stars);

        if (this.formType == 'add')
          axios
            .post(`admin/testimonials`, formData)
            .then((res) => {
              this.dialog = false;
              this.loading = false;
              this.$emit('addItem', {
                item: res.data,
                message: {
                  status: true,
                  description: 'Testimonial successfully added!',
                },
              });

              this.$refs.form.reset();
            })
            .catch((error) => {
              this.loading = false;
            });
        else if (this.formType == 'edit') {
          axios
            .put(`admin/testimonials/${this.testimonial.id}`, formDataEdit)
            .then((res) => {
              this.dialog = false;
              this.loading = false;
              this.$emit('editItem', {
                previousItem: this.testimonial,
                item: res.data,
                message: {
                  status: true,
                  description: 'Testimonial successfully updated!',
                },
              });
            })
            .catch((error) => {
              this.loading = false;
            });
        }
      }
    },
  },
};
</script>
