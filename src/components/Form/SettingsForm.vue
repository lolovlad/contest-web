<script>
import AgreeButton from "@/components/UI/AgreeButton.vue";
import TaskService from "@/store/task.service";

export default {
  name: "SettingsForm",
  props:{
    uuidTask: null
  },
  data(){
    return{
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

      error: null,
      snackbar: false,
      message: ""
    }
  },
  methods: {
    memoryOut () {
      this.settings.size_raw = (this.settings.size_raw - 2) || 32
    },
    memoryIn () {
      this.settings.size_raw = (this.settings.size_raw + 2) || 1024
    },
    shipmentsOut () {
      this.settings.number_shipments = (this.settings.number_shipments - 10) || 10
    },
    shipmentsIn () {
      this.settings.number_shipments = (this.settings.number_shipments + 10) || 200
    },

    getSettings(){
      TaskService.getSettings(this.uuidTask)
          .then((settings) => {
            this.settings = settings
          })
    },

    updateSettings(){
      TaskService.updateSettings(this.uuidTask, this.settings)
          .then(() => {
            this.snackbar = true
            this.message = "Настройки обнавлены"
          })
          .catch((e) => {
            this.error = e.response.message
          })
    }
  },
  components: {AgreeButton},
  mounted() {
    this.getSettings()
  }
}
</script>

<template>
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
          <v-col cols="12" md="6">
            <v-select
                v-model="settings.time_work"
                :items="selectTimeWork"
                item-title="text"
                item-value="value"
                label="Время работы"
                variant="underlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <div class="text-caption">Количество доступной памяти</div>
            <v-slider
                v-model="settings.size_raw"
                append-icon="mdi-plus"
                prepend-icon="mdi-minus"
                @click:append="memoryIn"
                @click:prepend="memoryOut"
                thumb-label="always"
                step="2"
                :min="32"
                :max="1024"
            ></v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
                v-model="settings.type_input"
                :items="selectTypeInput"
                item-title="text"
                item-value="value"
                label="Тип входной информации"
                variant="underlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="settings.type_output"
                :items="selectTypeOutput"
                item-title="text"
                item-value="value"
                label="Тип выходной информации"
                variant="underlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <div class="text-caption">Количество доступных попыток</div>
            <v-slider
                v-model="settings.number_shipments"
                append-icon="mdi-plus"
                prepend-icon="mdi-minus"
                @click:append="shipmentsIn"
                @click:prepend="shipmentsOut"
                thumb-label="always"
                step="5"
                :min="10"
                :max="200"
            ></v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <AgreeButton @click="updateSettings">Сохранить</AgreeButton>
          </v-col>
        </v-row>
      </v-form>
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