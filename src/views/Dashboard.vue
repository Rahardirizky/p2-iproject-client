<template>
  <div style="background-color: #005792; height: 100vh; width: 100vw">
    <div style="width: 100%; height: 100%" v-if="role === 'Admin'">
      <div
        style="
          display: flex;
          margin-bottom: 30px;
          justify-content: space-between;
          align-items: center;
        "
      >
        <b-button style="margin-right: 50px" v-b-toggle.sidebar-backdrop
          ><b-icon icon="arrow-right-square" font-scale="2.0"></b-icon
        ></b-button>
        <h1 style="font-weight: bold; color: white">Laundry`s Work</h1>
        <div>
          <form @submit.prevent="search" style="display: flex">
            <b-form-input
              v-model="email"
              placeholder="Search by Email"
            ></b-form-input>
            <div style="margin-left: 20px">
              <Button :title="'Search'" :onClick="search"> </Button>
            </div>
          </form>
        </div>
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
    <div style="width: 100%; height: 100%" v-else>
      <div
        style="
          display: flex;
          margin-bottom: 30px;
          justify-content: space-between;
          align-items: center;
        "
      >
        <b-button style="margin-right: 50px" v-b-toggle.sidebar-backdrop
          ><b-icon icon="arrow-right-square" font-scale="2.0"></b-icon
        ></b-button>
        <h1 style="font-weight: bold; color: white">Laundry`s Work</h1>
        <div style="width: 100px; height: 5px"></div>
      </div>
      <div class="card-container" style="justify-content: center;">
        <Card v-for="order in orders" :key="order.id" :order="order"> </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import Card from "../components/Card.vue";
import CardAdd from "../components/CardAdd.vue";
import Button from "../components/Button.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      currentPage: 1,
      limit: 4,
      email: "",
    };
  },
  components: { Card, BIcon, CardAdd, Button },
  beforeMount() {
    const token = localStorage.token;
    const user = JSON.parse(localStorage.user);

    if (token) {
      this.$store.commit("SET_TOKEN", token);
      this.$store.commit("SET_USER", user);
      this.$store.dispatch("getOrders", {
        page: this.currentPage,
        limit: this.limit,
        email: this.email,
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
    role() {
      return this.$store.state.user.role;
    },
  },
  watch: {
    currentPage(val) {
      this.$store.dispatch("getOrders", {
        page: val,
        limit: this.limit,
        email: this.email,
      });
    },
  },
  methods: {
    search() {
      this.$store.dispatch("getOrders", {
        page: this.currentPage,
        limit: this.limit,
        email: this.email,
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
