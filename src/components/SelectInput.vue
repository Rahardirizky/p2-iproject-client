<template>
  <div class="select-input">
    <label class="label-input" :for="name"> {{ label }} </label>
    <b-form-select
      :id="name"
      v-model="selected"
      :options="options"
    ></b-form-select>
  </div>
</template>

<script>
export default {
  props: ["options", "onChange", "name", "label"],
  data() {
    return {
      selected: "",
    };
  },
  watch: {
    selected(val) {
      this.onChange(this.name, val);
    },
  },
};
</script>

<style>
.select-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.label-input {
  font-weight: bold;
}
</style>
