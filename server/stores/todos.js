import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", {
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
    async nextId() {
      this.lastId++;
    },
    async addTodo(form) {
      this.nextId();
      const nextId = this.lastId;
      const createTodo = {
        id: nextId,
        name: form.name,
        status: {
          done: false,
        },
      };
      this.todos.push(createTodo);
    },
    async doneTodo(id) {},
    async removeTodo(id) {},
    async removeAllTodo() {},
  },
  getters: {
    getTodos: (data) => {
      return data.todos;
    },
  },
});
