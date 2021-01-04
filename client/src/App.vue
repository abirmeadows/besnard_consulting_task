<template>
  <div>App</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  mounted() {
    this.fetchValues();
  },
  methods: {
    ...mapActions({ fetchValues: "value/fetchAll" }),
  },
};
</script>

<style>
</style>
