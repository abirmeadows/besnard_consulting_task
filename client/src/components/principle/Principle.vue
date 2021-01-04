<template>
  <div class="principle">
    <div class="wrapper">
      <p>{{ principle.body }}</p>
      <div class="btns">
        <button v-if="edit" class="edit" @click="toggleEdit(false)">
          Cancel
        </button>
        <button v-else class="edit" @click="toggleEdit(true)">Edit</button>
        <button class="delete" @click="onDelete" :disabled="loader.destroy">
          Delete
        </button>
      </div>
    </div>
    <UpdatePrinciple
      v-if="edit"
      :prevBody="principle.body"
      :principleUuid="principle.uuid"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UpdatePrinciple from "@/components/principle/UpdatePrinciple";
export default {
  name: "Principle",
  components: {
    UpdatePrinciple,
  },
  props: {
    principle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      edit: false,
    };
  },
  computed: { ...mapGetters({ loader: "principle/loader" }) },
  methods: {
    ...mapActions({
      destroyOne: "principle/destroyOne",
      clearErrors: "principle/clearErrors",
    }),
    onDelete() {
      this.destroyOne({ uuid: this.principle.uuid });
    },
    toggleEdit(value) {
      this.edit = value;
      this.clearErrors();
    },
  },
};
</script>

<style scoped>
.principle {
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.4);
  margin-top: 1.5rem;
  padding: 1.5rem;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.btns {
  display: flex;
}
.delete {
  padding: 0.5rem 1rem;
  background: var(--danger);
  color: var(--white);
  font-weight: bold;
  margin-left: 1rem;
}
.edit {
  padding: 0.5rem 1rem;
  background: none;
  color: var(--primary);
  font-weight: bold;
  margin-left: 1rem;
}
</style>