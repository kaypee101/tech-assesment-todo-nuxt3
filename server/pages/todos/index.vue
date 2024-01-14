<template>
  <div>
    <div class="container-sm p-3">
      <section id="action-section" class="fw--12px fw-bold font-monospace w-100 lh-1 py-2 px-2 mb-1 float-end">
        <button type="button" class="btn btn-primary rounded-pill font-monospace lh-1 py-1 me-1 float-end">
          <span class="me-1">Tasks</span>
          <span class="badge fw-bolder text-dark text-bg-light text-secondary rounded-pill">
            {{ store.getTodoCount }}
          </span>
        </button>
        <button type="button" class="btn btn-primary rounded-pill font-monospace lh-1 py-1 me-1 float-end">
          <span class="me-1">Tasks Done</span>
          <span class="badge fw-bolder text-dark text-bg-light text-secondary rounded-pill">
            {{ store.getDoneTodoCount }}
          </span>
        </button>
        <button
          type="button"
          class="btn btn-danger rounded-pill font-monospace lh-1 py-1 me-1 float-end"
          @click="removeAllDoneTodos()"
        >
          <font-awesome-icon :icon="faTrash"> </font-awesome-icon>
          <span class="ms-1">Tasks Done</span>
        </button>
        <button
          type="button"
          class="btn btn-danger rounded-pill font-monospace lh-1 py-1 me-1 float-end"
          @click="removeAllTodos()"
        >
          <font-awesome-icon :icon="faTrash"> </font-awesome-icon>
          <span class="ms-1">Tasks</span>
        </button>
      </section>

      <section id="todo-section" class="border border-light p-1">
        <div id="todo-items-container" class="w-100 p-2" ref="todoItemsContainer">
          <div
            v-for="(todo, index) in todos"
            class="input-group"
            :class="{
              'mb-3': index !== todos.length - 1,
              animate__animated: todo.is_deleted,
              animate__backOutRight: todo.is_deleted,
            }"
          >
            <button
              v-if="todo.status.done"
              class="btn btn-dark"
              type="button"
              :id="'done-todo-button-' + todo.id"
              @click="doneTodo(todo.id)"
            >
              <font-awesome-icon :icon="faCheck"> </font-awesome-icon>
            </button>
            <button
              v-else
              class="btn btn-success"
              type="button"
              :id="'done-todo-button-' + todo.id"
              @click="doneTodo(todo.id)"
            >
              <font-awesome-icon :icon="faCheck"> </font-awesome-icon>
            </button>

            <input
              type="text"
              class="form-control"
              :class="{
                'text-muted': todo.status.done,
                'text-decoration-line-through': todo.status.done,
                'fw-bold': !todo.status.done,
              }"
              :id="'todo-' + todo.id"
              :readonly="true"
              :disabled="true"
              :value="todo.name"
              :aria-describedby="'done-todo-button-' + todo.id"
            />
            <button
              class="btn btn-danger"
              type="button"
              :id="'done-todo-button-' + todo.id"
              @click="removeTodo(todo.id)"
            >
              <font-awesome-icon :icon="faTrash"> </font-awesome-icon>
            </button>
          </div>
        </div>
        <div class="w-100 p-2">
          <form @submit.prevent="todoSubmit">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                :placeholder="'Add Todo'"
                :aria-label="'Add Todo'"
                :aria-describedby="'add-todo-button'"
                v-model="form.name"
              />
              <button class="btn btn-primary" type="button" :id="'add-todo-button'" @click="todoSubmit">
                <font-awesome-icon :icon="faPlus"> </font-awesome-icon>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTodoStore } from "../../stores/todos";

const store = useTodoStore();
const todos = ref(store.todos);
onMounted(() => {
  store.init();
});
const form = ref({
  name: "",
});
const todoItemsContainer: any = ref(null);
let shouldExecuteNextTick: boolean = false;
watch(
  () => store.getTodoCount,
  () => {
    if (shouldExecuteNextTick) {
      nextTick(function () {
        var container = todoItemsContainer.value;
        container.scrollTop = container.scrollHeight;
      });
    }
  }
);

const todoSubmit = () => {
  shouldExecuteNextTick = true;
  if (form.value.name === "") {
    alert("stop");
    return false;
  }
  store.addTodo(form.value);
  form.value.name = "";
};
const doneTodo = (todoId: number) => {
  shouldExecuteNextTick = false;
  store.doneTodo(todoId);
};
const removeTodo = (todoId: number) => {
  shouldExecuteNextTick = false;
  store.removeTodo(todoId);
};
const removeAllDoneTodos = () => {
  shouldExecuteNextTick = false;
  store.removeAllDoneTodos();
};
const removeAllTodos = () => {
  shouldExecuteNextTick = false;
  store.removeAllTodos();
};
</script>
<style scoped lang="scss">
#action-section {
  background-color: lightgray;
  display: flex;
  justify-content: flex-end;
}

#todo-items-container {
  height: 165px;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.fs-12px {
  font-size: 12px;
}
</style>
