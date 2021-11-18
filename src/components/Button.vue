<template>
  <div
    @click.prevent="onClick"
    class="btn"
    :style="`background-color: ${color ? color : '#1a65d5'};`"
  >
    <span class="btn-text">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  props: ["onClick", "title", "color"],
};
</script>

<style>
.btn {
  padding: 20px;
  border-radius: 10px;
  background-color: #1a65d5;
}

.btn:hover {
  cursor: pointer;
}

.btn-text {
  color: #ffffff;
  font-weight: bold;
}
</style>
