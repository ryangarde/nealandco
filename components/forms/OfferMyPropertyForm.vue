<template>
  <v-form ref="form" @submit.prevent="submit()">
    <v-row>
      <v-col md="12" cols="12">
        <BaseTextField v-model="form.primaryAddress" label="Address Line 1" :rules="[rule.required]" />
      </v-col>

      <v-col md="12" cols="12">
        <BaseTextField v-model="form.secondaryAddress" label="Address Line 2" />
      </v-col>

      <v-col md="6" cols="12">
        <BaseTextField v-model="form.barangay" label="Area/District/Barangay" :rules="[rule.required]" />
      </v-col>
      <v-col md="6" cols="12">
        <BaseTextField v-model="form.city" label="City" :rules="[rule.required]" />
      </v-col>

      <v-col md="6" cols="12">
        <BaseTextField v-model="form.region" label="Region" :rules="[rule.required]" />
      </v-col>
      <v-col md="6" sm="5" cols="12">
        <BaseTextField v-model="form.postalCode" type="number" label="Postal Code" :rules="[rule.required, rule.number]" />
      </v-col>

      <v-col md="6" sm="7" cols="12">
        <BaseSelect
          v-model="form.propertyType"
          label="Property Type"
          :items="propertyTypes"
          :loading="loading.propertyTypes"
          :rules="[rule.required]"
        />
      </v-col>
      <v-col md="6" sm="4" cols="12">
        <BaseTextField v-model="form.year" type="number" label="Year Built" :rules="[rule.required, rule.number]" />
      </v-col>

      <v-col md="6" sm="4" cols="12">
        <BaseTextField v-model="form.lotArea" type="number" label="Lot Area(sqm)" :rules="[rule.required, rule.number]" />
      </v-col>
      <v-col md="6" sm="4" cols="12">
        <BaseTextField v-model="form.floorArea" type="number" label="Floor Area(sqm)" :rules="[rule.required, rule.number]" />
      </v-col>

      <v-col md="12" cols="12">
        <BaseTextField v-model="form.price" type="number" label="Selling Price" :rules="[rule.required, rule.number]" />
      </v-col>

      <v-col md="12" cols="12">
        <BaseTextArea v-model="form.specialFeatures" label="Special Features" auto-grow no-resize />
      </v-col>

      <v-col md="12" cols="12">
        <BaseTextArea v-model="form.notes" label="Notes" auto-grow no-resize />
      </v-col>

      <v-col md="6" cols="12">
        <BaseTextField v-model="form.firstName" label="First Name" :rules="[rule.required]" />
      </v-col>
      <v-col md="6" cols="12">
        <BaseTextField v-model="form.lastName" label="Last Name" :rules="[rule.required]" />
      </v-col>

      <v-col md="7" cols="12">
        <BaseTextField v-model="form.emailAddress" type="email" label="Email Address" :rules="[rule.required, rule.email]" />
      </v-col>
      <v-col md="5" sm="5" cols="12">
        <BaseTextField v-model="form.contactNumber" type="number" label="Contact Number" :rules="[rule.required, rule.number]" />
      </v-col>

      <v-col md="6" sm="3" cols="12">
        <BaseTextField v-model="form.age" type="number" label="Age" :rules="[rule.required, rule.number]" />
      </v-col>
      <v-col md="6" sm="4" cols="12">
        <BaseSelect v-model="form.gender" label="Gender" :items="genders" :rules="[rule.required]" />
      </v-col>

      <v-col md="12" cols="12">
        <BaseTextField v-model="form.occupation" label="Occupation" :rules="[rule.required]" />
      </v-col>
    </v-row>
    <br />
    <v-row>
      <v-col md="6" sm="5" lg="4" offset-md="6" offset-sm="7" offset-lg="8">
        <v-btn color="primary" block large :loading="loading.form" type="submit">Sell my property</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>




<script>
import axios from 'axios';
import rule from '~/utils/rule';

import BaseTextField from '~/components/form/BaseTextField.vue';
import BaseTextArea from '~/components/form/BaseTextArea.vue';
import BaseSelect from '~/components/form/BaseSelect.vue';

export default {
  components: {
    BaseTextField,
    BaseSelect,
    BaseTextArea,
  },
  data: () => ({
    loading: {
      form: false,
      propertyTypes: false,
    },
    rule,

    propertyTypes: [],
    genders: ['Male', 'Female'],

    form: {
      primaryAddress: null,
      secondaryAddress: null,
      barangay: null,
      city: null,
      region: null,
      postalCode: null,
      propertyType: null,
      year: null,
      lotArea: null,
      floorArea: null,
      price: null,
      specialFeatures: null,
      notes: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      contactNumber: null,
      age: null,
      gender: null,
      occupation: null,
    },
  }),

  async created() {
    try {
      const { data } = await axios.get('properties/types');
      this.propertyTypes = data;
      this.loading.propertyTypes = false;
    } catch (error) {
      this.loading.propertyTypes = false;
    }
  },

  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;
      this.loading.form = true;

      try {
        await axios.post('mail/offer-property', this.form);
        this.loading.form = false;
        this.$emit('success');
        this.$refs.form.reset();
        this.$store.dispatch('snackbar/success', 'Email sent!');
      } catch (error) {
        this.loading.form = false;
        this.$store.dispatch('snackbar/error', error.response?.data || 'Failed to send email. Please check internet connection');
      }
    },
  },
};
</script>
