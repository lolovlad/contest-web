<template>
  <div class="task" v-if="isLoadMain">
    <header-task>{{typeTaskFilter(targetTask.type_task)}} {{targetTask.name_task}}</header-task>
    <castom-table :headers="headersTableSettings" :contents="contentsTableSettings" class="task__table"/>
    <description-task v-html="targetTask.description"/>
    <header-task>Формат ввода</header-task>
    <description-task v-html="targetTask.description_input"/>
    <header-task>Формат вывода</header-task>
    <description-task v-html="targetTask.description_output"/>
    <test-view
        class="test__view"
        v-for="(item, index) in targetTask.view_test"
        :key="index"
        :numberTest="index + 1"
        :fillingTypeVariable="item.filling_type_variable"
        :answer="item.answer"
    />
    <castom-table v-if="isLoadMain" class="task__table" :headers="headersTableTests" :contents="contentsTableTests"/>
    <div class="form__send_answer">
      <form-send-answer @sendAnswer="sendAnswer" v-if="!$store.state.isCloseContest" ref="sendForm"/>
      <h3>Осталось попыток {{numberShipments}}</h3>
    </div>
    <table-answer :answers="listAnswer" :idTask="targetTask.id" :idContest="idContest" class="task__table"/>
  </div>
  <div class="task__list" v-if="isLoadMenu">
    <button-task
        v-for="task in listTask"
        :key="task.id"
        :score="task.last_answer"
        @click="getTask(task.id)"
    >
      {{task.type_task}}  {{task.name_task}}
    </button-task>
  </div>
</template>

<script>
import ButtonTask from "@/components/UI/ButtonTask";
import axios from "axios";
import CastomTable from "@/components/UI/CastomTable";
import HeaderTask from "@/components/UI/HeaderTask";
import DescriptionTask from "@/components/UI/DescriptionTask";
import TestView from "@/components/UI/TestView";
import FormSendAnswer from "@/components/FormSendAnswer";
import TableAnswer from "@/components/TableAnswer";

export default {
  components: {TableAnswer, FormSendAnswer, TestView, DescriptionTask, HeaderTask, CastomTable, ButtonTask},
  data(){
    return{
      idContest: this.$route.params.id_contest,
      listTask: null,
      isLoadMenu: false,
      isLoadMain: false,
      targetTask: null,

      isLoadCompilations: false,

      listAnswer: null,

      websocketServer: null,

      numberShipments: 0

    }
  },
  computed: {
    headersTableSettings(){
      return ["Ограничение времени", "Ограничение памяти", "Ввод", "Вывод"]
    },
    contentsTableSettings(){
      return [{
        "timeWork": this.targetTask.time_work + " сек",
        "sizeRaw":  this.targetTask.size_raw + " Mb",
        "typeInput":  this.typeInputFilter(this.targetTask.type_input),
        "typeOutput":  this.typeOutputFilter(this.targetTask.type_output),
      }]
    },
    headersTableTests(){
      return ["Условия", "Необходимые тесты"]
    },
    contentsTableTests(){
      return this.targetTask.view_settings.map((val)=>{
        return {
          limitationVariable: val.limitation_variable,
          necessaryTest: val.necessary_test
        }
      })
    },

  },
  methods: {
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
    typeInputFilter(val) {
      const info = {
        1: "стандартный ввод",
        2: "файл input.txt"
      }
      return info[val]
    },
    typeOutputFilter(val) {
      const info = {
        1: "стандартный вывод",
        2: "файл output.txt"
      }
      return info[val]
    },


    async getListTask() {
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/user_contest_view/get_list_task/${this.idContest}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      );
      this.listTask = response.data

      if(this.isLoadMenu === false){
        this.getTask(this.listTask[0].id)
      }

      this.isLoadMenu = true

    },
    async getTask(idTask) {
      this.isLoadMain = false
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/user_contest_view/get_task/${idTask}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      );
      this.targetTask = response.data
      this.numberShipments = this.targetTask.number_shipments
      this.isLoadMain = true
      await this.getListAnswer()
    },
    async getListAnswer(){
      console.log(this.targetTask)
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/user_contest_view/get_list_answers/${this.idContest}/${this.targetTask.id}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      );
      this.listAnswer = response.data
      this.numberShipments = this.targetTask.number_shipments - this.listAnswer.length

    },

    initWebSocket() {
      this.websocketServer = new WebSocket(`ws://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/user_contest_view/view_contest?token=${this.$store.state.token}`)
      this.websocketServer.addEventListener("message", (event)=> {
          const obj = JSON.parse(JSON.parse(event.data));
          if(obj.message === "post_answer") {
            this.getListAnswer()
          }else if(obj.message === "get_list_task"){
            this.getListTask()
          }
      })

      this.websocketServer.onclose = function (event) {
        if (event.wasClean) {
          alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          alert('[close] Соединение прервано');
        }
      };

      this.websocketServer.onerror = function (error) {
        alert(error);
      };

    },

    sendAnswer(selectLeng, data) {
      const message = {
        message: "post_answer",
        body_message: {
          id_task: this.targetTask.id,
          token: this.$store.state.token,
          id_contest: this.idContest,
          id_compiler: selectLeng,
          program_file: data
        }
      }

      this.websocketServer.send(JSON.stringify(message))
      this.$refs.sendForm.clearForm()
    },


  },
  mounted() {
    this.getListTask()
    this.initWebSocket()
  },
  name: "ContestTaskPage"
}
</script>

<style scoped>
.task{
  margin-left: 50px;
  padding: 40px 0;
}
.task__list{
  position: fixed;
  top: 30px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.task__table{
  margin-bottom: 50px;
  text-align: center;
}
.test__view{
  margin: 50px 0;
}

.form__send_answer{
  width: 50%;
  margin: 40px 0;

}
.form__send_answer > h3{
  margin: 8px 0;
}
</style>