<template>
  <button class="delete" @click="onDelete" :disabled="loader.destroy">
    Delete
  </button>
</template>

<script>
export default {
  name: "DeleteBtn",
  props: {
    loader: {
      type: Object,
      default: () => ({}),
    },
    uuid: {
      type: String,
      default: "",
    },
    delFunc: {
      type: Function,
      default: () => console.log("del func"),
    },
  },
  methods: {
    onDelete() {
      this.delFunc({ uuid: this.uuid });
    },
  },
};
</script>

<style>
</style>