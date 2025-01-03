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
                  v-model="contest.name_contest"
                  label="Название соревнования"
                  variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                  v-model="contest.id_type"
                  :items="selectTypeContest"
                  item-title="description"
                  item-value="id"
                  label="Тип"
                  variant="underlined"
                  :disabled="!isAdd"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                  v-model="contest.id_state_contest"
                  :items="selectStateContest"
                  item-title="description"
                  item-value="id"
                  label="Состояние"
                  variant="underlined"
                  :disabled="!isAdd"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <TextEditor
                  :placeholder="'Описание события'"
                  v-model="contest.description"
                  ref="description"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <DateTimePicker
                  :placeholder="'Время начала'"
                  :min-date=Date()
                  v-model="contest.datetime_start"
              />
            </v-col>
            <v-col cols="12" md="6">
              <DateTimePicker
                  :placeholder="'Время окончания'"
                  :min-date=Date()
                  v-model="contest.datetime_end"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" v-if="isAdd">
              <AgreeButton @click="addContest">Сохранить</AgreeButton>
            </v-col>
            <v-col cols="12" md="4" v-else>
              <AgreeButton @click="updateContest">Обновить</AgreeButton>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TextEditor from "@/components/UI/TextEditor.vue";
import DateTimePicker from "@/components/UI/DateTimePicker.vue";
import AgreeButton from "@/components/UI/AgreeButton.vue";
import ContestService from "@/store/contest.service";

export default {
  name: "AdminContestForm",
  components: {AgreeButton, DateTimePicker, TextEditor},
  data(){
    return{
      idContest: this.$route.params.id_contest,
      isAdd: (this.$route.params.id_contest === undefined),

      error: null,

      contestSchema: {
        description: "",
        name_contest: "",
        id_type: null,
        id_state_contest: null,
        datetime_start: new Date().toISOString(),
        datetime_end: new Date().toISOString()
      },
      contest: {
        description: "",
        name_contest: "",
        id_type: null,
        id_state_contest: null,
        datetime_start: new Date().toISOString(),
        datetime_end: new Date().toISOString(),
      },

      selectTypeContest: [],
      selectStateContest: [],
    }
  },
  methods: {
    loadTypeAndState(){
      ContestService.getTypeContest().then((typeContest) => {
        this.selectTypeContest = typeContest
      })

      ContestService.getStateContest().then((stateContest) => {
        this.selectStateContest = stateContest
      })
    },

    isDateValid(){
      const dateStart = new Date(this.contest.datetime_start)
      const dateEnd = new Date(this.contest.datetime_end)
      return dateEnd > dateStart
    },

    addContest() {
      if (this.isDateValid()) {
        const isAgree = confirm("Поле типа соревнования нельзя будет изменить. Вы согласны с ведеными данными?");
        if (isAgree) {
          this.contest.id_state_contest = parseInt(this.contest.id_state_contest)
          this.contest.id_type = parseInt(this.contest.id_type)

          ContestService.addContest(this.contest).then(() => {
            this.$router.push(`/admin/contest`)
          }).catch((e) => {
            this.error = e.response.message
          })
        } else {
          this.error = "Дата и время не валидны"
        }
      }
    },

    updateContest(){
      if(this.isDateValid()){
        const contestUpdate = {
          "name_contest": this.contest.name_contest,
          "datetime_start": this.contest.datetime_start,
          "datetime_end": this.contest.datetime_end,
          "description": this.contest.description
        }

        ContestService.updateContest(contestUpdate, this.idContest)
            .then(() => {
              this.$router.push(`/admin/contest`)
            })
            .catch(() => {
              this.error =  "Соревнование обнавлено"
            })
      }
    },

    clearForm(){
      this.contest = JSON.parse(JSON.stringify(this.contestSchema))
      this.$refs.description.val(this.contest.description)
    },

    getContest(){
      ContestService.getContest(this.idContest).then((contest) => {
        this.contest = contest
        this.contest.id_type = contest.type.id
        this.contest.id_state_contest = contest.state_contest.id
        this.$refs.description.val(contest.description)
      })
    }
  },
  mounted() {
    if(this.isAdd === false){
      this.getContest()
    }
    this.loadTypeAndState()
  },
}
</script>

<style scoped>
.form{
  margin: 80px 0;
}

</style>