<template>
  <form @submit.prevent="onSubmit" :class="{ update: formType === 'update' }">
    <div class="input-label">
      <label>{{ formType }} {{ dataType }}</label>
      <template v-if="errors && errors[formType]">
        <p
          class="error"
          v-for="(error, index) in errors[formType]"
          :key="index"
        >
          {{ error }}
        </p>
      </template>
      <textarea v-model="body" :placeholder="placeholder" rows="3"></textarea>
    </div>
    <input type="submit" :value="formType" :disabled="loader[formType]" />
  </form>
</template>

<script>
export default {
  name: "BodyForm",
  props: {
    formType: {
      type: String,
      default: "",
    },
    dataType: {
      type: String,
      default: "",
    },
    prevBody: {
      type: String,
      default: "",
    },
    prevUuid: {
      type: String,
      default: "",
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
    loader: {
      type: Object,
      default: () => ({}),
    },
    submitFunc: {
      type: Function,
      default: () => console.log("submit func"),
    },
  },
  data() {
    return {
      body: "",
      placeholder: "",
    };
  },
  mounted() {
    this.body = this.prevBody;

    if (this.formType === "add") {
      this.placeholder = `New ${this.dataType}`;
    } else {
      this.placeholder = `Modified ${this.dataType}`;
    }
  },
  methods: {
    onSubmit() {
      switch (this.formType) {
        case "add":
          this.submitFunc({ body: this.body, clearForm: this.clearForm });
          break;
        case "update":
          this.submitFunc({ body: this.body, uuid: this.prevUuid });
          break;
        default:
          this.submitFunc({ body: this.body, uuid: this.prevUuid });
      }
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
.update {
  margin-top: 2rem;
}
.input-label {
  flex: 1;
  margin-right: 0.5rem;
}

label {
  text-transform: capitalize;
}

textarea {
  border-width: 2px;
  border-style: solid;
}

textarea {
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
  text-transform: capitalize;
}
</style>