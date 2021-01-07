<template>
  <div>
    <BodyForm
      :form-type="'add'"
      :data-type="'principle'"
      :prev-body="''"
      :errors="errors"
      :loader="loader"
      :submit-func="addOne"
    />
    <div v-if="loader.fetch">Getting principles...</div>
    <div v-else>
      <Principle
        v-for="principle in principles"
        :key="principle.uuid"
        :principle="principle"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Principle from "@/components/principle/Principle";
import BodyForm from "@/components/utilities/BodyForm";

export default {
  name: "Principles",
  components: {
    Principle,
    BodyForm,
  },
  computed: {
    ...mapGetters({
      loader: "principle/loader",
      errors: "principle/errors",
      principles: "principle/principles",
    }),
  },
  methods: {
    ...mapActions({ addOne: "principle/addOne" }),
  },
};
</script>

<style>
</style>