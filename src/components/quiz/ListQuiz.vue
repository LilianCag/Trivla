<template>
  <v-card>
    <v-text-field id="uAnswer" outlined label="Réponse" v-model="userAnswer"></v-text-field>
    <v-btn>Pause</v-btn>
    <v-btn>Abandonner</v-btn>
    <v-simple-table dense>
      <tr>
          <th width="100">Couleur</th>
        <td v-for="answer in answers" width="100" v-bind:key="answer">
          <label class="answerLabel" v-bind:id="answers.indexOf(answer)">{{answer}}</label>
        </td>
      </tr>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "ListQuiz",
  data() {
    return {
      userAnswer: '',
      answers: ["Rouge", "Orange", "Jaune", "Vert", "Bleu", "Indigo", "Violet"]
    };
  },
  watch: {
    userAnswer() {
        if(this.answers.indexOf(this.userAnswer) != -1){
            console.log("Bonne réponse");
            document.getElementById(this.answers.indexOf(this.userAnswer)).style.display = "block";
            this.userAnswer="";
        }
      }
  },
};
</script>

<style>
td, th {
  border: 1px solid black;
}

.answerLabel {
    display: none;
}
</style>
