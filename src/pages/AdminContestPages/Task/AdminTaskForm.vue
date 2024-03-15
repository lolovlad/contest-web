<template>
  <div class="form">
    <div class="row">
      <form class="col s12" @submit.prevent>
        <div class="row">
          <div class="col s12">
            <TextInput
                placeholder="Название соревнования"
                type="text"
                v-model="task.name_task"
            />
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <ComboBox
                :data="publishedTypeTask"
                v-model="task.id_type_task"
                :disabled="!isAdd"
            />
          </div>
          <div class="col s6">
            <ComboBox
                :data="selectComplexity"
                v-model="task.complexity"
            />
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <TextEditor
                :placeholder="'Задание'"
                v-model="task.description"
                ref="description"
            />
          </div>
        </div>
        <div v-show="keysTypeTask[task.id_type_task] === 'programming'">
          <div class="row">
            <div class="col s12">
              <TextEditor
                  :placeholder="'Формат входных данных'"
                  v-model="task.description_input"
                  ref="descriptionInput"
              />
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <TextEditor
                  :placeholder="'Формат выходных данных'"
                  v-model="task.description_output"
                  ref="descriptionOutput"
              />
            </div>
          </div>
        </div>
        <ButtonFormMenu
        :is-add="isAdd"
        @add="addTask"
        @clear="clearForm"
        @update="updateTask"
    />
      </form>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/UI/TextInput";
import ComboBox from "@/components/UI/ComboBox";
import TextEditor from "@/components/UI/TextEditor";
import ButtonFormMenu from "@/components/UI/ButtonFormMenu";
import axios from "axios";
import M from "materialize-css";
export default {
  name: "AdminTaskForm",
  components: {ButtonFormMenu, TextEditor, ComboBox, TextInput},
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
      keysTypeTask: {}

    }
  },
  computed: {
    publishedTypeTask() {
      return this.selectTypeTask.map((data) => {
        return {
          value: data.id,
          text: data.description
        }
      })
    }
  },
  methods: {
    async loadType(){
      const responseType = await axios.get(
          `tasks/type_task/`
      )
      this.selectTypeTask = responseType.data
      for(let i of this.selectTypeTask){
        this.keysTypeTask[i.id] =  i.name
      }
    },

    async addTask(){
      this.task.id_type_task = parseInt(this.task.id_type_task)
      await axios.post(
          `tasks/`,
          this.task
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            if(response.status === 200){
              M.toast({html: "Задание добавлено"})
              this.$router.push(`/admin/task`)
            }
          }
      )
    },

    async updateTask(){
      await axios.put(
          `tasks/${this.idTask}`,
          {
            "name_task": this.task.name_task,
            "complexity": this.task.complexity,
            "description": this.task.description,
            "description_input": this.task.description_input,
            "description_output": this.task.description_output
          },
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            if(response.status === 200){
              M.toast({html: "Задание обновлено"})
              this.$router.push(`/admin/task`)
            }
          }
      )
    },
    clearForm(){
      this.task = JSON.parse(JSON.stringify(this.taskSchema))
      this.$refs.description.val(this.task.description)
      this.$refs.descriptionInput.val(this.task.description_input)
      this.$refs.descriptionOutput.val(this.task.description_output)
    },

    async getTask(){
      const response = await axios.get(
          `tasks/get_task/${this.idTask}`
      )
      this.task = response.data
      this.task.id_type_task = this.task.type_task.id

      this.$refs.description.val(this.task.description)
      this.$refs.descriptionInput.val(this.task.description_input)
      this.$refs.descriptionOutput.val(this.task.description_output)
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
.form{
  margin: 80px 0;
}
</style>