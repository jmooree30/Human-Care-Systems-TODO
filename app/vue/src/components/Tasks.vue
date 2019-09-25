<template>
  <section class="container">
    <div v-html="responseMessage"></div>
    <input type="text" placeholder="What is the task?" v-model="task" />
    <input type="date" v-model="date" />
    <button @click="createTask()">Add Task</button>
    <h2 class="name">{{this.$store.state.name}}'s Tasks</h2>
    <ul>
      <li v-for="task in tasks">
        <div>
          <button @click="remove(task._id)" class="remove">X</button>
          <strong>Task:</strong> {{ task.task }}
        </div>
        <div class="due">
          <strong>Due:</strong>
          {{ task.due }}
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      task: "",
      date: "",
      responseMessage: "",
      tasks: []
    };
  },
  components: {},
  created: function() {
    this.getTasks();
  },
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
        "/todos/create",
        task,
        config
      );

      this.responseMessage = ajax.data.status;
      this.getTasks();
    },
    async getTasks() {
      const user = {
        user: this.$store.state.id
      };
      const config = {
        headers: { "x-access-token": this.$store.state.token }
      };
      const ajax = await axios.post(
        "/todos/list",
        user,
        config
      );
      if (ajax.data.data) this.tasks = ajax.data.data;
    },
    async remove(id) {
      const taskId = {
        id: id
      };
      const config = {
        headers: { "x-access-token": this.$store.state.token }
      };

      const ajax = await axios.post(
        "/todos/delete",
        taskId,
        config
      );

      this.responseMessage = ajax.data.status;
      this.getTasks();
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

ul {
  position: relative;
}

li {
  list-style-type: none;
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
  text-align: left;
  overflow: scroll;
  background: white;
}

.due {
  margin-bottom: 20px;
}

.remove {
  float: right;
  height: 20px;
  width: 20px;
  font-size: 12px;
  display: inline;
  margin-right: 10px;
  border: 1px solid red;
  color: white;
  background: red;
  padding: 1px;
  font-weight: bold;
}

.name {
  text-align: center;
}
</style>