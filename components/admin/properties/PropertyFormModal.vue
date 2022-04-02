<template>
  <v-dialog v-model="dialog" width="140rem" :persistent="loading.form" transition="fade-transition">
    <v-form ref="form">
      <v-card>
        <v-card-text>
          <v-row v-if="formType == 'edit'">
            <v-col v-for="image in property.property_images" :key="image.id" md="3" sm="8" cols="12">
              <v-card class="no-padding">
                <div
                  :style="`background-image: url(${image.name});
                           background-position: center;
                           background-size: cover;
                           height: 25rem`"
                ></div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" dark large @click="deleteImage(image)" :loading="loading.images">
                    <v-icon>mdi-delete</v-icon>
                    Remove
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <br />
          <br />

          <v-row>
            <v-col md="6" cols v-if="formType == 'add'">
              <BaseSelect v-model="form.image_type" label="Image type" :items="['standard', 'panorama']" :rules="[rule.required]" />
            </v-col>

            <v-col md="6" cols="12" v-if="formType == 'add' && form.image_type == 'standard'">
              <v-file-input
                accept="image/*"
                v-model="form.images"
                label="Select image/s"
                hide-details="auto"
                prepend-icon
                show-size
                chips
                outlined
                :rules="[rule.required]"
                multiple
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="primary accent-4" dark label>{{ text }}</v-chip>
                  <span v-else-if="index === 2" class="headline grey--text text--darken-3 mx-2">+{{ image.length - 2 }} File(s)</span>
                </template>
              </v-file-input>
            </v-col>

            <v-col md="6" cols="12" v-if="formType == 'add' && form.image_type == 'panorama'">
              <v-file-input
                accept="image/*"
                v-model="form.images"
                label="Panorama Image"
                hide-details="auto"
                prepend-icon
                show-size
                chips
                outlined
                :rules="[rule.required]"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip color="primary accent-4" dark label>{{ text }}</v-chip>
                </template>
              </v-file-input>
            </v-col>

            <v-col md="12" cols="12">
              <BaseTextField v-model="form.propertyNumber" label="Property Number" />
            </v-col>
            <v-col md="12" cols="12">
              <BaseTextField v-model="form.primaryAddress" label="Primary Address" :rules="[rule.required]" />
            </v-col>
            <v-col md="12" cols="12">
              <BaseTextField v-model="form.secondaryAddress" label="Secondary Address" :rules="[rule.required]" />
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <BaseSelect v-model="form.type" label="Type" :items="types" :rules="[rule.required]" :loading="loading.select" />
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <BaseSelect v-model="form.status" label="Status" :items="statuses" :rules="[rule.required]" :loading="loading.select" />
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <BaseTextField type="number" v-model="form.lotArea" label="Lot Area" :rules="[rule.number]" />
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <BaseTextField type="number" v-model="form.floorArea" label="Floor Area" :rules="[rule.number]" />
            </v-col>
            <v-col md="4" sm="4" cols="12">
              <BaseTextField type="number" v-model="form.bedrooms" label="Bedroom" :rules="[rule.number]" />
            </v-col>
            <v-col md="4" sm="4" cols="12">
              <BaseTextField type="number" v-model="form.bathrooms" label="Bathroom" :rules="[rule.number]" />
            </v-col>
            <v-col md="4" sm="4" cols="12">
              <BaseTextField type="number" v-model="form.garage" label="Garage" :rules="[rule.number]" />
            </v-col>
            <v-col md="12" cols="12">
              <BaseTextField type="number" v-model="form.price" label="Price" :rules="[rule.number]" />
            </v-col>
            <v-col md="12" cols="12">
              <BaseTextArea v-model="form.description" label="Description" :rules="[rule.required]" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <new-property-image-modal v-if="formType == 'edit'" :propertyId="property.id" @addImage="onAddImage"></new-property-image-modal>
          <v-spacer></v-spacer>
          <v-btn color="success" large dar :loading="loading.form" @click.prevent="submit()" type="submit">Save</v-btn>
          <v-btn color="red darken-1 white--text" large @click="dialog = false" :disabled="loading.submit">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import NewPropertyImageModal from '~/components/admin/properties/NewPropertyImageModal';
import BaseTextField from '~/components/form/BaseTextField';
import BaseFileInput from '~/components/form/BaseFileInput';
import BaseSelect from '~/components/form/BaseSelect';
import BaseTextArea from '~/components/form/BaseTextArea';
import rule from '~/utils/rule';

export default {
  components: {
    NewPropertyImageModal,
    BaseTextField,
    BaseFileInput,
    BaseSelect,
    BaseTextArea,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    formType: {
      type: String,
      default: null,
    },
    property: Object,
  },

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

  data: () => ({
    loading: {
      form: false,
      images: false,
      select: true,
    },
    rule,

    types: [],
    statuses: [],

    form: {
      images: null,
      primaryAddress: null,
      secondaryAddress: null,
      propertyNumber: null,
      type: null,
      image_type: 'standard',
      status: null,
      lotArea: null,
      floorArea: null,
      bedrooms: null,
      bathrooms: null,
      garage: null,
      price: null,
      description: null,
    },
  }),

  async mounted() {
    try {
      const { data: statuses } = await axios.get(`properties/statuses`);
      this.statuses = statuses;

      const { data: types } = await axios.get(`properties/types`);
      this.types = types;

      this.loading.select = false;
    } catch (error) {
      this.loading.select = false;
    }
  },

  watch: {
    async property(property) {
      this.form = JSON.parse(JSON.stringify(property));
      this.form.images = null;
    },
  },

  methods: {
    onAddImage(data) {
      for (let i = 0; i < data.image.length; i++) {
        this.property.property_images.push(data.image[i]);
      }
    },

    async deleteImage(image) {
      this.loading.images = true;

      try {
        await axios.delete(`admin/properties/${this.property.id}/images/${image.id}`);
        this.property.property_images.splice(this.property.property_images.indexOf(image), 1);
        this.loading.images = false;
        this.$store.dispatch('snackbar/success', 'Image added!');
      } catch (error) {
        this.$store.dispatch('snackbar/error', 'Failed to add image!');
      }
    },

    async submit() {
      if (!this.$refs.form.validate()) return;
      this.loading.form = true;

      let formData;
      if (this.formType == 'add') {
        formData = new FormData();

        Object.keys(this.form).forEach((property) => {
          if (!this.form[property]) return;

          if (property !== 'images') {
            formData.append(property, this.form[property]);
            return;
          }

          if (this.form.image_type === 'standard') {
            for (let i = 0; i < this.form.images.length; i++) {
              formData.append('images[]', this.form.images[i]);
            }
          } else if (this.form.image_type == 'panorama') {
            formData.append('images', this.form.images);
          }
        });
      } else if (this.formType == 'edit') {
        formData = this.form;
      }

      let url = 'admin/properties';
      let message = 'Property successfully created!';
      let method = 'POST';
      if (this.formType === 'edit') {
        url = `admin/properties/${this.property.id}`;
        message = 'Property successfully updated!';
        method = 'PUT';
      }

      try {
        const { data } = await axios({ method, url, data: formData });
        this.dialog = false;
        this.loading.form = false;

        if (this.formType === 'add') {
          this.$emit('addItem', data);
          this.$refs.form.reset();
        } else if (this.formType === 'edit') {
          this.$emit('editItem', data);
        }

        this.$store.dispatch('snackbar/success', message);
      } catch (error) {
        this.loading.form = false;
        this.$store.dispatch('snackbar/error', error.response.message);
      }
    },
  },
};
</script>
