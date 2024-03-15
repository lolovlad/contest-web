<template>
  <div class="form">
    <div class="row">
    <form class="col s12" @submit.prevent>
      <div class="row">
        <div class="col s12">
          <TextInput
              placeholder="Название соревнования"
              type="text"
              v-model="contest.name_contest"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <ComboBox
              :data="publishedTypeContest"
              v-model="contest.id_type"
              :disabled="!isAdd"
          />
        </div>
        <div class="col s6">
          <ComboBox
              :data="publishedStateContest"
              v-model="contest.id_state_contest"
              :disabled="!isAdd"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <TextEditor
              :placeholder="'Описание события'"
              v-model="contest.description"
              ref="description"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <DateTimePicker
              :placeholder="'Время начала'"
              :min-date=Date()
              v-model="contest.datetime_start"
          />
        </div>
        <div class="col s6">
          <DateTimePicker
              :placeholder="'Время окончания'"
              :min-date=Date()
              v-model="contest.datetime_end"
          />
        </div>
      </div>
      <ButtonFormMenu
          :is-add="isAdd"
          @add="addContest"
          @clear="clearForm"
          @update="updateContest"
      />
    </form>
  </div>
  </div>
</template>

<script>
import ComboBox from "@/components/UI/ComboBox";
import TextEditor from "@/components/UI/TextEditor";
import DateTimePicker from "@/components/UI/DateTimePicker";
import TextInput from "@/components/UI/TextInput";
import ButtonFormMenu from "@/components/UI/ButtonFormMenu";
import axios from "axios";
import M from "materialize-css"
export default {
  name: "AdminContestForm",
  components: {ButtonFormMenu, TextInput, DateTimePicker, TextEditor, ComboBox},
  data(){
    return{
      idContest: this.$route.params.id_contest,
      isAdd: (this.$route.params.id_contest === undefined),

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
    async loadTypeAndState(){
      const responseType = await axios.get(
          `contests/get_type_contest`
      )
      const responseState = await axios.get(
          `contests/get_state_contest`
      )
      this.selectTypeContest = responseType.data
      this.selectStateContest = responseState.data
    },

    isDateValid(){
      const dateStart = new Date(this.contest.datetime_start)
      const dateEnd = new Date(this.contest.datetime_end)
      return dateEnd > dateStart
    },

    async addContest(){
      if(this.isDateValid()){
        const isAgree = confirm("Поле типа соревнования нельзя будет изменить. Вы согласны с ведеными данными?");
        if(isAgree){
          this.contest.id_state_contest = parseInt(this.contest.id_state_contest)
          this.contest.id_type = parseInt(this.contest.id_type)
          console.log(this.contest)
          await axios.post(
              `contests/`,
              this.contest
          ).catch((e)=>{
            M.toast({html: e.response.message})
          }).then((response)=> {
                response.status
                M.toast({html: "Соревнование добавлено"})
                this.$router.push(`/admin/contest`)
              }
          )
        }
      }else {
        M.toast({html: "Время начало > время корнца"})
      }
    },

    async updateContest(){
      if(this.isDateValid()){
        await axios.put(
            `contests/${this.contest.uuid}`,
            {
              "name_contest": this.contest.name_contest,
              "datetime_start": this.contest.datetime_start,
              "datetime_end": this.contest.datetime_end,
              "description": this.contest.description
            }
        ).catch((e)=>{
          M.toast({html: e.response.message})
        }).then((response)=> {
            if(response.status === 200){
                M.toast({html: "Соревнование обнавлено"})
                this.$router.push(`/admin/contest`)
              }
            }
        )
      }
    },

    clearForm(){
      this.contest = JSON.parse(JSON.stringify(this.contestSchema))
      this.$refs.description.val(this.contest.description)
    },

    async getContest(){
      const response = await axios.get(
          `/contests/${this.idContest}`
      )
      this.contest = response.data
      this.contest.id_type = this.contest.type.id
      this.contest.id_state_contest = this.contest.state_contest.id
      this.$refs.description.val(this.contest.description)
      console.log(this.contest)
    }
  },
  mounted() {
    if(this.isAdd === false){
      this.getContest()
    }
    this.loadTypeAndState()
  },
  computed: {
    publishedTypeContest() {
      return this.selectTypeContest.map((data) => {
        return {
          value: data.id,
          text: data.description
        }
      })
    },
    publishedStateContest() {
      return this.selectStateContest.map((data) => {
        return {
          value: data.id,
          text: data.description
        }
      })
    },
  }
}
</script>

<style scoped>
.form{
  margin: 80px 0;
}

</style>