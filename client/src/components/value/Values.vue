<template>
  <div>
    <AddValue />
    <div v-if="loader.fetch">Getting values...</div>
    <div v-else>
      <Value v-for="value in values" :key="value.uuid" :value="value" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Value from "@/components/value/Value";
import AddValue from "@/components/value/AddValue";

export default {
  name: "Values",
  components: {
    Value,
    AddValue,
  },
  computed: {
    ...mapGetters({
      loader: "value/loader",
      values: "value/values",
    }),
  },
};
</script>

<style>
</style>