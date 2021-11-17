<template>
  <div class="text-input">
    <label :for="name" class="label-input">{{ label }}</label>
    <input :type="type" :id="name" v-model="text" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    name: String,
    onChange: {
      type: Function,
      default: () => {}
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      text: "",
    };
  },
  watch: {
    text: function (value) {
      this.onChange(this.name, value);
    },
  },
};
</script>

<style>
.text-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.label-input {
  font-weight: bold;
}
</style>
