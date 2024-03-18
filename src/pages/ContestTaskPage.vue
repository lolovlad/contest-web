<template>
  <div class="container" v-if="isLoadMain">
    <HeaderTask>{{typeTaskFilter(targetTask.complexity)}} {{targetTask.name_task}}</HeaderTask>

    <CastomTable :headers="headersTableSettings" :contents="contentsTableSettings" v-if="targetTask.type_task === 'programming'"/>
    <div class="row">
      <DescriptionTask v-html="targetTask.description"/>
    </div>
    <div v-if="targetTask.type_task.name === 'programming'">
      <HeaderTask>Формат ввода</HeaderTask>
      <div class="row">
        <description-task v-html="targetTask.description_input"/>
      </div>
      <HeaderTask>Формат вывода</HeaderTask>
      <div class="row">
        <DescriptionTask v-html="targetTask.description_output"/>
      </div>
    </div>
    <div class="row" style="margin-top: 110px;" v-if="targetTask.type_task.name === 'programming'">
      <div class="col s12">
        <TestView
            v-for="(item, index) in targetTask.view_test"
            :key="index"
            :numberTest="index + 1"
            :fillingTypeVariable="item.filling_type_variable"
            :answer="item.answer"
        />
      </div>
    </div>
    <CastomTable v-if="isLoadMain && targetTask.type_task.name === 'programming'"
                 :headers="headersTableTests"
                 :contents="contentsTableTests"/>

    <div v-if="$store.getters['contestUser/isCloseContest'] === false">
      <div class="row" style="margin-top: 110px;" v-if="targetTask.type_task.name === 'programming'">
        <div class="col s12">
          <FormSendAnswer
              @sendAnswer="sendAnswer"
              v-if="!$store.state.isCloseContest" ref="sendForm"/>
          <h5>Осталось попыток {{numberShipments}}</h5>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col s12">
          <FormSendEditAnswer @sendAnswer="sendAnswerEdit" v-if="!$store.state.isCloseContest" ref="sendFormEdit"/>
          <h5>Осталось попыток {{numberShipments}}</h5>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col s6">
          <h4>Контест закончен</h4>
        </div>
      </div>
    </div>

    <TableAnswer :answers="listAnswer" :idTask="targetTask.uuid" :idContest="idContest" :typeTask="targetTask.type_task.name"/>
  </div>
  <div v-if="isLoadMenu" class="task__list">
    <ButtonTask
        v-for="task in listTask"
        :key="task.uuid"
        :score="task.last_answer"
        @click="getTask(task.uuid)"
    >
      {{task.complexity}}  {{task.name_task}}
    </ButtonTask>
  </div>
  <UserTaskMenu/>
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
import UserTaskMenu from "@/components/UserTaskMenu";
import M from "materialize-css";
import FormSendEditAnswer from "@/components/FormSendEditAnswer";

export default {
  components: {
    FormSendEditAnswer,
    UserTaskMenu, TableAnswer, FormSendAnswer, TestView, DescriptionTask, HeaderTask, CastomTable, ButtonTask},
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

      numberShipments: 0,

      polling: null

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
          `user_contest_view/get_list_task/${this.idContest}`
      );
      this.listTask = response.data
      if(this.isLoadMenu === false){
        this.getTask(this.listTask[0].uuid)
      }

      this.isLoadMenu = true

    },

    async onliLoadListTask(){
      const response = await axios.get(
          `user_contest_view/get_list_task/${this.idContest}`
      );
      this.listTask = response.data
    },

    async getTask(uuid) {
      this.isLoadMain = false
      const response = await axios.get(
          `user_contest_view/get_task/${uuid}`
      );
      this.targetTask = response.data
      this.numberShipments = this.targetTask.number_shipments
      this.isLoadMain = true

      await this.getListAnswer()


      this.polling = setInterval(() => {
        this.onliLoadListTask()
        this.getListAnswer()
      }, 10000)
    },


    async getListAnswer(){
      const response = await axios.get(
          `user_contest_view/get_list_answers/${this.idContest}/${this.targetTask.uuid}`,
      );
      this.listAnswer = response.data
      this.numberShipments = this.targetTask.number_shipments - this.listAnswer.length

    },


    async sendAnswer(selectLeng, data) {

      const formData = new FormData();
      formData.append("file", data)
      formData.append("id_compilation", parseInt(selectLeng))
      await axios.post(
          `user_contest_view/send_answer/${this.idContest}/${this.targetTask.uuid}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).catch((e)=>{
        e.code
        M.toast({html: "Ошибка в отправке ответа"})
      }).then((response)=> {
            response.status
            M.toast({html: "Ответ отправлен"})
            this.getListAnswer()
            this.$refs.sendForm.clearForm()
          }
      )
    },

    async sendAnswerEdit(ansText){
      const formData = new FormData();
      formData.append("text", ansText)
      await axios.post(
          `user_contest_view/send_answer_text/${this.idContest}/${this.targetTask.uuid}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).catch((e)=>{
        e.code
        M.toast({html: "Ошибка в отправке ответа"})
      }).then((response)=> {
            response.status
            M.toast({html: "Ответ отправлен"})
            this.getListAnswer()
            this.$refs.sendFormEdit.clearForm()
          }
      )
    },

  },
  mounted() {
    this.getListTask()
  },
  beforeUnmount () {
    clearInterval(this.polling)
  },
  name: "ContestTaskPage"
}
</script>

<style scoped>
.task__list{
  position: fixed;
  top: 30px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
</style>