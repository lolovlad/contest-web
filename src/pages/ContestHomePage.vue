<template>
  <div class="main__block" v-if="isLoad">
    <h1 class="main_header">
      Это главная страница контеста
      {{contest.name_contest}}
    </h1>
    <h1 v-if="$store.state.isCloseContest">
      контест закончен
    </h1>
    <h1>Ошибки, которые могу быть при тестировании программы.</h1>
    <p><span>Wrong answer (WA)</span> - Неверный ответ. Результат работы программы не совпадает с
      ответом жюри. Неверный формат вывода или алгоритмическая ошибка в программе.</p>
    <p><span>Time limit exceeded (TL)</span> - Превышен указанный в задаче лимит времени. Программа
       выполняется дольше установленного времени. Неэффективное решение или
       алгоритмическая ошибка в программе.</p>
    <p><span>Presentation Error (PE)</span> - Отсутствие выходного файла OUTPUT.TXT. Файл не создан,
       неверное имя файла или сбой программы до открытия выходного файла.</p>
    <p><span>Compilation error (CE)</span> - Ошибка компиляции. В результате компиляции не создан
      исполняемый файл. Синтаксическая ошибка в программе или неверно указано
      расширение файла. Возможно, что при реализации на языке Java был использован класс,
      отличный от Main.</p>
    <p><span>Memory limit exceeded (ML)</span> - Превышен указанный в задаче лимит памяти. Программа
      использует больше установленного размера памяти. Неэффективный алгоритм, либо
      нерациональное использование памяти</p>
    <p><span>Runtime error (RE)</span> - Ошибка исполнения. Программа завершила работу с ненулевым
      кодом возврата. В этом случае результат работы не проверяется. Возможно, в программе
      произошло обращение к несуществующему элементу массива, деление на ноль и т.д.
      Возможно, программа на C++ не завершается оператором «return 0» или по иной причине
      вернула ненулевой код возврата.</p>
  </div>
  <h1 v-else>
    загрузка
  </h1>
</template>

<script>
import axios from "axios";

export default {
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
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests/${this.idContest}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
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
  font-size: 50px;
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