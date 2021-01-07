<template>
  <div class="container">
    <h1 class="head">Agile Software Development</h1>
    <div class="row">
      <div class="column">
        <h2 class="subhead">Values</h2>
        <Values />
      </div>
      <div class="column">
        <h2 class="subhead">Principles</h2>
        <Principles />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Values from "@/components/value/Values";
import Principles from "@/components/principle/Principles";
export default {
  name: "App",
  components: {
    Values,
    Principles,
  },
  mounted() {
    this.fetchValues();
    this.fetchPrinciples();
  },
  methods: {
    ...mapActions({
      fetchValues: "value/fetchAll",
      fetchPrinciples: "principle/fetchAll",
    }),
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

:root {
  --primary: #1e90ff;
  --danger: #f72c6f;
  --white: #ffffff;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
.container {
  max-width: 1200px;
  margin: auto;
  padding: 5rem 2rem;
}
.row {
  display: flex;
}
.column {
  flex: 1;
  margin: 0 1rem;
}
.head {
  text-align: center;
  margin-bottom: 4rem;
}
.subhead {
  text-align: center;
  margin-bottom: 2rem;
}
input,
textarea,
button {
  font-size: 1rem;
  display: block;
  border-radius: 3px;
  border: none;
}
button {
  cursor: pointer;
}
input:focus,
button:focus {
  outline: none;
}
input:disabled,
button:disabled {
  opacity: 0.5;
}
input[type="text"],
textarea {
  width: 100%;
}
textarea {
  resize: none;
}
input[type="submit"] {
  cursor: pointer;
}

.error {
  font-weight: bold;
  color: var(--danger);
  margin: 0.5rem 0;
}
</style>
