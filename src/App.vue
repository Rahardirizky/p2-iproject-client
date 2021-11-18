<template>
  <div id="app">
    <Sidebar> </Sidebar>
    <div class="login-spinner" v-show="loading">
      <b-spinner variant="primary" type="grow"></b-spinner>
      <img
        src="./assets/logoLoading.png"
        alt="loadinglogo"
        style="width: 400px; height: 400px"
      />
    </div>
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.login-spinner {
  z-index: 100;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.213);
}
</style>
