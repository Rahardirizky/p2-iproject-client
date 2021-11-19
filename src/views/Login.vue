<template>
  <div class="form-container">
    <img src="../assets/logoLogin.png" alt="logoregis" class="image-form" />
    <div class="form-input-container">
      <h1>Login</h1>
      <p class="error-message">{{ error }}</p>
      <form @submit.prevent="login">
        <TextInput
          :onChange="onChange"
          :label="'Email'"
          :name="'email'"
          :type="'email'"
        >
        </TextInput>
        <TextInput
          :onChange="onChange"
          :label="'Password'"
          :name="'password'"
          :type="'password'"
        >
        </TextInput>
        <div class="button-container">
          <Button :onClick="login" :title="'Login'"> </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

export default {
  name: "Login",
  components: {
    TextInput,
    Button,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onChange(name, value) {
      this.form[name] = value;
    },
    login() {
      console.log(this.form);
      this.$store.dispatch("login", this.form);
    },
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
  },
  watch: {
    error(val) {
      if (val) {
        setTimeout(() => {
          this.$store.commit("SET_ERROR", null);
        }, 3000);
      }
    },
  },
};
</script>

<style>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-input-container {
  min-width: 30%;
  padding: 20px;
  border: solid 1px black;
  border-radius: 10px;
}

.image-form {
  width: 50%;
}

.button-container {
  display: flex;
  justify-content: space-around;
}

.error-message {
  color: red;
}
</style>
