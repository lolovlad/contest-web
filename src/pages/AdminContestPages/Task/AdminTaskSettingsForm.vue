<template>
  <div class="form">
    <div class="row">
      <form class="col s12" @submit.prevent>
        <div class="row">
          <div class="col s6">
            <ComboBox
                :data="selectTimeWork"
                v-model="settings.time_work"
            />
          </div>
          <div class="col s6">
            <RangeInput
                v-model="settings.size_raw"
                :min="32"
                :max="1024"
                :step="2"
                :placeholder="'Количество доступной памяти:'"
                :metric="'Mb'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <ComboBox
                :data="selectTypeInput"
                v-model="settings.type_input"
            />
          </div>
          <div class="col s6">
            <ComboBox
                :data="selectTypeOutput"
                v-model="settings.type_output"
            />
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <RangeInput
                v-model="settings.number_shipments"
                :min="10"
                :max="200"
                :step="5"
                :placeholder="'Количество доступных попыток:'"
            />
          </div>
        </div>
        <ButtonFormMenu :is-add="false"
                        @update="updateSettings"
                        @clear="clearForm"
        />
      </form>
    </div>
    <div class="row">
      <div class="col s12">
        <agree-button @click="openModalWindow">Открыть файловую систему</agree-button>
      </div>
    </div>
  </div>
  <CastomModelWindow ref="modelWindow">
    <div class="row">
      <div class="col s6">
        <FileInput :accept="'.json'" v-model:data="jsonFileData" ref="jsonFile"/>
      </div>
      <div class="col s6">
        <MultiFileInput v-model:listFile="listTestFiles">
          <FileTestViewCard :listNameFiles="filesTest.listNameFiles" @deleteFile="deleteFile"/>
        </MultiFileInput>
      </div>
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
import M from "materialize-css";
export default {
  name: "AdminTaskSettingsForm",
  components: {
    FileTestViewCard,
    MultiFileInput, FileInput, CastomModelWindow, AgreeButton, ButtonFormMenu, RangeInput, ComboBox},
  data(){
    return{
      idTask: this.$route.params.id_task,
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
          `tasks/get_settings/${this.idTask}`,
      )
      this.settings = response.data
      this.openAddFileWindow(this.settings.files)
    },

    async updateSettings(){
      await axios.put(
          `tasks/settings/${this.idTask}`,
          this.settings
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            response.status
            M.toast({html: "Настройки обнавлены"})
            this.$router.push(`/admin/task`)
          }
      )
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
      await axios.delete(
          `tasks/delete_file/${this.idTask}/${fileNameDel}/`,
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            response.status
            M.toast({html: "Файл Удален"})
            this.getSettings()
          }
      )
    }
  },
  watch: {
    async jsonFileData(){
      const formData = new FormData();
      formData.append("file", this.$refs.jsonFile.bytesData)
      await axios.post(
          `tasks/upload_json_files/${this.idTask}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            response.status
            M.toast({html: "Файл сохранен"})
            this.getSettings()
          }
      )
    },
    async listTestFiles(val){
      for(let file of val){
        const formData = new FormData();
        formData.append("file", file)
        await axios.post(
            `tasks/upload_file/${this.idTask}/`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }
        ).catch((e)=>{
          M.toast({html: e.response.message})
        }).then((response)=> {
              response.status
              M.toast({html: "Файл сохранен"})
              this.getSettings()
            }
        )
      }
    }
  },
  mounted() {
    this.getSettings()
  }
}
</script>

<style scoped>
.form{
  margin: 80px 0;
}

</style>