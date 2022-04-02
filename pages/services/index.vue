<template>
  <div>
    <div class="header">
      <div class="header-title">SERVICES</div>
    </div>
    <div class="services">
      <v-row>
        <v-col lg="4" md="6" cols="12">
          <v-card class="with-padding service" height="100%" elevation="4">
            <img src="~/assets/images/services/bank_loan_assistance.jpg" alt class="image" />
            <div class="content">
              <div class="main-title">Bank Loan Assistance</div>
              <div class="description">See our bank partner special rates for your property loans.</div>
            </div>
          </v-card>
        </v-col>
        <v-col lg="4" md="6" cols="12">
          <v-card class="with-padding service" height="100%" elevation="4">
            <img src="~/assets/images/services/property_appraisal.jpg" alt class="image" />
            <div class="content">
              <div class="main-title">PROPERTY APPRAISAL</div>
              <div
                class="description"
              >Secure the true value of your property thru our Professional and Licensed Appraisers.</div>
            </div>
          </v-card>
        </v-col>
        <v-col lg="4" md="6" cols="12">
          <v-card class="with-padding service" height="100%" elevation="4">
            <img src="~/assets/images/services/title_transfer.jpg" alt class="image" />
            <div class="content">
              <div class="main-title">TITLE TRANSFER</div>
              <div
                class="description"
              >Leave the legal papers and leg-work with us. Processing your extrajudicial settlement, tax payment and title transfer comes at your convenience.</div>
            </div>
          </v-card>
        </v-col>
        <v-col lg="4" md="6" cols="12">
          <v-card class="with-padding service" height="100%" elevation="4">
            <img src="~/assets/images/services/property_insurance.jpg" alt class="image" />
            <div class="content">
              <div class="main-title">Property Insurance</div>
              <div
                class="description"
              >Secure your valued property through our reliable non-life and property insurance partners.</div>
            </div>
          </v-card>
        </v-col>
        <v-col lg="6" md="12" cols="12">
          <v-card class="with-padding service" height="100%" elevation="4">
            <img src="~/assets/images/services/interior.jpg" alt class="image" />
            <div class="content">
              <div class="main-title">Interior Designing</div>
              <div
                class="description"
              >Design and maintain your property through our allied service providers. Our on call architects, engineers, builders and up-keep professionals for your worry-free properties.</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Buy and invest now while the prices are still low or sell yours to earn' || ''
        },
        { name: 'og:image', content: '/COVER.jpg' || '' },
        { name: 'og:site_name', content: 'Neal & Co. Realty' },
        { name: 'og:description', content: 'Buy and invest now while the prices are still low or sell yours to earn' },
        {
          name: 'twitter:description',
          content: 'Buy and invest now while the prices are still low or sell yours to earn'
        },
        { name: 'twitter:image', content: '/COVER.jpg' }
      ]
    };
  }
};
</script>
