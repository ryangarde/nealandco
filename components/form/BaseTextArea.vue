<template>
  <v-textarea v-model="form" v-bind="$attrs" hide-details="auto" outlined clearable></v-textarea>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    form: {
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