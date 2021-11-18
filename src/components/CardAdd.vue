<template>
  <div>
    <b-card
      tag="article"
      style="min-width: 200px; margin-right: 20px; min-height: 250px"
      class="mb-2"
    >
      <div
        v-if="!showForm"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 210px;
          flex-direction: column;
        "
        @click.prevent="showingForm"
      >
        <b-icon icon="plus-circle" font-scale="2.0"></b-icon>
        <br />
        <b-card-text>Add Order </b-card-text>
      </div>
      <div style="display: flex; height: 100%" v-else>
        <form @submit.prevent="addOrder">
          <h4>Form Order</h4>
          <TextInput
            :onChange="onChange"
            :label="'Email'"
            :name="'email'"
            :type="'email'"
          >
          </TextInput>
          <SelectInput
            :name="'ServiceId'"
            :label="'Service'"
            :options="services"
            :onChange="onChange"
          >
          </SelectInput>
          <TextInput
            :onChange="onChange"
            :label="'Total Weight'"
            :name="'totalWeight'"
            :type="'number'"
          >
          </TextInput>
          <SelectInput
            :name="'payment'"
            :label="'Payment'"
            :options="paymentOptions"
            :onChange="onChange"
          >
          </SelectInput>
          <b-card-text style="margin-bottom: 20px;"> Total Fee: Rp {{ form.totalFee }} </b-card-text>
          <div style="margin-bottom: 20px;">
            <Button :title="'Check Total Fee'" :onClick="getTotalFee"> </Button>
          </div>
          <Button v-show="form.totalFee" :title="'Add Order'" :onClick="addOrder"> </Button>
        </form>
      </div>
    </b-card>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import Button from "./Button.vue";
import TextInput from "./TextInput.vue";
import SelectInput from "./SelectInput.vue";

export default {
  data() {
    return {
      showForm: false,
      form: {
        email: "",
        ServiceId: "",
        totalWeight: "",
        totalFee: "",
        payment: "",
      },
      paymentOptions: [
        { value: "Unpaid", text: "Unpaid" },
        { value: "Paid", text: "Paid" },
      ],
    };
  },
  components: {
    BIcon,
    Button,
    TextInput,
    SelectInput,
  },
  methods: {
    showingForm() {
      this.showForm = true;
    },
    onChange(name, value) {
      this.form[name] = value;
    },
    async getTotalFee() {
      if (this.form.ServiceId && this.form.totalWeight) {
        const totalFee = await this.$store.dispatch("getTotalfee", {
          ServiceId: this.form.ServiceId,
          totalWeight: this.form.totalWeight,
        })
        this.form.totalFee = totalFee
      }
    },
    async addOrder() {
      await this.$store.dispatch('addOrder', this.form)
      this.showForm = false
    }
  },
  beforeMount() {
    this.$store.dispatch("getServices");
  },
  computed: {
    services() {
      return this.$store.state.services;
    },
  },
};
</script>

<style></style>
