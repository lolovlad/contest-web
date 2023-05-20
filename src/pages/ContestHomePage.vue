<template>
  <div class="main__block" v-if="isLoad">
    <h1 class="main_header">
      Ceci est la page principale du cours.
      {{contest.name_contest}}
    </h1>
    <h1 v-if="$store.state.isCloseContest">
      cours terminé
    </h1>
    <description-task  v-html="contest.description"/>
    <h1>Erreurs pouvant survenir lors du test du programme.</h1>
    <p><span>Wrong answer (WA)</span> - Réponse incorrecte. La sortie du programme ne correspond pas
      réponse du jury. Format de sortie invalide ou erreur algorithmique dans le programme.</p>
    <p><span>Time limit exceeded (TL)</span> - Le délai spécifié dans la tâche a été dépassé. Programme
      dure plus longtemps que le temps défini. solution inefficace ou
      erreur algorithmique dans le programme.</p>
    <p><span>Presentation Error (PE)</span> - Fichier de sortie OUTPUT.TXT manquant. Fichier non créé
      nom de fichier incorrect ou plantage du programme avant l'ouverture du fichier de sortie.</p>
    <p><span>Compilation error (CE)</span> - Erreur de compilation. Non généré à la suite de la compilation
      exécutable. Erreur de syntaxe dans le programme ou mal spécifié
      extension de fichier. Il est possible que lors de l'implémentation en Java, une classe ait été utilisée,
      différent de Main.</p>
    <p><span>Memory limit exceeded (ML)</span>- La limite de mémoire spécifiée dans la tâche a été dépassée. Programme
      utilise plus que la taille de mémoire définie. Algorithme inefficace, ou
      utilisation inutile de la mémoire</p>
    <p><span>Runtime error (RE)</span> - Erreur d'exécution. Le programme s'est terminé avec un résultat non nul
      Code de retour. Dans ce cas, le résultat du travail n'est pas vérifié. Peut-être au programme
      il y a eu accès à un élément inexistant du tableau, division par zéro, etc.
      Le programme C++ peut ne pas se terminer par une instruction "return 0", ou pour une autre raison.
      renvoyé un code retour différent de zéro.</p>
  </div>
  <h1 v-else>
    chargement
  </h1>
</template>

<script>
import axios from "axios";
import DescriptionTask from "@/components/UI/DescriptionTask";

export default {
  components: {DescriptionTask},
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