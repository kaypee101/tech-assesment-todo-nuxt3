import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { TodosInterface } from "~/interfaces/TodosInterface";

interface TodoStoreState {
  lastId: number;
  todos: TodosInterface[];
}

const useTodoStore = defineStore("todos", {
  state: (): TodoStoreState => {
    return {
      lastId: 0,
      todos: [],
    };
  },
  actions: {
    async init() {
      getTodosFromLocalStorage(this.todos);
      this.lastId = this.todos.length;
    },
    async nextTodoId() {
      this.lastId++;
    },
    async addTodo(form: any) {
      this.nextTodoId();
      const createTodo = createTodoData(this.lastId, form);
      this.todos.push(createTodo);
      setTodosToLocalStorage(this.todos);
    },
    async doneTodo(todoId: number) {
      searchAndUpdateStatus(this.todos, todoId);
      setTodosToLocalStorage(this.todos);
    },
    async removeTodo(todoId: number) {
      searchAndDeleteTodo(this.todos, todoId);
      setTodosToLocalStorage(this.todos);
    },
    async removeAllDoneTodos() {
      removeAllCompletedTodos(this.todos);
      setTodosToLocalStorage(this.todos);
    },
    async removeAllTodos() {
      removeAllTodosCompletely(this.todos);
      setTodosToLocalStorage(this.todos);
    },
  },
  getters: {
    getTodos: (data) => {
      return data.todos;
    },
    getTodoCount: (data) => {
      return data.todos.length;
    },
    getDoneTodoCount: (data) => {
      return data.todos.filter((todo) => todo.status.done).length;
    },
  },
});

const createTodoData = (nextTodoId: number, form: any) => {
  return {
    id: nextTodoId,
    name: form.name,
    status: {
      done: false,
    },
  };
};

function searchAndUpdateStatus(todos: TodosInterface[], todoId: number) {
  const todoIndex = todos.findIndex((todo: TodosInterface) => todo.id === todoId);

  if (todoIndex !== -1) {
    // Found the todo with the given ID
    todos[todoIndex].status.done = !todos[todoIndex].status.done;
    console.log(`Todo with ID ${todoId} was updated successfully.`);
  } else {
    console.log(`Todo with ID ${todoId} not found.`);
  }

  return todos;
}

function searchAndDeleteTodo(todos: TodosInterface[], todoId: number) {
  const todoIndex = todos.findIndex((todo: TodosInterface) => todo.id === todoId);

  if (todoIndex !== -1) {
    // Found the todo with the given ID
    todos.splice(todoIndex, 1);
    console.log(`Todo with ID ${todoId} was deleted successfully.`);
  } else {
    console.log(`Todo with ID ${todoId} not found.`);
  }

  return todos;
}

function removeAllCompletedTodos(todos: TodosInterface[]) {
  const updatedTodos = todos.filter((todo: TodosInterface) => !todo.status.done);
  const removedCount = todos.length - updatedTodos.length;

  todos.length = 0; // delete all for now todos
  todos.push(...updatedTodos); // push all not finished todos
  console.log(`${removedCount} completed todos removed successfully.`);

  return todos;
}

function removeAllTodosCompletely(todos: TodosInterface[]) {
  todos.length = 0; // delete all todos
  return todos;
}

function getTodosFromLocalStorage(todos: TodosInterface[]) {
  todos.length = 0; // delete all for now todos
  todos.push(...useLocalStorage("todos", getDefaultTodos()).value);
  return todos;
}

function setTodosToLocalStorage(todos: TodosInterface[]) {
  if (typeof Storage !== "undefined") {
    const todosJSON = JSON.stringify(todos);
    localStorage.setItem("todos", todosJSON);
    console.log("Todos saved to local storage.");
  } else {
    console.error("Local storage is not supported in this browser.");
  }
}

function getDefaultTodos() {
  return [
    {
      id: 1,
      name: "Do Something Awesome",
      status: {
        done: false,
      },
    },
    {
      id: 2,
      name: "Buy Toilet Paper",
      status: {
        done: false,
      },
    },
    {
      id: 3,
      name: "Learn Nuxt 3",
      status: {
        done: false,
      },
    },
  ];
}

export { useTodoStore };
