<template>
  <form @submit.prevent="onSubmit">
    <div class="input-label">
      <label for="principle-input">Add principle</label>
      <template v-if="errors && errors.add">
        <p class="error" v-for="(error, index) in errors.add" :key="index">
          {{ error }}
        </p>
      </template>
      <input
        v-model="body"
        type="text"
        placeholder="New principle..."
        id="principle-input"
      />
    </div>
    <input type="submit" value="Add" :disabled="loader.add" />
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddPrinciple",
  data() {
    return {
      body: "",
    };
  },
  computed: {
    ...mapGetters({ loader: "principle/loader", errors: "principle/errors" }),
  },
  methods: {
    ...mapActions({ addOne: "principle/addOne" }),
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