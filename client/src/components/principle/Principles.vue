<template>
  <div>
    <AddPrinciple />
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
import { mapGetters } from "vuex";
import Principle from "@/components/principle/Principle";
import AddPrinciple from "@/components/principle/AddPrinciple";

export default {
  name: "Principles",
  components: {
    Principle,
    AddPrinciple,
  },
  computed: {
    ...mapGetters({
      loader: "principle/loader",
      principles: "principle/principles",
    }),
  },
};
</script>

<style>
</style>