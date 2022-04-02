<template>
  <v-dialog v-model="dialog" width="80rem" :persistent="loading">
    <template v-slot:activator="{ on }">
      <v-btn color="success" dark large v-on="on">
        <v-icon dark>mdi-comment-plus</v-icon>
        &nbsp;Add Image
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" @submit.prevent="submit()">
        <v-card-text>
          <v-row>
            <v-col md="12" cols>
              <v-select
                v-model="form.type"
                label="Image type"
                :items="['standard', 'panorama']"
                hide-details="auto"
                outlined
                :rules="rule.required"
              />
            </v-col>

            <v-col md="12" cols="12" v-if="form.type == 'standard'">
              <v-file-input
                v-model="form.image"
                color="primary"
                label="Image"
                placeholder="Select image/s"
                prepend-icon
                outlined
                accept="image/*"
                multiple
                show-size
                :rules="rule.requiredArray"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="primary accent-4" dark label>{{ text }}</v-chip>
                  <span v-else-if="index === 2" class="headline grey--text text--darken-3 mx-2">+{{ form.image.length - 2 }} file(s)</span>
                </template>
              </v-file-input>
            </v-col>

            <v-col md="12" cols="12" v-if="form.type == 'panorama'">
              <v-file-input
                v-model="form.image"
                color="primary"
                label="Panorama Image"
                placeholder="Select a panorama image"
                prepend-icon
                outlined
                accept="image/*"
                show-size
                :rules="rule.required"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="primary accent-4" dark label>{{ text }}</v-chip>
                  <span v-else-if="index === 2" class="headline grey--text text--darken-3 mx-2">+{{ form.image.length - 2 }} file(s)</span>
                </template>
              </v-file-input>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" large :loading="loading" type="submit">Save</v-btn>
            <v-btn color="red darken-1" large dark @click="dialog = false" :disabled="loading">Cancel</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        image: null,
        type: 'standard',
      },

      rule: {
        required: [(value) => !!value || 'Required.'],
        requiredArray: [(value) => value?.length > 0 || 'Required'],
      },
    };
  },
  watch: {
    'form.type'() {
      this.form.image = null;
    },
  },
  props: ['propertyId'],
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        let formData = new FormData();
        formData.append('type', this.form.type);
        if (this.form.type === 'standard') {
          for (let i = 0; i < this.form.image.length; i++) {
            formData.append('images[]', this.form.image[i]);
          }
        } else {
          formData.append('image', this.form.image);
        }

        axios
          .post(`admin/properties/${this.propertyId}/images`, formData)
          .then((res) => {
            this.loading = false;
            this.dialog = false;
            this.$emit('addImage', {
              image: res.data,
              message: {
                status: true,
                description: 'Successfully added image/s',
              },
            });

            // this.$refs.form.reset();
            this.form.image = null;
            this.form.type = 'standard';
            this.$refs.form.resetValidation();
          })
          .catch((error) => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
