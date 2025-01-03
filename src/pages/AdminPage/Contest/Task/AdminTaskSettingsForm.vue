<template>
  <v-container>
    <v-tabs
        v-model="tab"
        align-tabs="center"
        color="deep-purple-accent-4">
      <v-tab value="settings">Настройки среды</v-tab>
      <v-tab value="fileModel">Файловая система</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab" class="overflow-visible">
      <v-tabs-window-item value="settings">
        <v-container>
          <SettingsForm :uuidTask="idTask"/>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="fileModel">
        <v-container>
          <FileSettingsForm :uuidTask="idTask"/>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
  <!--<CastomModelWindow ref="modelWindow">
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
  </CastomModelWindow>-->
</template>

<script>
import SettingsForm from "@/components/Form/SettingsForm.vue";
import FileSettingsForm from "@/components/Form/FileSettingsForm.vue";
export default {
  name: "AdminTaskSettingsForm",
  components: {FileSettingsForm, SettingsForm},
  data(){
    return{
      idTask: this.$route.params.id_task,
      tab: null,
    }
  },
}
</script>

<style scoped>
</style>