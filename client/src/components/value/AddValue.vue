<template>
  <form @submit.prevent="onSubmit">
    <div class="input-label">
      <label for="value-input">Add value</label>
      <input
        v-model="body"
        type="text"
        placeholder="New value..."
        id="value-input"
      />
    </div>
    <input type="submit" value="Add" :disabled="loader.add" />
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddValue",
  data() {
    return {
      body: "",
    };
  },
  computed: { ...mapGetters({ loader: "value/loader" }) },
  methods: {
    ...mapActions({ addOne: "value/addOne" }),
    onSubmit() {
      this.addOne({ body: this.body, clearForm: this.clearForm });
    },
    clearForm() {
      this.body = "";
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
}
.input-label {
  flex: 1;
  margin-right: 0.5rem;
}

input {
  border-width: 2px;
  border-style: solid;
}

input[type="text"] {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border-color: var(--primary);
}
input[type="submit"] {
  padding: 0.5rem 1rem;
  border-color: var(--primary);
  background: var(--primary);
  font-weight: bold;
  color: var(--white);
}
</style>