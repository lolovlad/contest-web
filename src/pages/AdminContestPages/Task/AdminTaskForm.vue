<template>
  <div class="form">
    <TextInput
        placeholder="Название соревнования"
        type="text"
        v-model="task.name_task"
    />
    <TextEditor
        :placeholder="'Задание'"
        v-model="task.description"
        ref="description"
    />
    <TextEditor
        :placeholder="'Формат входных данных'"
        v-model="task.description_input"
        ref="descriptionInput"
    />
    <TextEditor
        :placeholder="'Формат выходных данных'"
        v-model="task.description_output"
        ref="descriptionOutput"
    />
    <ComboBox
        :data="selectTypeTask"
        v-model="task.type_task"
    />
    <ButtonFormMenu
        :is-add="isAdd"
        @add="addTask"
        @clear="clearForm"
        @update="updateTask"
    />
  </div>
</template>

<script>
import TextInput from "@/components/UI/TextInput";
import ComboBox from "@/components/UI/ComboBox";
import TextEditor from "@/components/UI/TextEditor";
import ButtonFormMenu from "@/components/UI/ButtonFormMenu";
import axios from "axios";
export default {
  name: "AdminTaskForm",
  components: {ButtonFormMenu, TextEditor, ComboBox, TextInput},
  data(){
    return{
      idContest: parseInt(this.$route.params.id_contest),
      idTask: this.$route.params.id_task,
      isAdd: (this.$route.params.id_task === undefined),
      taskSchema: {
        id_contest:  parseInt(this.$route.params.id_contest),
        name_task: "",
        content: "",
        type_task: 1,
        description: "",
        description_input: "",
        description_output: ""
      },

      task: {
        id_contest:  parseInt(this.$route.params.id_contest),
        name_task: "",
        type_task: 1,
        description: "",
        description_input: "",
        description_output: ""
      },
      selectTypeTask: [
        {text: "A", value: 1},
        {text: "B", value: 2},
        {text: "C", value: 3},
        {text: "D", value: 4},
        {text: "I", value: 5},
        {text: "F", value: 6}
      ],
    }
  },
  methods: {
    async addTask(){
      this.task.type_task = parseInt(this.task.type_task)
      const response = await axios.post(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/`,
          this.task,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      this.$router.push(`/admin/contest/${this.idContest}/task`)
    },
    async updateTask(){
      this.task.type_task = parseInt(this.task.type_task)
      const response = await axios.put(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/`,
          this.task,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      this.$router.push(`/admin/contest/${this.idContest}/task`)
      response.status
    },
    clearForm(){
      this.task = JSON.parse(JSON.stringify(this.taskSchema))
      this.$refs.description.val(this.task.description)
      this.$refs.descriptionInput.val(this.task.description_input)
      this.$refs.descriptionOutput.val(this.task.description_output)
    },

    async getTask(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/get_task/${this.idTask}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      this.task = response.data

      this.$refs.description.val(this.task.description)
      this.$refs.descriptionInput.val(this.task.description_input)
      this.$refs.descriptionOutput.val(this.task.description_output)
      console.log(this.task)
    }
  },
  mounted() {
    if(this.isAdd === false){
      this.getTask()
    }
  }
}
</script>

<style scoped>
.form{
  width: 80%;
  margin: 80px auto;
  display: flex;
  gap: 30px;
  flex-direction: column;
}
</style>