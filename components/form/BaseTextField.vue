<template>
  <v-text-field v-model="form" hide-details="auto" outlined clearable v-bind="$attrs" />
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