<template>
  <v-dialog v-model="dialog" content-class="offer-property" :persistent="loading.form">
    <v-form ref="form" @submit.prevent="submit()">
      <v-card>
        <v-row>
          <v-col md="5" cols="12">
            <BaseTextField v-model="form.propertyNumber" label="Property No." />
          </v-col>
          <v-col md="7" cols="12">
            <BaseTextField v-model="form.location" label="Preferred Location" :rules="[rule.required]" />
          </v-col>

          <v-col md="4" cols="12">
            <BaseSelect
              v-model="form.propertyType"
              label="Property Type"
              :items="propertyTypes"
              :loading="loading.propertyTypes"
              :rules="[rule.required]"
            />
          </v-col>
          <v-col md="4" cols="12">
            <BaseTextField v-model="form.firstName" label="First Name" :rules="[rule.required]" />
          </v-col>
          <v-col md="4" cols="12">
            <BaseTextField v-model="form.lastName" label="Last Name" :rules="[rule.required]" />
          </v-col>

          <v-col lg="5" md="8" cols="12">
            <BaseTextField v-model="form.emailAddress" type="email" label="Email Address" :rules="[rule.email]" />
          </v-col>
          <v-col lg="3" md="4" cols="12">
            <BaseTextField v-model="form.contactNumber" type="number" label="Contact Number" :rules="[rule.required, rule.number]" />
          </v-col>
          <v-col lg="2" md="3" sm="6" cols="12">
            <BaseTextField
              v-model="form.minPrice"
              type="number"
              label="Min Price"
              ref="minPrice"
              :rules="[rule.required, rule.number, rule.minPrice(form.minPrice, form.maxPrice)]"
            />
          </v-col>
          <v-col lg="2" md="3" sm="6" cols="12">
            <BaseTextField
              v-model="form.maxPrice"
              type="number"
              label="Max Price"
              :rules="[rule.required, rule.number, rule.maxPrice(form.maxPrice, form.minPrice)]"
              ref="maxPrice"
            />
          </v-col>

          <v-col lg="2" md="3" sm="6" cols="12">
            <BaseTextField v-model="form.age" type="number" label="Age" :rules="[rule.required, rule.number]" />
          </v-col>
          <v-col lg="2" md="3" sm="6" cols="12">
            <BaseSelect v-model="form.gender" label="Gender" :items="genders" :rules="[rule.required]" />
          </v-col>
          <v-col lg="5" md="8" sm="7" cols="12">
            <BaseTextField v-model="form.occupation" label="Occupation" :rules="[rule.required]" />
          </v-col>
          <v-col lg="3" md="4" sm="5" cols="12">
            <BaseSelect v-model="form.schedule" label="Preferred Schedule" :items="schedules" :rules="[rule.required]" />
          </v-col>

          <v-col md="12" cols="12">
            <BaseTextArea v-model="form.notes" label="Additional Notes" no-resize auto-grow :rules="[rule.required]" />
          </v-col>
          <v-col md="3" offset-md="9">
            <v-btn color="primary" block large type="submit" :loading="loading.form">Book Now</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import rule from '~/utils/rule';
import BaseTextField from '~/components/form/BaseTextField.vue';
import BaseSelect from '~/components/form/BaseSelect.vue';
import BaseTextArea from '~/components/form/BaseTextArea.vue';

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    BaseTextField,
    BaseSelect,
    BaseTextArea,
  },

  data() {
    return {
      loading: {
        form: false,
        propertyTypes: true,
      },
      form: {
        propertyNumber: null,
        location: null,
        propertyType: null,
        firstName: null,
        lastName: null,
        emailAddress: null,
        minPrice: null,
        maxPrice: null,
        contactNumber: null,
        age: null,
        gender: null,
        occupation: null,
        schedule: null,
        notes: null,
      },

      propertyTypes: [],
      genders: ['Male', 'Female'],
      schedules: ['Weekday', 'Weekend'],
      rule,
    };
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

  async created() {
    try {
      const { data } = await axios.get('properties/types');
      this.propertyTypes = data;
      this.loading.propertyTypes = false;
    } catch (error) {
      this.loading.propertyTypes = false;
    }
  },

  watch: {
    'form.minPrice'() {
      this.$refs.minPrice.validate();
    },
    'form.maxPrice'() {
      this.$refs.maxPrice.validate();
    },
  },

  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;
      this.loading.form = true;

      try {
        await axios.post(`mail/book-a-viewing`, this.form);
        this.loading.form = false;
        this.dialog = false;
        this.$store.dispatch('snackbar/success', 'Email sent!');
        this.$refs.form.reset();
      } catch (error) {
        this.loading.form = false;
        this.$store.dispatch('snackbar/error', error.response?.data || 'Failed to send email. Please check internet connection');
      }
    },
  },
};
</script>
