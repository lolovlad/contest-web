<template>
  <div class="btn__menu">
    <AgreeButton v-if="$props.isAdd" @click="$emit('add')">Добавить</AgreeButton>
    <AgreeButton v-else @click="$emit('update')">Сохранить</AgreeButton>
    <AgreeButton @click="$emit('clear')">Очистить</AgreeButton>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  name: "ButtonFormMenu",
  components: {AgreeButton},
  props: {
    isAdd: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.btn__menu{
  display: flex;
  gap: 10px;
  margin-top: 40px;
  width: 50%;
}
</style>