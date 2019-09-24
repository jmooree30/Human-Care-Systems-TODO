<template>
  <section class="container">
    <div v-html="responseMessage"></div>
    <input type="text" placeholder="What is the task?" v-model="task" />
    <input type="date" v-model="date" />
    <button @click="createTask()">Add Task</button>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      task: "",
      date: "",
      responseMessage: ""
    };
  },
  components: {},
  methods: {
    async createTask() {
      const task = {
        task: this.task,
        due: this.date,
        user: this.$store.state.id
      };
      const config = {
        headers: { "x-access-token": this.$store.state.token }
      };

      const ajax = await axios.post(
        "http://localhost:3000/todos/create",
        task,
        config
      );

      this.responseMessage = ajax.data.status;
    }
  }
};
</script>

<style scoped>
input,
button {
  display: block;
  margin-top: 10px;
}

.container {
  border: 2px solid #ddd;
  height: 550px;
  width: 550px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>