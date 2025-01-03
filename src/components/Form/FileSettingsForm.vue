<script>
import MultiuploadFileDialog from "@/components/MultiuploadFileDialog.vue";
import TaskService from "@/store/task.service";


export default {
  name: "FileSettingsForm",
  components: {MultiuploadFileDialog},
  props: {
    uuidTask: null
  },
  data(){
    return{
      model: null,
      jsonFileData: null,
      listTestFiles: [],
      filesTest: {
        jsonFileData: [],
        listNameFiles: []
      },

      snackbar: false,
      message: ""
    }
  },
  methods: {
    saveFileTest(files){
      for(let file of files){
        console.log(file)
        TaskService.uploadFile(this.uuidTask, file)
            .then(() => {
              this.snackbar = true
              this.message = "Файл сохранен"
              this.getSettings()
            })
            .catch((e) => {
              this.snackbar = true
              this.message = e.response.message
            })
      }
    },
    saveFileJson(){
      console.log(this.filesTest)
      TaskService.uploadJsonFile(this.uuidTask, this.filesTest.jsonFileData)
          .then(() => {
            this.message = "Файл сохранен"
            this.snackbar = true
            this.getSettings()
          })
          .catch((e) => {
            this.message = e.response.message
            this.snackbar = true
          })
    },
    getSettings(){
      TaskService.getSettings(this.uuidTask)
          .then((settings) => {
            this.filesTest.jsonFileData = []
            this.filesTest.listNameFiles = []
            for(let fileName of settings.files){
              const fileExt = fileName.split('.').pop();
              if(fileExt === "json"){
                this.filesTest.jsonFileData = [new File(["file"], fileName)]
              }else{
                this.filesTest.listNameFiles.push({name: fileName})
              }
            }

          })
    },
    deleteFile(idFile){
      const fileNameDel = this.filesTest.listNameFiles[idFile].name
      TaskService.deleteFile(this.uuidTask, fileNameDel)
          .then(() => {
            this.snackbar = true
            this.message = "Файл Удален"
            this.getSettings()
          })
          .catch((e) => {
            this.snackbar = true
            this.message = e.response.message
          })
    }
  },
  mounted() {
    this.getSettings()
  }
}
</script>

<template>
 <v-row>
   <v-col cols="12" md="12">
     <v-card>
       <v-card-title>
         <p>Главный файл настроек</p>
       </v-card-title>
       <v-card-text>
         <v-row>
           <v-col cols="12" md="12">
             <v-file-input
                 v-model="filesTest.jsonFileData"
                 label="Файл настроек"
                 accept="json"
                 prepend-icon="mdi-border-color"
             />
           </v-col>
         </v-row>
       </v-card-text>


       <v-card-actions>
         <v-btn
             color="teal-accent-4"
             text="Сохранить"
             variant="text"
             @click="saveFileJson"
         ></v-btn>
       </v-card-actions>
     </v-card>
   </v-col>
 </v-row>
  <v-row>
    <v-col cols="12" md="12">
      <v-card>
        <v-card-title>
          <p>Тесты</p>
        </v-card-title>
        <v-card-text>
            <v-row>
              <v-col
                  v-for="(item, i) in filesTest.listNameFiles"
                  :key="i"
                  cols="12"
                  md="4"
              >
                <v-card
                    class="mx-auto"
                    prepend-icon="mdi-file"
                    target="_blank"
                    :title="item.name"
                    @click:prepend="deleteFile(i)"
                >
                  <template v-slot:append>
                    <v-icon icon="mdi-delete" @click="deleteFile(i)"></v-icon>
                  </template>
                </v-card>
              </v-col>
            </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <MultiuploadFileDialog @upload="saveFileTest"/>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-snackbar
      :timeout="4000"
      v-model="snackbar"
  >
    {{message}}
  </v-snackbar>

</template>

<style scoped>

</style>