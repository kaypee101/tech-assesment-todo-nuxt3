<template>
  <div>
    <div class="container p-3">
      <div v-for="todo in todos" class="mb-3">
        <input
          type="text"
          :id="'todo-' + todo.id"
          :readonly="true"
          :disabled="true"
          :value="todo.name"
          class="form-control"
        />
      </div>

      <form @submit.prevent="todoSubmit">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Add Todo"
            aria-label="Add Todo"
            aria-describedby="add-todo-button"
            v-model="form.name"
          />
          <button class="btn btn-outline-primary" type="button" id="add-todo-button" @click="todoSubmit">
            <font-awesome-icon :icon="faPlus"> </font-awesome-icon>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTodoStore } from "../../stores/todos";

const store = useTodoStore();
const todos = ref(store.todos);

const sampleTodo = {
  id: 4,
  name: "Sample Todo",
  status: {
    done: false,
  },
};

const form = ref({
  name: "",
});
const todoSubmit = () => {
  if (form.value.name === "") {
    alert("stop");
    return false;
  }
  store.addTodo(form.value);
  form.value.name = "";
};
</script>
<style scoped></style>
