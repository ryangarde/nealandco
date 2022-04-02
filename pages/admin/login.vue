<template>
  <v-app class="login">
    <v-row class="justify-center align-center fill-height">
      <v-col lg="5" md="7" sm="12">
        <v-container>
          <v-form ref="form">
            <v-card elevation="5">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Admin Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-text-field label="Email address" v-model="form.email" prepend-icon="mdi-account" type="email"></v-text-field>

                <v-text-field label="Password" v-model="form.password" prepend-icon="mdi-lock" type="password"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" large @click.prevent="submit()" :loading="loading" type="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'auth',
  data: () => ({
    loading: false,

    form: {
      email: null,
      password: null,
    },
  }),
  methods: {
    async submit() {
      this.loading = true;

      try {
        const { data } = await axios.post(`login`, this.form);

        localStorage.setItem('name', data.user.name);
        window.$nuxt.$cookies.set('token', data.token, {
          path: '/',
        });
        this.loading = false;
        this.$router.push('/admin');
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$store.dispatch('snackbar/error', error.response.status === 404 ? 'Invalid credentials' : 'Server Error');
      }
    },
  },
};
</script>
