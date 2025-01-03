<template>
  <v-container v-if="isLoad">
    <v-row align="center" justify="center" class="pa-3">
      <v-col cols="12" md="12">
        <p class="text-center text-h3">
          Это главная страница контеста
          {{contest.name_contest}}
        </p>
        <p class="text-center text-h3" v-if="$store.state.isCloseContest">
          контест закончен
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <p v-html="contest.description"/>
      </v-col>
    </v-row >
    <v-row>
      <v-col cols="12" md="9" offset="1">
        <p class="text-h4">Ошибки, которые могу быть при тестировании программы.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="9" offset="1">
        <p class="text-left text-lg-h5"><span>Wrong answer (WA)</span> - Неверный ответ. Результат работы программы не совпадает с
          ответом жюри. Неверный формат вывода или алгоритмическая ошибка в программе.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="9" offset="1">
        <p class="text-left text-lg-h5"><span>Time limit exceeded (TL)</span> - Превышен указанный в задаче лимит времени. Программа
          выполняется дольше установленного времени. Неэффективное решение или
          алгоритмическая ошибка в программе.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="9" offset="1">
        <p class="text-left text-lg-h5"><span>Presentation Error (PE)</span> - Отсутствие выходного файла OUTPUT.TXT. Файл не создан,
          неверное имя файла или сбой программы до открытия выходного файла.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="9" offset="1">
        <p class="text-left text-lg-h5"><span>Compilation error (CE)</span> - Ошибка компиляции. В результате компиляции не создан
          исполняемый файл. Синтаксическая ошибка в программе или неверно указано
          расширение файла. Возможно, что при реализации на языке Java был использован класс,
          отличный от Main.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="9" offset="1">
        <p class="text-left text-lg-h5"><span>Memory limit exceeded (ML)</span> - Превышен указанный в задаче лимит памяти. Программа
          использует больше установленного размера памяти. Неэффективный алгоритм, либо
          нерациональное использование памяти</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="9" offset="1">
        <p class="text-left text-lg-h5"><span>Runtime error (RE)</span> - Ошибка исполнения. Программа завершила работу с ненулевым
          кодом возврата. В этом случае результат работы не проверяется. Возможно, в программе
          произошло обращение к несуществующему элементу массива, деление на ноль и т.д.
          Возможно, программа на C++ не завершается оператором «return 0» или по иной причине
          вернула ненулевой код возврата.</p>
      </v-col>
    </v-row>
  </v-container>
  <castom-loader v-else/>
</template>

<script>
import axios from "axios";
import CastomLoader from "@/components/UI/CastomLoader.vue";

export default {
  components: {CastomLoader,},
  data(){
    return{
      idContest: this.$route.params.id_contest,
      contest: null,
      isLoad: false
    }
  },
  methods: {
    async getContest(){
      const response = await axios.get(
          `contests/${this.idContest}`,
      );
      this.contest = response.data
      this.isLoad = true
    }
  },
  mounted() {
    this.getContest()
  },
  name: "ContestHomePage"
}
</script>

<style scoped>
.main__block{
  width: 80%;
  margin: auto;
  padding: 50px 0;
}

.main__block > h1{
  font-weight: 600;
  margin: 20px 0;
}

.main_header{
  font-size: 40px;
  text-align: center;
  margin: 40px 0;
}
.main__block > p{
  margin: 20px 0;
  font-size: 20px;
}

.main__block > p > span{
  font-weight: bold;
  font-size: 25px;
}
</style>