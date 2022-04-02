<template>
  <v-dialog v-model="dialog" width="800" :persistent="loading.form">
    <v-card class="no-padding">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="headline">Amenities</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container class="admin-container">
        <v-form ref="form" @submit.prevent="addAmenity()">
          <v-row class="align-center">
            <v-col md="10">
              <v-text-field v-model="amenityField" label="Amenity" outlined hide-details="auto"></v-text-field>
            </v-col>
            <v-col md="2">
              <v-btn color="success" large type="submit">
                <v-icon dark>mdi-plus</v-icon>
                &nbsp;Add
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="amenity in property.amenities" :key="amenity.description">
                <td>{{ amenity.description }}</td>
                <td>
                  <v-btn dark color="red" @click="deleteAmenity(amenity)" :loading="loading.delete">
                    <v-icon>mdi-delete</v-icon>
                    &nbsp;Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" large @click.prevent="submit()" :loading="loading.form">
          <v-icon>mdi-content-save</v-icon>
          &nbsp;Save Changes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: ['property', 'value'],

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
    amenityField: null,

    loading: {
      form: false,
      delete: false,
    },
  }),
  methods: {
    addAmenity() {
      this.property.amenities.push({ description: this.amenityField });
      this.$refs.form.reset();
    },

    deleteAmenity(item) {
      this.property.amenities.splice(this.property.amenities.indexOf(item), 1);
    },

    async submit() {
      this.loading.form = true;

      try {
        const { data } = await axios.post(`admin/properties/${this.property.id}/amenities`, { amenities: this.property.amenities });
        this.loading.form = false;
        this.dialog = false;
        this.$store.dispatch('snackbar/success', 'Amenities updated!');
      } catch (error) {
        this.loading.form = false;
        this.$store.dispatch('snackbar/error', 'Failed to update amenities!');
      }
    },
  },
};
</script>
