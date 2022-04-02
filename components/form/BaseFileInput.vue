<template>
  <v-file-input v-model="form" color="primary" prepend-icon="" outlined hide-details="auto" show-size v-bind="$attrs">
    <template v-slot:selection="{ index, text }">
      <v-chip v-if="index < 2" color="primary accent-4" dark label>{{ text }}</v-chip>
    </template>
  </v-file-input>
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