<template>
  <ul id="slide-out" class="sidenav" ref="targetSidenav">
    <slot></slot>
  </ul>
</template>

<script>
import M from "materialize-css"
export default {
  name: "SelectToolTip",
  data(){
    return{
      isActive: false,
      targetTooltip: null
    }
  },
  methods: {
    open(){
      this.isActive = true
      this.targetTooltip.open()
    },
    close(){
      this.$emit("close")
      this.targetTooltip.close()
    }
  },
  mounted() {
    const elem = this.$refs.targetSidenav
    this.targetTooltip = M.Sidenav.init(elem);
  }
}
</script>

<style scoped>
</style>