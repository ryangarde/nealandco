<template>
  <v-dialog v-model="dialogStatus" width="70rem" :persistent="loading" @click:outside="$emit('closeDialog', false)">
    <template v-slot:activator="{ on }">
      <button class="button white-btn" v-on="on" v-if="origin == 'View Property'">SEND MESSAGE/INQUIRY</button>
    </template>

    <v-card>
      <v-form ref="form" @submit.prevent="submit(property)">
        <v-card-title class="display-1 text-center">Please fill in your contact details</v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="12" cols="12">
              <v-text-field
                v-model="emailAddress"
                label="Email Address"
                outlined
                clearable
                hide-details="auto"
                type="email"
                :rules="rule.email"
              ></v-text-field>
            </v-col>
            <v-col md="12" cols="12">
              <v-text-field
                v-model="firstName"
                label="First Name"
                outlined
                clearable
                hide-details="auto"
                :rules="rule.required"
              ></v-text-field>
            </v-col>
            <v-col md="12" cols="12">
              <v-text-field
                v-model="lastName"
                label="Last Name"
                outlined
                clearable
                hide-details="auto"
                :rules="rule.required"
              ></v-text-field>
            </v-col>
            <v-col md="12" cols="12">
              <v-text-field
                v-model="contactNumber"
                label="Contact Number"
                outlined
                clearable
                hide-details="auto"
                :rules="rule.number"
              ></v-text-field>
            </v-col>
            <v-col md="12" cols="12">
              <v-textarea v-model="message" label="Message" outlined clearable hide-details no-resize auto-grow></v-textarea>
            </v-col>
          </v-row>

          <br />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" large :loading="loading" type="submit">Send</v-btn>
          <v-btn color="red" large dark :disabled="loading" @click="dialog = false">Cancel</v-btn>
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
      dialogStatus: false,
      loading: false,

      emailAddress: null,
      firstName: null,
      lastName: null,
      contactNumber: null,
      message: null,

      // rules
      rule: {
        required: [(value) => !!value || 'Required.'],
        email: [(value) => !!value || 'Required', (value) => /.+@.+\..+/.test(value) || 'Invalid E-mail format'],
        number: [(value) => !!value || 'Required', (value) => !isNaN(value) || 'Invalid number format'],
      },
    };
  },
  props: ['property', 'origin', 'dialog', 'dialogID'],
  watch: {
    dialog() {
      if (this.dialog === true && this.dialogID == this.property.id) this.dialogStatus = true;
      else this.dialogStatus = false;
    },
  },
  methods: {
    submit(property) {
      if (this.$refs.form.validate()) {
        this.loading = true;

        let formData = {
          ...property,
          emailAddress: this.emailAddress,
          firstName: this.firstName,
          lastName: this.lastName,
          contactNumber: this.contactNumber,
          message: this.message,
          origin: 'Inquire Property',
        };

        axios
          .post(`mail/inquire-properties`, formData)
          .then((res) => {
            this.loading = false;
            this.$emit('emailSent', res.data);
            this.dialogStatus = false;
            this.$refs.form.reset();
          })
          .catch((error) => {
            this.loading = false;
            this.$emit('errorMessage', {
              status: true,
              message: error.response.data.errors,
            });
          });
      }
    },
  },
};
</script>
