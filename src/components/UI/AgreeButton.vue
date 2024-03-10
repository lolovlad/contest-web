<template>
  <button class="waves-effect waves-light btn red darken-4" style="margin-right: 5px">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AgreeButton"
}
</script>

<style scoped>
.color__btn__agree{
  background: #b50034;
}
</style>