<template>
  <div>
    <div class="container">
      <section class="display-2 fw-bold text-light text-center mb-3">Vue Todo List</section>
      <section id="action-section" class="fw--12px fw-bold font-monospace w-100 lh-1 py-2 px-2 mb-1 float-end">
        <button type="button" class="btn btn-primary btn-width rounded-pill font-monospace lh-1 py-1 me-1 float-end">
          <span class="me-1">Tasks</span>
          <span class="badge fw-bolder text-dark text-bg-light text-secondary rounded-pill">
            {{ store.getTodoCount }}
          </span>
        </button>
        <button type="button" class="btn btn-primary btn-width rounded-pill font-monospace lh-1 py-1 me-1 float-end">
          <span class="me-1">Tasks Done</span>
          <span class="badge fw-bolder text-dark text-bg-light text-secondary rounded-pill">
            {{ store.getDoneTodoCount }}
          </span>
        </button>
        <button
          type="button"
          class="btn btn-danger btn-width rounded-pill font-monospace lh-1 py-1 me-1 float-end"
          @click="removeAllDoneTodos()"
        >
          <font-awesome-icon :icon="faTrash"> </font-awesome-icon>
          <span class="ms-1">Tasks Done</span>
        </button>
        <button
          type="button"
          class="btn btn-danger btn-width rounded-pill font-monospace lh-1 py-1 me-1 float-end"
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
      <section id="info-section" class="mt-5 d-flex align-items-center justify-content-end ms-auto">
        <div
          class="info-content d-flex justify-content-end ease-transition"
          :class="{ 'w-100 p-2': showInfo, 'w-0': !showInfo }"
        >
          <span class="text-light fw-bold me-2"> This application uses the browser's Local Storage to store data </span>
        </div>
        <button @click="toggleInfo" class="info-right btn btn-outline-dark fw-bolder">
          <font-awesome-icon :icon="faX"> </font-awesome-icon>
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faCheck, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
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
    alert("Please enter the todo task");
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

const showInfo = ref(true);
const toggleInfo = () => {
  showInfo.value = !showInfo.value;
};
</script>
<style scoped lang="scss">
.container {
  max-width: 700px;
}

#action-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: lightgray;
  .btn-width {
    width: 150px;
    margin-bottom: 5px;
    text-align: left;
  }

  @media screen and (min-width: 575px) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: unset;
    .btn-width {
      width: auto;
      margin-bottom: unset;
      text-align: unset;
    }
  }
}

#todo-items-container {
  height: 165px;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.info-content {
  max-width: fit-content;
  background-color: #18396e;
}

.fs-12px {
  font-size: 12px;
}

.w-0 {
  width: 0 !important;
}

.info-right {
  border-radius: 0;
}

.ease-transition {
  transition: 0.5s ease-in-out;
  overflow: hidden;
  white-space: nowrap;
}
</style>
