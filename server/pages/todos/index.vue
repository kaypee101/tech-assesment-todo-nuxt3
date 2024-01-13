<template>
  <div>
    <div class="container-sm p-3">
      <section id="action-section" class="font-monospace w-100 lh-1 py-2 px-2 mb-1 float-end">
        <button type="button" class="btn btn-primary rounded-pill font-monospace lh-1 py-1 me-1 float-end">
          <span class="fs-12px fw-bold me-1">Tasks</span>
          <span class="fs-12px badge text-bg-light text-secondary rounded-pill">{{ store.getTodoCount }}</span>
        </button>
        <button type="button" class="btn btn-primary rounded-pill font-monospace lh-1 py-1 me-1 float-end">
          <span class="fs-12px fw-bold me-1">Tasks Done</span>
          <span class="fs-12px badge text-bg-light text-secondary rounded-pill">{{ store.getDoneTodoCount }}</span>
        </button>
        <button type="button" class="btn btn-danger rounded-pill font-monospace lh-1 py-1 me-1 float-end">
          <font-awesome-icon :icon="faTrash"> </font-awesome-icon>
          <span class="fs-12px fw-bold ms-1">Tasks Done</span>
        </button>
        <button type="button" class="btn btn-danger rounded-pill font-monospace lh-1 py-1 me-1 float-end">
          <font-awesome-icon :icon="faTrash"> </font-awesome-icon>
          <span class="fs-12px fw-bold ms-1">Tasks</span>
        </button>
      </section>

      <section id="todo-section" class="border border-light p-1">
        <div id="todo-items-container" class="w-100 p-2" ref="todoItemsContainer">
          <template v-for="todo in todos">
            <div v-if="!todo.status.done" class="input-group mb-3">
              <button
                class="btn btn-success"
                type="button"
                :id="'done-todo-button-' + todo.id"
                @click="todoDone(todo.id)"
              >
                <font-awesome-icon :icon="faCheck"> </font-awesome-icon>
              </button>
              <input
                type="text"
                class="form-control"
                :class="{ 'text-danger': todo.status.done }"
                :id="'todo-' + todo.id"
                :readonly="true"
                :disabled="true"
                :value="todo.name"
                :aria-describedby="'done-todo-button-' + todo.id"
              />
            </div>
          </template>
        </div>
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
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTodoStore } from "../../stores/todos";

const store = useTodoStore();
const todos = ref(store.todos);

const form = ref({
  name: "",
});
const todoItemsContainer: any = ref(null);
const todoSubmit = () => {
  if (form.value.name === "") {
    alert("stop");
    return false;
  }
  store.addTodo(form.value);
  form.value.name = "";
};

watch(
  () => store.getTodoCount,
  () => {
    nextTick(function () {
      var container = todoItemsContainer.value;
      container.scrollTop = container.scrollHeight;
    });
  }
);
const todoDone = (todoId: number) => {
  store.doneTodo(todoId);
};
</script>
<style scoped lang="scss">
#action-section {
  background-color: lightgray;
  display: flex;
  justify-content: flex-end;
}

#todo-items-container {
  height: 180px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.fs-12px {
  font-size: 12px;
}
</style>
