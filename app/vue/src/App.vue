<template>
  <div id="app">
    <div class="nav">
      <h2 class="logo">TODO APP</h2>
      <a v-if="this.$store.state.loggedIn === true" class="logout" @click="logout()" href="#">Logout</a>
    </div>
    <div v-if="this.$store.state.loggedIn !== true">
      <Login />
    </div>
    <div v-else>
      <Tasks />
    </div>
  </div>
</template>

<script>
import Login from "./components/Login";
import Tasks from "./components/Tasks";

export default {
  name: "app",
  components: {
    Login,
    Tasks
  },
  methods: {
    logout() {
      this.$store.dispatch("isLoggedIn", [false, "", ""]);
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nav {
  height: 70px;
  width: 100%;
  position: absolute;
  top: 0;
  border: 1px solid #ddd;
}

.logout {
  float: right;
  margin-right: 25px;
  margin-top: 30px;
}

.logo {
  float: left;
  margin-left: 25px;
}
</style>
