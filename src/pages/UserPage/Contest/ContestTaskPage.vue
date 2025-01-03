<template>
  <v-container v-if="isLoadMain" class="pl-15">
    <v-row>
      <v-col cols="12" md="6">
        <HeaderTask>{{typeTaskFilter(targetTask.complexity)}} {{targetTask.name_task}}</HeaderTask>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <CastomTable :headers="headersTableSettings" :contents="contentsTableSettings" v-if="targetTask.type_task.name === 'programming'"/>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="12" md="6">
        <p v-html="targetTask.description" class="text-left text-h6"/>
      </v-col>
    </v-row>
    <v-row class="mt-10" v-if="targetTask.type_task.name === 'programming'">
      <v-col cols="12" md="6">
        <HeaderTask>Формат ввода</HeaderTask>
        <p v-html="targetTask.description" class="text-left text-h6"/>
      </v-col>
    </v-row>
    <v-row class="mt-10" v-if="targetTask.type_task.name === 'programming'">
      <v-col cols="12" md="6">
        <HeaderTask>Формат вывода</HeaderTask>
        <p v-html="targetTask.description" class="text-left text-h6"/>
      </v-col>
    </v-row>
    <v-row class="mt-10" v-if="targetTask.type_task.name === 'programming'">
      <v-col cols="12" md="6">
        <TestView
            v-for="(item, index) in targetTask.view_test"
            :key="index"
            :numberTest="index + 1"
            :fillingTypeVariable="item.filling_type_variable"
            :answer="item.answer"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <CastomTable v-if="isLoadMain && targetTask.type_task.name === 'programming'"
                     :headers="headersTableTests"
                     :contents="contentsTableTests"/>
      </v-col>
    </v-row>
    <div v-if="$store.getters['contestUser/isCloseContest'] === false">
      <v-row v-if="targetTask.type_task.name === 'programming'" class="mt-10">
        <v-col cols="12">
          <FormSendAnswer
              :uuid-contest="idContest"
              :uuid-task="targetTask.uuid"
              @sendAnswer="sendAnswer"
              v-if="!$store.state.isCloseContest"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" md="6">
          <FormSendEditAnswer
              :uuid-contest="idContest"
              :uuid-task="targetTask.uuid"
              @sendAnswer="sendAnswerEdit"
              v-if="!$store.state.isCloseContest"
              ref="sendFormEdit"
          />
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <v-col cols="12" md="6">
          <p class="text-left text-h5">Осталось попыток {{numberShipments}}</p>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row class="mt-3">
        <v-col cols="12" md="6">
          <p class="text-left text-h4">Контест закончен</p>
        </v-col>
      </v-row>
    </div>
    <v-row class="mt-10">
      <v-col cols="12" md="9">
        <TableAnswer
            :answers="listAnswer"
            :idTask="targetTask.uuid"
            :idContest="idContest"
            :typeTask="targetTask.type_task.name"
            @updateShipments="updateShipments"
            ref="tableAnswer"
        />
      </v-col>
    </v-row>
    <UserTaskMenu
        class="task__list"
        :tasks="listTask"
        @getTask="getTask"/>
  </v-container>
</template>

<script>
import CastomTable from "@/components/UI/CastomTable.vue";
import HeaderTask from "@/components/UI/HeaderTask.vue";
import TestView from "@/components/UI/TestView.vue";
import FormSendAnswer from "@/components/Form/FormSendAnswer.vue";
import TableAnswer from "@/components/Table/TableAnswer.vue";
import FormSendEditAnswer from "@/components/Form/FormSendEditAnswer.vue";
import {auth as $store} from "@/store/auth.model";
import UserTaskMenu from "@/components/UserTaskMenu.vue";
import ContestService from "@/store/contest.service";

export default {
  components: {UserTaskMenu, HeaderTask, CastomTable, TestView, FormSendAnswer, FormSendEditAnswer, TableAnswer},
  data(){
    return{
      idContest: this.$route.params.id_contest,
      listTask: null,
      isLoadMenu: false,
      isLoadMain: false,
      targetTask: null,

      isLoadCompilations: false,

      websocketServer: null,
      numberShipments: 0,
      polling: null,


      connection_ready: false
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

    updateMenuTask(){
      ContestService.getListTasks(this.idContest)
          .then((listTask) => {
            this.listTask = listTask
          })
    },
    getListTask() {
      ContestService.getListTasks(this.idContest)
          .then((listTask) => {
            this.listTask = listTask
            if(this.isLoadMenu === false){
              this.getTask(this.listTask[0].uuid)
            }

            this.isLoadMenu = true
          })
    },
    getTask(uuid) {
      this.isLoadMain = false
      if(this.targetTask !== null){
        this.sendSocket({
          type_message: "unsubscribe_answer",
          body_message: {
            id_task: this.targetTask.uuid,
            id_contest: this.idContest
          }
        })
      }
      ContestService.getTaskUser(uuid)
          .then(task => {
            this.targetTask = task
            this.numberShipments = task.number_shipments
            this.isLoadMain = true

            this.$nextTick(() => {
              this.sendSocket({
                type_message: "subscribe_answer",
                body_message: {
                  id_task: uuid,
                  id_contest: this.idContest
                }
              })
              this.getListAnswer()
            })
          })
    },
    getListAnswer(){
      this.$refs.tableAnswer.loadItem()
    },
    updateShipments(countAnswer){
      this.numberShipments = this.targetTask.number_shipments - countAnswer
    },


    sendAnswer() {
      this.getListAnswer()
    },

    decodeMessage(event){
      let received = JSON.parse(event.data)
      if(received.type_message === "update_answer"){
        if(this.targetTask.uuid === received.id_task && this.idContest === received.id_contest){
          this.getListAnswer()
          this.updateMenuTask()
        }
      }
    },

    async sendAnswerEdit() {
      this.getListAnswer()
    },

    sendSocket(obj){
      this.websocket.send(JSON.stringify(obj))
    }

  },
  mounted() {
    var sockets_bay_url = `ws://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/websocket/view_contest?token=${$store.state.token}`;
    this.websocket = new WebSocket(sockets_bay_url);
    //
    this.websocket.onopen = function(event){
      this.connection_ready = true
      console.log(event)
    }
    this.websocket.onmessage = this.decodeMessage;
    this.websocket.onerror = function(event){
      this.connection_ready = false;
      console.log(event, 'error')
    }
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
}
</style>