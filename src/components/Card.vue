<template>
  <div>
    <b-card
      tag="article"
      style="max-width: 200px; margin-right: 20px; height: 250px"
      class="mb-2"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        "
      >
        <div>
          <h4>{{ order.User.email }}</h4>
          <b-card-text> Service Type: {{ order.Service.name }} </b-card-text>
          <b-card-text> Total Weight: {{ order.totalWeight }} </b-card-text>
          <b-card-text> Total Fee: {{ order.totalFee }} </b-card-text>
          <b-card-text v-show="role === 'Customer'">
            status: {{ order.status }}
          </b-card-text>
        </div>

        <div
          style="display: flex; justify-content: space-between"
          v-show="role === 'Admin'"
        >
          <Button
            :onClick="changeStatus"
            :title="status.title"
            :color="status.color"
          >
          </Button>
          <div style="width: 20px"></div>
          <Button
            :onClick="changePayment"
            :title="payment.title"
            :color="payment.color"
          >
          </Button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  props: ["order"],
  data() {
    return {
      statuses: [
        {
          title: "Drop",
          color: "#081f37",
        },
        {
          title: "Wash",
          color: "#5fc9f3",
        },
        {
          title: "Iron",
          color: "#2e79ba",
        },
        {
          title: "Pack",
          color: "#1e549f",
        },
        {
          title: "Finish",
          color: "#315b96",
        },
      ],
      status: null,
      payments: [
        { title: "Unpaid", color: "red" },
        { title: "Paid", color: "green" },
      ],
      payment: null,
    };
  },
  components: {
    Button,
  },
  methods: {
    changeStatus() {
      const index = this.statuses.findIndex(
        (el) => el.title === this.status.title
      );
      if (index < 4) {
        this.status = this.statuses.find((el, i) => i === index + 1);
        this.$store.dispatch("editOrder", {
          id: this.order.id,
          status: this.status.title,
          payment: this.order.payment,
        });
      }
    },

    changePayment() {
      const index = this.payments.findIndex(
        (el) => el.title === this.payment.title
      );
      if (index < 1) {
        this.payment = this.payments.find((el, i) => i === index + 1);
        this.$store.dispatch("editOrder", {
          id: this.order.id,
          status: this.order.status,
          payment: this.payment.title,
        });
      }
    },
  },
  beforeMount() {
    this.status = this.statuses.find((el) => el.title === this.order.status);
    this.payment = this.payments.find((el) => el.title === this.order.payment);
  },
  computed: {
    role() {
      return this.$store.state.user.role;
    },
  },
};
</script>

<style></style>
