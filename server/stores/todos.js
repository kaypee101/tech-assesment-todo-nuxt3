import { defineStore } from "pinia";

const useTodoStore = defineStore("todos", {
  state: () => {
    return {
      lastId: 3,
      todos: [
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
      ],
    };
  },
  actions: {
    async nextTodoId() {
      this.lastId++;
    },
    async addTodo(form) {
      this.nextTodoId();
      const createTodo = createTodoData(this.lastId, form);
      this.todos.push(createTodo);
    },
    async doneTodo(todoId) {
      searchAndUpdateStatus(this.todos, todoId);
    },
    async removeTodo(todoId) {
      searchAndDeleteTodo(this.todos, todoId);
    },
    async removeAllDoneTodos() {
      removeAllCompletedTodos(this.todos);
    },
    async removeAllTodos() {
      removeAllTodosCompletely(this.todos);
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

const createTodoData = (nextTodoId, form) => {
  return {
    id: nextTodoId,
    name: form.name,
    status: {
      done: false,
    },
  };
};

function searchAndUpdateStatus(todos, todoId) {
  const taskIndex = todos.findIndex((task) => task.id === todoId);

  if (taskIndex !== -1) {
    // Found the task with the given ID
    todos[taskIndex].status.done = !todos[taskIndex].status.done;
    console.log(`Task with ID ${todoId} was updated successfully.`);
  } else {
    console.log(`Task with ID ${todoId} not found.`);
  }

  return todos;
}

function searchAndDeleteTodo(todos, todoId) {
  const taskIndex = todos.findIndex((task) => task.id === todoId);

  if (taskIndex !== -1) {
    // Found the task with the given ID
    todos.splice(taskIndex, 1);
    console.log(`Task with ID ${todoId} was deleted successfully.`);
  } else {
    console.log(`Task with ID ${todoId} not found.`);
  }

  return todos;
}

function removeAllCompletedTodos(todos) {
  const updatedTodos = todos.filter((task) => !task.status.done);
  const removedCount = todos.length - updatedTodos.length;

  todos.length = 0; // delete all for now todos
  todos.push(...updatedTodos); // push all not finished todos
  console.log(`${removedCount} completed tasks removed successfully.`);

  return todos;
}

function removeAllTodosCompletely(todos) {
  todos.length = 0; // delete all todos
  return todos;
}

export { useTodoStore };
