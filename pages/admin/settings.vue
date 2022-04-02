<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-title>
        <v-row fluid class="align-center">
          <v-col md="6" cols>
            <v-text-field
              v-model="emailReceiver"
              label="Email Receiver"
              hide-details="auto"
              outlined
              clearable
              :loading="loading"
            ></v-text-field>
          </v-col>
          <v-col md="3" cols>
            <v-btn
              color="primary"
              type="submit"
              large
              @click="changeSettings('loadingEmailReceiver', 'set-email-receiver', 'Email Receiver updated!', { emailReceiver })"
              :loading="loadingEmailReceiver"
            >
              Set Email Receiver
            </v-btn>
          </v-col>

          <v-col md="4" cols="12">
            <v-text-field
              v-model="facebookLink"
              label="Facebook Link"
              hide-details="auto"
              outlined
              clearable
              :loading="loading"
            ></v-text-field>
          </v-col>
          <v-col md="2" cols="12">
            <v-btn
              color="#3b5998"
              type="submit"
              dark
              large
              block
              @click="changeSettings('loadingFacebookLink', 'set-facebook-link', 'Facebook Link updated!', { facebookLink })"
              :loading="loadingFacebookLink"
            >
              <v-icon>mdi-facebook</v-icon>
              &nbsp;Set link
            </v-btn>
          </v-col>

          <v-col md="4" cols="12">
            <v-text-field
              v-model="instagramLink"
              label="Instagram Link"
              hide-details="auto"
              outlined
              clearable
              :loading="loading"
            ></v-text-field>
          </v-col>
          <v-col md="2" cols="12">
            <v-btn
              color="#e1306c"
              type="submit"
              dark
              large
              block
              @click="changeSettings('loadingInstagramLink', 'set-instagram-link', 'Instagram Link updated!', { instagramLink })"
              :loading="loadingInstagramLink"
            >
              <v-icon>mdi-instagram</v-icon>
              &nbsp;Set link
            </v-btn>
          </v-col>

          <v-col md="4" cols="12">
            <v-text-field
              v-model="youtubeLink"
              label="Youtube Link"
              hide-details="auto"
              outlined
              clearable
              :loading="loading"
            ></v-text-field>
          </v-col>
          <v-col md="2" cols="12">
            <v-btn
              color="#c4302b"
              dark
              type="submit"
              large
              block
              @click="changeSettings('loadingYoutubeLink', 'set-youtube-link', 'Youtube Link updated!', { youtubeLink })"
              :loading="loadingYoutubeLink"
            >
              <v-icon>mdi-youtube</v-icon>
              &nbsp;Set link
            </v-btn>
          </v-col>

          <v-col md="4" cols="12">
            <v-text-field
              v-model="twitterLink"
              label="Twitter Link"
              hide-details="auto"
              outlined
              clearable
              :loading="loading"
            ></v-text-field>
          </v-col>
          <v-col md="2" cols="12">
            <v-btn
              color="#00acee"
              dark
              type="submit"
              large
              block
              @click="changeSettings('loadingTwitterLink', 'set-twitter-link', 'Twitter Link updated!', { twitterLink })"
              :loading="loadingTwitterLink"
            >
              <v-icon>mdi-twitter</v-icon>
              &nbsp;Set link
            </v-btn>
          </v-col>

          <v-col md="4" cols="12">
            <v-text-field
              v-model="linkedInLink"
              label="LinkedIn Link"
              hide-details="auto"
              outlined
              clearable
              :loading="loading"
            ></v-text-field>
          </v-col>
          <v-col md="2" cols="12">
            <v-btn
              color="#0e76a8"
              dark
              type="submit"
              large
              block
              @click="changeSettings('loadingLinkedInLink', 'set-linkedin-link', 'Linked In Link updated!', { linkedInLink })"
              :loading="loadingLinkedInLink"
            >
              <v-icon>mdi-linkedin</v-icon>
              &nbsp;Set link
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>

    <v-snackbar v-model="successMessage.status" color="success">
      {{ successMessage.description }}
      <v-btn dark text @click="successMessage.status = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios';
import rule from '~/utils/rule';

export default {
  layout: 'admin',
  data() {
    return {
      emailReceiver: null,
      facebookLink: null,
      instagramLink: null,
      twitterLink: null,
      youtubeLink: null,
      linkedInLink: null,

      successMessage: false,
      loading: true,
      loadingEmailReceiver: false,
      loadingFacebookLink: false,
      loadingInstagramLink: false,
      loadingYoutubeLink: false,
      loadingTwitterLink: false,
      loadingLinkedInLink: false,

      rule,
    };
  },
  mounted() {
    axios
      .get(`settings`)
      .then((res) => {
        this.emailReceiver = res.data.emailReceiver;
        this.facebookLink = res.data.facebookLink;
        this.instagramLink = res.data.instagramLink;
        this.twitterLink = res.data.twitterLink;
        this.youtubeLink = res.data.youtubeLink;
        this.linkedInLink = res.data.linkedInLink;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
      });
  },
  methods: {
    changeSettings(loader, link, message, data) {
      this[loader] = true;
      axios
        .post(`admin/settings/${link}`, data)
        .then((res) => {
          // this[inputField] = res.data[inputField];
          this[loader] = false;
          this.$store.dispatch('snackbar/success', message);
        })
        .catch((error) => {
          this[loader] = false;
          this.$store.dispatch('snackbar/error', 'Server Error');
        });
    },
  },
};
</script>
