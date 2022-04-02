<template>
  <v-dialog v-model="dialog" content-class="offer-property">
    <v-card>
      <v-row>
        <v-col lg="5" md="5" cols="12">
          <v-card-title primary-title class="display-1">CONDITIONS APPLY:</v-card-title>
          <v-card-text>
            <ul>
              <li>Only property Owners or Attorney-in-Fact (AIF) with Special Power of Attorney (SPA) shall be accepted.</li>
              <br />
              <li>All request for listing shall be reviewed and subject to acceptance of NEAL&Co. Realty Management.</li>
              <br />
              <li>NEAL&Co. Realty shall request proof of ownership.</li>
              <br />
              <li>Owner has the right to cancel the listing at any time</li>
              <br />
              <li>Upon approval, the listing shall remain on the website until sold or otherwise cancelled by both parties.</li>
            </ul>
            <br />
            <br />
          </v-card-text>
        </v-col>
        <v-col lg="7" md="7" cols="12">
          <v-card-text>
            <OfferMyPropertyForm @success="dialog = false" />
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import OfferMyPropertyForm from '~/components/forms/OfferMyPropertyForm';

export default {
  components: {
    OfferMyPropertyForm,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
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
};
</script>
