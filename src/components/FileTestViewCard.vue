<template>
  <div class="file__card">
    <h2>{{name}}</h2>
    <div class="btn__del">
      <agree-button @click="$emit('deleteFile')">x</agree-button>
    </div>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  name: "FileTestViewCard",
  components: {AgreeButton},
  props:{
    name: String
  }
}
</script>

<style scoped>
.file__card{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0273bb;
  color: white;
  padding: 10px;
}
</style>