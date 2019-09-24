<template>
  <section class="container">
    <div class="flex">
      <div class="child">
        <form name="login">
          <div v-html="loginMessage"></div>
          <label>Email</label>
          <input type="text" v-model="email" />
          <label>Password</label>
          <input type="password" v-model="password" />
          <br />
          <input class="button" type="button" @click="login()" value="Login" />
        </form>
      </div>
      <div class="child">
        <form name="register">
          <div v-html="registerMessage"></div>
          <label>Name</label>
          <input type="text" v-model="rUsername" />
          <label>Email</label>
          <input type="text" v-model="rEmail" />
          <label>Password</label>
          <input type="password" v-model="rPassword" />
          <br />
          <input class="button" type="button" @click="register()" value="Register" />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      rUsername: "",
      rPassword: "",
      rEmail: "",
      loginMessage: "",
      registerMessage: ""
    };
  },
  components: {},
  methods: {
    async login() {
      const login = { email: this.email, password: this.password };

      const ajax = await axios.post(
        "http://localhost:3000/users/authenticate",
        login
      );
      this.loginMessage = ajax.data.message;

      if (ajax.data.status === "success") {
        this.$store.dispatch("isLoggedIn", [
          true,
          ajax.data.data.token,
          ajax.data.data.user._id
        ]);
      }
    },
    async register() {
      const register = {
        name: this.rUsername,
        password: this.rPassword,
        email: this.rEmail
      };
      const ajax = await axios.post(
        "http://localhost:3000/users/register",
        register
      );
      this.registerMessage = ajax.data.message;
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.button {
  margin-top: 10px;
}

.container {
  border: 2px solid #ddd;
  height: 250px;
  width: 550px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.flex {
  display: flex;
  flex-direction: row;
  height: 250px;
}

.child {
  flex: 1;
  height: 100%;
  border: 1px solid #ddd;
}
</style>
