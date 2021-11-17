<template>
  <div style="background-color: #005792; height: 100vh; width: 100vw">
    <div
      style="display: flex; margin-bottom: 30px; justify-content: space-between"
    >
      <b-button style="margin-right: 50px" v-b-toggle.sidebar-backdrop
        ><b-icon icon="arrow-right-square" font-scale="2.0"></b-icon
      ></b-button>
      <h1 style="font-weight: bold; color: white">Laundry`s Work</h1>
      <div style="width: 10px; height: 10px"></div>
    </div>
    <div class="card-container">
      <Card v-for="order in orders" :key="order.id" :order="order"> </Card>
      <CardAdd> </CardAdd>
    </div>
    <div
      style="
        padding-left: 20px;
        display: flex;
        width: 100vw;
        justify-content: center;
      "
    >
      <b-pagination
        v-model="currentPage"
        :total-rows="totalOrders"
        :per-page="limit"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import Card from "../components/Card.vue";
import CardAdd from "../components/CardAdd.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      currentPage: 1,
      limit: 4,
    };
  },
  components: { Card, BIcon, CardAdd },
  beforeMount() {
    const token = localStorage.token;

    if (token) {
      this.$store.commit("SET_TOKEN", token);
      this.$store.dispatch("getOrders", {
        page: this.currentPage,
        limit: this.limit,
      });
    } else {
      this.$router.push("/login");
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    totalOrders() {
      return this.$store.state.totalOrders;
    },
  },
  watch: {
    currentPage(val) {
      this.$store.dispatch("getOrders", {
        page: val,
        limit: this.limit,
      });
    },
  },
};
</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}
</style>
