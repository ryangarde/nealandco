<template>
  <v-card>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>
      <br />
      <v-row>
        <v-col md="3" sm="6" cols="12">
          <div class="heading mb-5">Number of properties sold</div>
          <sold-properties :soldProperties="soldProperties" :totalProperties="totalSaleProperties"></sold-properties>
        </v-col>

        <v-col md="3" sm="6" cols="12">
          <div class="heading mb-5">Number of properties leased</div>
          <sold-properties :soldProperties="leasedProperties" :totalProperties="totalRentProperties"></sold-properties>
        </v-col>
      </v-row>

      <br />
      <br />
    </v-container>
  </v-card>
</template>

<script>
import axios from 'axios';
import SoldProperties from '~/components/admin/dashboard/SoldProperties';

export default {
  layout: 'admin',
  components: { SoldProperties },
  data() {
    return {
      soldProperties: 0,
      leasedProperties: 0,
      totalSaleProperties: 0,
      totalRentProperties: 0,
    };
  },
  created() {
    axios.get(`admin/properties/sold`).then((res) => {
      this.soldProperties = res.data.soldProperties;
      this.totalSaleProperties = res.data.totalSaleProperties;
    });

    axios.get(`admin/properties/leased`).then((res) => {
      this.leasedProperties = res.data.leasedProperties;
      this.totalRentProperties = res.data.totalRentProperties;
    });
  },
};
</script>
