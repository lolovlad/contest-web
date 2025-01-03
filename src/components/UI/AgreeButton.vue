<template>
  <v-btn variant="outlined" color="indigo-darken-3">
    <slot>

    </slot>
  </v-btn>
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