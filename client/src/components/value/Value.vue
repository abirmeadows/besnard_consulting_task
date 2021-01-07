<template>
  <div class="value">
    <div class="wrapper">
      <p>{{ value.body }}</p>
      <div class="btns">
        <button v-if="edit" class="edit" @click="toggleEdit(false)">
          Cancel
        </button>
        <button v-else class="edit" @click="toggleEdit(true)">Edit</button>
        <DeleteBtn :loader="loader" :uuid="value.uuid" :del-func="destroyOne" />
      </div>
    </div>
    <BodyForm
      v-if="edit"
      :form-type="'update'"
      :data-type="'value'"
      :prev-body="value.body"
      :prev-uuid="value.uuid"
      :loader="loader"
      :errors="errors"
      :submit-func="updateOne"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BodyForm from "@/components/utilities/BodyForm";
import DeleteBtn from "@/components/utilities/DeleteBtn";

export default {
  name: "Value",
  components: {
    BodyForm,
    DeleteBtn,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      edit: false,
    };
  },
  computed: {
    ...mapGetters({ loader: "value/loader", errors: "value/errors" }),
  },
  methods: {
    ...mapActions({
      updateOne: "value/updateOne",
      destroyOne: "value/destroyOne",
      clearErrors: "value/clearErrors",
    }),
    toggleEdit(value) {
      this.edit = value;
      this.clearErrors();
    },
  },
};
</script>

<style scoped>
.value {
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