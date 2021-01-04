<template>
  <form @submit.prevent="onSubmit">
    <div class="input-label">
      <label for="value-input-update">Update value</label>
      <template v-if="errors && errors.update">
        <p class="error" v-for="(error, index) in errors.update" :key="index">
          {{ error }}
        </p>
      </template>
      <input
        v-model="body"
        type="text"
        placeholder="Modified value..."
        id="value-input-update"
      />
    </div>
    <input type="submit" value="Update" :disabled="loader.update" />
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UpdateValue",
  props: {
    prevBody: {
      type: String,
      default: "",
    },
    valueUuid: {
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
    ...mapGetters({ loader: "value/loader", errors: "value/errors" }),
  },
  mounted() {
    this.body = this.prevBody;
  },
  methods: {
    ...mapActions({ updateOne: "value/updateOne" }),
    onSubmit() {
      this.updateOne({
        body: this.body,
        uuid: this.valueUuid,
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