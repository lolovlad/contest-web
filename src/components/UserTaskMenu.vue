<template>
  <v-list
      class="mx-auto"
      flat
      lines="two"
  >
    <v-list-item v-for="task in tasks"
                 :key="task.uuid"
                 @click="$emit('getTask', task.uuid)"
                 link

    >
      <v-list-item-title>
        <p class="text-left text-h5">{{typeTaskFilter(task.complexity)}} {{rename_task(task.name_task)}}</p>
      </v-list-item-title>
      <template v-slot:prepend>
        <v-chip
            size="large"
            class="mr-4"
            :color="colorBlock(task.last_answer)"
        >
          <p class="text-h5">{{task.last_answer}}</p>
        </v-chip>
      </template>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "UserTaskMenu",
  props: {
    tasks: null,
  },
  data(){
    return{
      target: null
    }
  },
  methods: {
    rename_task(val) {
      if (val.length <= 13) {
        return val
      } else {
        return `${val.slice(0, 10)}...`
      }
    },
    typeTaskFilter(val) {
      const info = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "I",
        6: "F",
      }
      return info[val]
    },
    colorBlock(score){
      if(score === "-")
        return "primary"
      if(!isNaN(score))
        return "green"
      return "red"
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>