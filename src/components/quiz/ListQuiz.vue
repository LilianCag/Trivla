<template>
<v-content>
  <v-card v-if="isPaused" style="width:50%; margin:auto; text-align:center;">
    Jeu en pause<br>
    <v-btn @click="restart">Reprendre</v-btn>
  </v-card>
  <v-card id="gameCard" style="width:50%; margin:auto;" :disabled="cardDisabled">
    <div id="gameScene" v-if="isOn">
      <v-text-field style="width:50%" id="uAnswer" outlined label="Réponse" v-model="userAnswer"></v-text-field>
      <v-chip>
      <v-label>{{answerCount}}</v-label> /
      <v-label>{{answerNb}}</v-label>
      </v-chip>
      <v-progress-circular :size=50 :value="(timeLeft/timeLimit)*100" :rotate="-90" :color="progressColor">
        {{formattedTimeLeft}}
      </v-progress-circular>
      <v-btn @click="pause">Pause</v-btn>
      <v-btn>Abandonner</v-btn>
      <v-simple-table id="answerTable" dense>
        <thead>
          <tr>
            <th width="100">{{this.heads[0]}}</th>
          </tr>
        </thead>
        <tr v-for="answer in answers" v-bind:key="answer">
            <td>
          <label class="answerLabel" v-bind:id="answers.indexOf(answer)">{{answer}}</label>
          </td>
        </tr>
      </v-simple-table>
    </div>
    <div v-else>
      <v-btn @click="start">Démarrer</v-btn>
    </div>
  </v-card>
</v-content>
</template>

<script>
export default {
  name: "ListQuiz",
  data() {
    return {
      userAnswer: "",
      heads: ["Couleur"],
      answers: ["Rouge", "Orange", "Jaune", "Vert", "Bleu", "Indigo", "Violet"],
      answerCount: 0,
      answerNb: 0,
      isOn: false,
      isPaused: false,
      timeLimit: 20,
      timePassed: 0,
      timerInterval: null,
      cardDisabled: false,
      progressColor: "purple"
    };
  },
  mounted: function() {
    this.setAnswerNb();
  },
  watch: {
    //Vérifie si le joueur a entré une bonne réponse et met à jour l'affichage
    userAnswer() {
      //Condition à améliorer pour inclure la casse et les fautes de frappes
      if (this.answers.indexOf(this.userAnswer) != -1) {
        console.log("Bonne réponse");
        document.getElementById(
          this.answers.indexOf(this.userAnswer)
        ).style.display = "block";
        this.userAnswer = "";
        this.answerCount++;
      }
    },
    timeLeft(){
      if(this.timeLeft <= 10){
        this.progressColor = "red";
      }
      if(this.timeLeft == 0){
        this.pauseTimer();
      }
    }
  },
  computed: {
    timeLeft() {
      return this.timeLimit - this.timePassed;
    },
    formattedTimeLeft() {
      const timeLeft = this.timeLeft
      const minutes = Math.floor(timeLeft / 60)
      let seconds = timeLeft%60
      if(seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${minutes}:${seconds}`
    }
  },
  methods: {
    //Calcule le nombre de réponses à trouver
    setAnswerNb() {
      this.answerNb = this.answers.length;
    },
    start() {
      this.isOn=true;
      this.isPaused=false;
      this.runTimer();
    },
    pause() {
      this.isPaused = true;
      this.pauseTimer();
      document.getElementById("answerTable").style.filter="blur(3px)";
      this.cardDisabled = true;
    },
    restart() {
      this.isOn=true;
      this.isPaused=false;
      document.getElementById("answerTable").style.filter="none";
      this.cardDisabled = false;
      this.runTimer();
    },
    end(){

    },
    runTimer(){
      this.timerInterval = setInterval(() => (this.timePassed += 1),1000);
    },
    pauseTimer(){
      clearInterval(this.timerInterval);
    }
  }
};
</script>

<style>
td,
th {
  border: 1px solid black;
}

.answerLabel {
  display: none;
}
</style>
