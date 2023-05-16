<template>
  <div class="form">
    <TextInput
        placeholder="Название соревнования"
        type="text"
        v-model="contest.name_contest"
    />
    <ComboBox
        :data="selectTypeContest"
        v-model="contest.type"
        :disabled="!isAdd"
    />
    <ComboBox
        :data="selectStateContest"
        v-model="contest.state_contest"
        :disabled="!isAdd"
    />
    <TextEditor
        :placeholder="'Описание события'"
        v-model="contest.description"
        ref="description"
    />

    <DateTimePicker
        :placeholder="'Время начала'"
        :min-date=Date()
        v-model="contest.datetime_start"
    />
    <DateTimePicker
        :placeholder="'Время окончания'"
        :min-date=Date()
        v-model="contest.datetime_end"
    />
    <ButtonFormMenu
      :is-add="isAdd"
      @add="addContest"
      @clear="clearForm"
    />
  </div>
</template>

<script>
import ComboBox from "@/components/UI/ComboBox";
import TextEditor from "@/components/UI/TextEditor";
import DateTimePicker from "@/components/UI/DateTimePicker";
import TextInput from "@/components/UI/TextInput";
import ButtonFormMenu from "@/components/UI/ButtonFormMenu";
import axios from "axios";
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
        type: 1,
        state_contest: 0,
        datetime_start: Date(),
        datetime_end: Date()
      },
      contest: {
        description: "",
        name_contest: "",
        type: 1,
        state_contest: 0,
        datetime_start: Date(),
        datetime_end: Date(),
      },

      selectTypeContest: [
        {text: "Олимпида", value: 1},
        {text: "Командная олимпиада", value: 2},
        {text: "Хакатон", value: 3}
      ],
      selectStateContest: [
        {text: "Зарегестрированн", value: 0},
        {text: "Подтверждено", value: 1},
        {text: "Проходит", value: 2},
        {text: "Завершенно", value: 3}
      ],
    }
  },
  methods: {
    async addContest(){
      this.contest.state_contest = parseInt(this.contest.state_contest)
      const response = await axios.post(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests`,
          this.contest,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      this.$router.push(`/admin/contest`)
      console.log(this.contest)
    },

    async updateContest(){

    },

    clearForm(){
      this.contest = JSON.parse(JSON.stringify(this.contestSchema))
      this.$refs.description.val(this.contest.description)
    },
    async getContest(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests/${this.idContest}`,
          this.contest,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      this.contest = response.data

      this.$refs.description.val(this.contest.description)
      console.log(this.contest)
    }
  },
  mounted() {
    if(this.isAdd === false){
      this.getContest()
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
.btn__menu{

}
</style>