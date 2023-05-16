<template>
  <div class="list__page">
    <h1 v-for="i in countPage" :key="i" @click="getCurPage(i)">{{i}}</h1>
  </div>
</template>

<script>
export default {
  name: "CastomPagination",
  data(){
    return{
      curPage: 1
    }
  },
  props: {
    countPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    getCurPage(numPage){
      this.$emit("updatePage", numPage)
      this.curPage = numPage
    }
  }
}
</script>

<style scoped>
.list__page{
  display: flex;
  height: 30px;
  gap: 8px;
  justify-items: center;
  justify-content: center;
  align-items: center;
}
.list__page > h1{
  padding: 5px 10px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  background: #0273bb;
  text-align: center;
}
</style>