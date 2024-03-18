<template>
  <slot></slot>
</template>

<script>
import M from "materialize-css"
export default {
  name: "UserTaskMenu",
  data(){
    return{
      target: null
    }
  },
  mounted() {
    const elem = this.$refs.userTaskMenu;
    this.target = M.Dropdown.init(elem, {
      hover: true,
      alignment: "top"
    });
  }
}
</script>

<style scoped>

</style>