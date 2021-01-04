<template>
  <form @submit.prevent="onSubmit">
    <div class="input-label">
      <label for="principle-input-update">Update principle</label>
      <template v-if="errors && errors.update">
        <p class="error" v-for="(error, index) in errors.update" :key="index">
          {{ error }}
        </p>
      </template>
      <input
        v-model="body"
        type="text"
        placeholder="Modified principle..."
        id="principle-input-update"
      />
    </div>
    <input type="submit" value="Update" :disabled="loader.update" />
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UpdatePrinciple",
  props: {
    prevBody: {
      type: String,
      default: "",
    },
    principleUuid: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      body: "",
    };
  },
  computed: {
    ...mapGetters({ loader: "principle/loader", errors: "principle/errors" }),
  },
  mounted() {
    this.body = this.prevBody;
  },
  methods: {
    ...mapActions({ updateOne: "principle/updateOne" }),
    onSubmit() {
      this.updateOne({
        body: this.body,
        uuid: this.principleUuid,
      });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  align-items: flex-end;
  margin-top: 1rem;
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