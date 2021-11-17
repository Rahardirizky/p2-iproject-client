<template>
  <div>
    <b-sidebar
      id="sidebar-backdrop"
      title="Menu"
      backdrop-variant="dark"
      backdrop
      shadow
    >
      <div class="sidebar-container">
        <Button :onClick="redirect('/')" :title="'Orders'"> </Button>
        <div class="sidebar-menu"></div>
        <Button :onClick="redirect('/addOrders')" :title="'Add Order'"> </Button>
        <div class="sidebar-menu"></div>
        <Button :onClick="logout" :title="'logout'"> </Button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  components: {
    Button,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit("SET_TOKEN", null);
      this.$router.push("/login");
    },

    redirect(path) {
      return () => this.$router.push(path)
    }
  },
};
</script>

<style>
.sidebar-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.sidebar-menu {
  display: flex;
  width: 100%;
  margin-bottom: 30px;
}
</style>
