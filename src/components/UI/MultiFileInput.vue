<template>
  <div class="file__div">
    <label>
      <input
          type="file"
          @change="fileSelected"
          ref="inputFile"
          :accept="accept"
          multiple
      >
      <span>Выберите файлы</span>
    </label>
  </div>
  <div class="list__file">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MultiFileInput",
  props: {
    accept: {
      type: String,
      default: "*"
    }
  },
  data(){
    return{
      files: []
    }
  },
  emits: ['update:listFile'],
  methods: {
    fileSelected(event){
      if (!event.target.files.length) return;
      this.files.push(...event.target.files)
      this.$emit('update:listFile', this.files)
    }
  }
}
</script>

<style scoped>
input[type=file]{
  display: none;
}
label{
  width: 100%;
  height: 50px;
  background: #b50034;
  color: white;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list__file{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>