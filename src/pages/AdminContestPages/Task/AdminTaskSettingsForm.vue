<template>
  <div class="form">
    <div class="block__input">
      <ComboBox
          :data="selectTimeWork"
          v-model="settings.time_work"
      />
      <RangeInput
        v-model="settings.size_raw"
        :min="32"
        :max="1024"
        :step="2"
        :placeholder="'Количество доступной памяти:'"
        :metric="'Mb'"
      />
    </div>
    <div class="block__input">
      <ComboBox
          :data="selectTypeInput"
          v-model="settings.type_input"
      />
      <ComboBox
          :data="selectTypeOutput"
          v-model="settings.type_output"
      />
    </div>
    <RangeInput
        v-model="settings.number_shipments"
        :min="10"
        :max="200"
        :step="5"
        :placeholder="'Количество доступных попыток:'"
    />
    <ButtonFormMenu :is-add="false"
                    @update="updateSettings"
                    @clear="clearForm"
    />
  </div>
  <div class="file__edit">
    <agree-button @click="openModalWindow">Открыть файловую систему</agree-button>
  </div>
  <CastomModelWindow ref="modelWindow">
    <div class="form__file">
      <file-input :accept="'.json'" v-model:data="jsonFileData" ref="jsonFile"/>
      <multi-file-input v-model:listFile="listTestFiles">
        <FileTestViewCard v-for="(obj, index) in filesTest.listNameFiles" :key="index" :name="obj.name" @deleteFile="deleteFile(index)"/>
      </multi-file-input>

    </div>
  </CastomModelWindow>
</template>

<script>
import ComboBox from "@/components/UI/ComboBox";
import RangeInput from "@/components/UI/RangeInput";
import ButtonFormMenu from "@/components/UI/ButtonFormMenu";
import AgreeButton from "@/components/UI/AgreeButton";
import axios from "axios";
import CastomModelWindow from "@/components/UI/CastomModelWindow";
import FileInput from "@/components/UI/FileInput";
import MultiFileInput from "@/components/UI/MultiFileInput";
import FileTestViewCard from "@/components/FileTestViewCard";
export default {
  name: "AdminTaskSettingsForm",
  components: {
    FileTestViewCard,
    MultiFileInput, FileInput, CastomModelWindow, AgreeButton, ButtonFormMenu, RangeInput, ComboBox},
  data(){
    return{
      idTask: this.$route.params.id_task,
      idContest: this.$route.params.id_contest,
      selectTimeWork: [
        {text: "1 секунда", value: 1},
        {text: "2 секунда", value: 2},
        {text: "3 секунда", value: 3},
        {text: "4 секунда", value: 4},
        {text: "5 секунда", value: 5}
      ],
      selectTypeInput: [
        {text: "стандартный ввод", value: 1},
        {text: "файл input.txt", value: 2}
      ],
      selectTypeOutput: [
        {text: "стандартный вывод", value: 1},
        {text: "файл output.txt", value: 2}
      ],

      settingsSchema: {
        time_work: 1,
        size_raw: 32,
        type_input: 1,
        type_output: 1,
        number_shipments: 100
      },

      settings: {
        time_work: 1,
        size_raw: 32,
        type_input: 1,
        type_output: 1,
        number_shipments: 100
      },
      jsonFileData: "",
      listTestFiles: [],
      filesTest: {
        jsonFileData: "",
        listNameFiles: []
      },
    }
  },
  methods: {
    openModalWindow(){
      this.$refs.modelWindow.open()
      if(this.filesTest.jsonFileData !== "")
        this.$refs.jsonFile.nameFile = this.filesTest.jsonFileData
    },
    clearForm(){
      this.settings = JSON.parse(JSON.stringify(this.settingsSchema))
    },
    async getSettings(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/get_settings/${this.idTask}`,
      )
      this.settings = response.data
      this.openAddFileWindow(this.settings.files)
    },
    async updateSettings(){
      const response = await axios.put(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/settings/`,
          this.settings,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      this.$router.push(`/admin/contest/${this.idContest}/task`)
    },
    openAddFileWindow(files){
      console.log(files)
      this.filesTest.jsonFileData = ""
      this.filesTest.listNameFiles = []
      for(let fileName of files){
        const fileExt = fileName.split('.').pop();
        if(fileExt === "json"){
          this.filesTest.jsonFileData = fileName
        }else{
          this.filesTest.listNameFiles.push({name: fileName})
        }
      }
    },
    async deleteFile(index){
      const fileNameDel = this.filesTest.listNameFiles[index].name
      const response = await axios.delete(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/delete_file/${this.idTask}/${fileNameDel}/`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      await this.getSettings()
    }
  },
  watch: {
    async jsonFileData(){
      const formData = new FormData();
      formData.append("file", this.$refs.jsonFile.bytesData)
      const response = await axios.post(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/upload_json_files/${this.idTask}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      await this.getSettings()
    },
    async listTestFiles(val){
      for(let file of val){
        const formData = new FormData();
        formData.append("file", file)
        const response = await axios.post(
            `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/upload_file/${this.idTask}/`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${this.$store.state.token}`
              }
            }
        )
        response.status
      }
      await this.getSettings()
    }
  },
  mounted() {
    this.getSettings()
  }
}
</script>

<style scoped>
.form{
  width: 60%;
  margin: 80px auto;
  display: flex;
  gap: 30px;
  flex-direction: column;
}
.block__input{
  display: flex;
  width: 100%;
  gap: 30px;
  align-content: space-between;
  justify-content: space-between;
}
.file__edit{
  width: 60%;
  margin: 80px auto;
}
.form__file{
  width: 60%;
  margin: 80px auto;
  display: flex;
  gap: 30px;
  flex-direction: column;
}
</style>