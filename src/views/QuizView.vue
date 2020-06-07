<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex xs12 class="test-xs-center">
        <v-progress-circular
        indeterminate
        class="primary--text"
        :width="7"
        :size="70"
        >

        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <v-card v-if="isOn">
          <v-progress-circular :size="75" rotate="-90" v-model="getProgressScore" color="purple">
            <label style="text-align:center">
              Score
              <br />
              {{score}} / {{questionCount}}
            </label>
          </v-progress-circular>
          <v-progress-circular
            :size="75"
            :value="(timeLeft/timeLimit)*100"
            :rotate="-90"
            :color="timerColor"
          >{{formattedTimeLeft}}</v-progress-circular>
          <v-layout align-center pa-3 style="margin-bottom:50px">
            <v-flex xs12 md12>
              <v-card v-model="currentQuestion">
                <v-chip>{{currentQuestion.category}}</v-chip>
                <v-chip>Soumise par {{currentQuestion.author}}</v-chip>
                <p style="font-size:48px;color:#4E2CD8;font-weight:bold;">{{currentQuestion.title}}</p>
              </v-card>
            </v-flex>
          </v-layout>

          <v-item-group mandatory>
            <v-container>
              <v-layout>
                <v-row>
                  <v-col
                    v-for="answer in currentQuestion.answers"
                    :key="answer.title"
                    cols="12"
                    md="3"
                  >
                    <v-item>
                      <v-card
                        class="d-flex align-center"
                        v-bind:id="answer"
                        width="500px"
                        height="200px"
                        @click="pickAnswer(answer)"
                        color="#8269E4"
                        value="answer"
                        :disabled="isAnswered"
                      >
                        <v-layout align-center justify-center>
                          <span style="font-size:1.5em; color: white">{{ answer }}</span>
                        </v-layout>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-layout>
            </v-container>
          </v-item-group>
          <v-btn
            @click="nextQuestion"
            v-if="questionCount<questionNumber"
            :disabled="!isAnswered"
          >Question suivante</v-btn>
          <v-progress-linear v-model="getProgress" color="purple"></v-progress-linear>
        </v-card>
        <v-card v-else>
          <v-btn @click="start">Démarrer</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "QuizView",
  props: {
    category : String
  },
  data() {
    return {
      isOn: false,
      isAnswered: false,
      currentQuestion: null,
      questionCount: 0,
      questionNumber: 0,
      score: 0,
      questions: [],
      timeLimit: 10,
      timePassed: 0,
      timerInterval: null,
      timerColor: "green"
    };
  },
  watch: {
    timeLeft() {
      if (this.timeLeft <= 3) {
        this.timerColor = "red";
      }
      if (this.timeLeft <= 0) {
        this.pauseTimer();
        if (!this.isAnswered) {
          this.pickAnswer("");
        }
      }
    }
  },
  mounted : function(){
    if(this.category == null) {
      this.category = "Général"
    }
    this.$store.dispatch('loadQuestions',this.category)
  },
  computed: {
    getProgress() {
      return (this.questionCount / this.questionNumber) * 100;
    },
    getProgressScore() {
      return (this.score / this.questionNumber) * 100;
    },
    timeLeft() {
      return this.timeLimit - this.timePassed;
    },
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      let seconds = timeLeft % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${seconds}`;
    },
    loading() {
      return this.$store.getters.loading
    },
  },
  methods: {
    //Démarre le jeu
    start() {
      this.setQuestions();
      this.setCurrentQuestion();
      this.questionNumber = this.questions.length;
      this.runTimer();
    },
    //Gère quand l'utilisateur clique sur une réponse
    pickAnswer(answer) {
      if (this.currentQuestion.correctAnswer === answer) {
        this.score++;
        document.getElementById(answer).style.backgroundColor = "green";
      } else {
        if (this.currentQuestion.answers.indexOf(answer) != -1) {
          document.getElementById(answer).style.backgroundColor = "red";
        }

        document.getElementById(
          this.currentQuestion.correctAnswer
        ).style.backgroundColor = "green";
      }
      this.isAnswered = true
      this.questionCount++;
      this.pauseTimer();
    },
    nextQuestion() {
      this.isAnswered = false;
      if (this.questionCount < this.questionNumber) {
        for (let answer in this.currentQuestion.answers) {
          document.getElementById(
            this.currentQuestion.answers[answer]
          ).style.backgroundColor = "#8269E4";
        }
        this.setCurrentQuestion();
        
      }
      this.runTimer();
    },
    setQuestions() {
      this.isOn = true;
      this.questions = this.$store.getters.loadedQuestions;
    },
    setCurrentQuestion() {
      this.currentQuestion = this.questions[this.questionCount];
    },
    runTimer() {
      this.timeLimit = 10;
      this.timePassed = 0;
      this.timerColor = "green";
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
    pauseTimer() {
      clearInterval(this.timerInterval);
    }
  }
};
</script>