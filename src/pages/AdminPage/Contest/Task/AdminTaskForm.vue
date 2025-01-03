<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-alert
            density="compact"
            :text="error"
            title="Ошибка"
            type="warning"
            v-if="error !== null"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-form @submit.prevent>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                  type="text"
                  v-model="task.name_task"
                  label="Название соревнования"
                  variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                  v-model="task.id_type_task"
                  :items="selectTypeTask"
                  item-title="description"
                  item-value="id"
                  label="Тип"
                  variant="underlined"
                  :disabled="!isAdd"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                  v-model="task.complexity"
                  :items="selectComplexity"
                  item-title="text"
                  item-value="value"
                  label="Сложность"
                  variant="underlined"
                  :disabled="!isAdd"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <TextEditor
                  :placeholder="'Задание'"
                  v-model="task.description"
                  ref="description"
              />
            </v-col>
          </v-row>
          <div v-show="keysTypeTask[task.id_type_task] === 'programming'">
            <v-row>
              <v-col cols="12" md="12">
                <TextEditor
                    :placeholder="'Формат входных данных'"
                    v-model="task.description_input"
                    ref="descriptionInput"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <TextEditor
                    :placeholder="'Формат выходных данных'"
                    v-model="task.description_output"
                    ref="descriptionOutput"
                />
              </v-col>
            </v-row>
          </div>
          <v-row>
            <v-col cols="12" md="4" v-if="isAdd">
              <AgreeButton @click="addTask">Сохранить</AgreeButton>
            </v-col>
            <v-col cols="12" md="4" v-else>
              <AgreeButton @click="updateTask">Обновить</AgreeButton>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TextEditor from "@/components/UI/TextEditor.vue";
import AgreeButton from "@/components/UI/AgreeButton.vue";
import TaskService from "@/store/task.service";
export default {
  name: "AdminTaskForm",
  components: {AgreeButton, TextEditor},
  data(){
    return{
      idTask: this.$route.params.id_task,
      isAdd: (this.$route.params.id_task === undefined),
      taskSchema: {
        name_task: "",
        content: "",
        complexity: 1,
        id_type_task: null,
        description: "",
        description_input: "",
        description_output: ""
      },

      task: {
        name_task: "",
        complexity: 1,
        id_type_task: null,
        description: "",
        description_input: "",
        description_output: ""
      },
      selectComplexity: [
        {text: "A", value: 1},
        {text: "B", value: 2},
        {text: "C", value: 3},
        {text: "D", value: 4},
        {text: "I", value: 5},
        {text: "F", value: 6}
      ],
      selectTypeTask: [],
      keysTypeTask: {},
      error: null
    }
  },
  methods: {
    loadType(){
      TaskService.getTypeTask()
          .then((types) => {
            this.selectTypeTask = types
            for(let i of this.selectTypeTask){
              this.keysTypeTask[i.id] =  i.name
            }
          })
          .catch((e) => {
            console.log(e)
          })
    },
    addTask(){
      this.task.id_type_task = parseInt(this.task.id_type_task)
      TaskService.addTask(this.task)
          .then(()=>{
            this.$router.push(`/admin/task`)
          })
          .catch((e) => {
            this.error = e.response.message
          })
    },

    async updateTask(){
      const updateTask = {
        "name_task": this.task.name_task,
        "complexity": this.task.complexity,
        "description": this.task.description,
        "description_input": this.task.description_input,
        "description_output": this.task.description_output
      }

      TaskService.updateTask(this.idTask, updateTask)
          .then(() => {
            this.$router.push(`/admin/task`)
          })
          .catch((e) => {
            this.error = e.response.message
          })
    },
    getTask(){
      TaskService.getTask(this.idTask)
          .then((task) => {
            this.task = task
            this.task.id_type_task = task.type_task.id
            this.$refs.description.val(task.description)
            this.$refs.descriptionInput.val(task.description_input)
            this.$refs.descriptionOutput.val(task.description_output)
          })
          .catch((e) => {
            console.log(e)
          })
    }
  },
  mounted() {
    this.loadType()
    if(this.isAdd === false){
      this.getTask()
    }
  }
}
</script>

<style scoped>
</style>