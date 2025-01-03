<script>
import AgreeButton from "@/components/UI/AgreeButton.vue";

export default {
  name: "MultiuploadFileDialog",
  components: {AgreeButton},
  props: {
    title: null
  },
  data(){
    return{
      files: null,
      dialog: false
    }
  },
  methods: {
    saveFile(){
      this.$emit("upload", this.files)
      this.$nextTick(() => {
        this.dialog = false
        this.files = null
      })
    }
  }
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
  >
    <template v-slot:activator="{ props: activatorProps }">
      <AgreeButton
          v-bind="activatorProps"
      >Загрузить файлы</AgreeButton>
    </template>

    <v-card>
      <v-toolbar>
        <v-btn
            icon="mdi-close"
            @click="dialog = false"
        ></v-btn>

        <v-toolbar-title>{{title}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
              text="Сохранить"
              variant="text"
              @click="saveFile"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
          <v-row>
            <v-col cols="12" sm="12">
              <v-file-upload
                  v-model="files"
                  clearable
                  multiple
                  show-size
                  density="comfortable"
                  title="Перетащите сюда или выберите файлы"
                  browse-text="Локальная файловая система"
                  icon="mdi-upload"
                  divider-text="Или"
              >
              </v-file-upload>
            </v-col>
          </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>