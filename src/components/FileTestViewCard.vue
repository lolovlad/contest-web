<template>
  <ul class="collection">
    <li class="collection-item" v-for="(obj, index) in listNameFiles" :key="index">
      <div>
        {{obj.name}}
        <a @click="$emit('deleteFile', index)" class="secondary-content"><i class="material-icons">close</i></a>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "FileTestViewCard",
  components: {},
  props:{
    listNameFiles: Array
  }
}
</script>

<style scoped>
</style>