<template>
  <div>
    <BodyForm
      :form-type="'add'"
      :data-type="'value'"
      :prev-body="''"
      :errors="errors"
      :loader="loader"
      :submit-func="addOne"
    />
    <div v-if="loader.fetch">Getting values...</div>
    <div v-else>
      <Value v-for="value in values" :key="value.uuid" :value="value" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Value from "@/components/value/Value";
import BodyForm from "@/components/utilities/BodyForm";

export default {
  name: "Values",
  components: {
    Value,
    BodyForm,
  },
  computed: {
    ...mapGetters({
      loader: "value/loader",
      errors: "value/errors",
      values: "value/values",
    }),
  },
  methods: {
    ...mapActions({ addOne: "value/addOne" }),
  },
};
</script>

<style>
</style>