<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex xs12 class="test-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
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
                <v-chip>Soumise par {{currentQuestion.author}} le {{currentQuestion.date}}</v-chip>
                <v-chip>Jouée {{currentQuestion.nbPlayed}} fois</v-chip>
                <!-- 5050 -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="jokerFiftyFifty" :disabled="isFiftyFiftyAvailable" v-on="on">
                      <v-icon>mdi-star-half-full</v-icon>
                    </v-btn>
                  </template>
                  <span>50/50</span>
                </v-tooltip>
                <!-- Avis du public -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="jokerAudiencePoll" :disabled="isAudiencePollAvailable" v-on="on">
                      <v-icon>mdi-account-question</v-icon>
                    </v-btn>
                  </template>
                  <span>Avis des internautes</span>
                </v-tooltip>
                <!-- Timer Freeze -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="jokerTimerFreeze" :disabled="isTimerFreezeAvailable" v-on="on">
                      <v-icon>mdi-lock-clock</v-icon>
                    </v-btn>
                  </template>
                  <span>Congélation de Timer</span>
                </v-tooltip>
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
                          <span style="font-size:1.5em; color: white; text-align:center">{{ answer }}</span>
                        </v-layout>
                        <label v-if="audiencePoll" value="audienceTab">{{audienceTab[currentQuestion.answers.indexOf(answer)]}} % </label>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-layout>
            </v-container>
          </v-item-group>

          <!-- POUCE VERT POUCE ROUGE -->
          <div v-if="isAnswered">
          <div v-if="userIsAuthenticated">
          <v-btn @click="likeButton" :dark=liked>
            <v-icon >mdi-thumb-up-outline</v-icon>
          </v-btn>
          <v-btn @click="dislikeButton" :dark=disliked>
            <v-icon >mdi-thumb-down-outline</v-icon>
          </v-btn>
          </div>
          <v-btn
            @click="nextQuestion"
            v-if="questionCount<questionNumber"
            :disabled="!isAnswered"
          >Question suivante</v-btn>
          <v-btn @click="endQuiz" v-if="questionCount==questionNumber">Fin du quiz</v-btn>
          </div>
          <v-progress-linear v-model="getProgress" color="purple"></v-progress-linear>
        </v-card>
        <v-card v-else>
          <v-btn @click="start">Démarrer</v-btn>
        </v-card>
        <v-card v-if="gameOver">
          <v-progress-circular
            :size="500"
            width="100"
            rotate="-90"
            v-model="getProgressScore"
            color="purple"
          >
            <label style="text-align:center">
              <br />
              {{score}} / {{questionCount}}
            </label>
          </v-progress-circular>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "QuizView",
  props: {
    category: String
  },
  data() {
    return {
      isOn: false,
      isAnswered: false,
      gameOver: false,
      currentQuestion: null,
      questionCount: 0,
      questionNumber: 0,
      score: 0,
      questions: [],
      timeLimit: 10,
      timePassed: 0,
      timerInterval: null,
      timerColor: "green",
      isTimerFreezeUsed: false,
      isFiftyFiftyUsed: false,
      isAudiencePollUsed: false,
      audiencePoll: false,
      audienceTab: [],
      liked: false,
      disliked: false
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
  mounted: function() {
    if (this.category == null) {
      this.category = "Général";
    }
    this.$store.dispatch("loadQuestions", this.category);
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
      return this.$store.getters.loading;
    },
    isTimerFreezeAvailable() {
      return this.isTimerFreezeUsed || this.isAnswered;
    },
    isFiftyFiftyAvailable() {
      return this.isFiftyFiftyUsed || this.isAnswered;
    },
    isAudiencePollAvailable() {
      return this.isAudiencePollUsed || this.isAnswered;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
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
      if(this.currentQuestion.answers.indexOf(answer) != -1) {
        console.log(this.currentQuestion.peopleAnswers)
        this.currentQuestion.peopleAnswers[this.currentQuestion.answers.indexOf(answer)] ++
        this.currentQuestion.nbPlayed = this.currentQuestion.nbPlayed + 1
      }

      this.pauseTimer();
      this.isAnswered = true;
      this.questionCount++;
    },
    nextQuestion() {
      if(this.liked) {
        this.currentQuestion.likes++
      }
      if(this.disliked) {
        this.currentQuestion.dislikes++
      }
      this.$store.dispatch("updateQuestionData", {
          id: this.currentQuestion.id,
          author: this.currentQuestion.author,
          title: this.currentQuestion.title,
          answers: this.currentQuestion.answers,
          correctAnswer: this.currentQuestion.correctAnswer,
          category: this.currentQuestion.category,
          likes: this.currentQuestion.likes,
          dislikes: this.currentQuestion.dislikes,
          nbPlayed: this.currentQuestion.nbPlayed,
          peopleAnswers: this.currentQuestion.peopleAnswers,
          date: this.currentQuestion.date
        });

      this.audiencePoll = false
      this.isAnswered = false
      this.liked = false
      this.disliked = false
      if (this.questionCount < this.questionNumber) {
        for (let answer in this.currentQuestion.answers) {
          document.getElementById(
            this.currentQuestion.answers[answer]
          ).style.backgroundColor = "#8269E4";
          document.getElementById(
            this.currentQuestion.answers[answer]
          ).style.opacity = 100;
        }
        this.setCurrentQuestion();
      }
      this.runTimer();
    },
    endQuiz() {
      if(this.liked) {
        this.currentQuestion.likes++
      }
      if(this.disliked) {
        this.currentQuestion.dislikes++
      }
      this.$store.dispatch("updateQuestionData", {
          id: this.currentQuestion.id,
          author: this.currentQuestion.author,
          title: this.currentQuestion.title,
          answers: this.currentQuestion.answers,
          correctAnswer: this.currentQuestion.correctAnswer,
          category: this.currentQuestion.category,
          likes: this.currentQuestion.likes,
          dislikes: this.currentQuestion.dislikes,
          nbPlayed: this.currentQuestion.nbPlayed,
          peopleAnswers: this.currentQuestion.peopleAnswers,
          date: this.currentQuestion.date
        });
      this.gameOver = true;
      if (this.userIsAuthenticated) {
        const user = this.$store.getters.user;
        this.$store.dispatch("updateUserData", {
          id: user.id,
          email: user.email,
          pseudo: user.pseudo,
          nbGames: user.nbGames + 1
        });
      }
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
    },
    jokerTimerFreeze() {
      this.pauseTimer()
      this.timerColor = "cyan"
      this.isTimerFreezeUsed = true
    },
    jokerFiftyFifty() {
      let erase = [];
      let index = -1;
      while (erase.length < 2) {
        index = Math.floor(Math.random() * this.currentQuestion.answers.length);
        if (
          this.currentQuestion.answers[index] !=
            this.currentQuestion.correctAnswer &&
          erase.indexOf(this.currentQuestion.answers[index]) != 0
        ) {
          erase.push(this.currentQuestion.answers[index]);
        }
      }
      for (let answerToErase in erase) {
        document.getElementById(erase[answerToErase]).style.backgroundColor =
          "red";
        document.getElementById(erase[answerToErase]).style.opacity = 0;
      }
      this.isFiftyFiftyUsed = true
    },
    jokerAudiencePoll() {
      this.isAudiencePollUsed = true
      this.audiencePoll = true
      if(this.currentQuestion.nbPlayed > 0) {
        for(let answer in this.currentQuestion.answers) {
          this.audienceTab[answer] = Math.round((this.currentQuestion.peopleAnswers[answer]/this.currentQuestion.nbPlayed)*100)
        }
      }
      else {
        for(let answer in this.currentQuestion.answers) {
          this.audienceTab[answer] = 25
        }
      }
    },
    likeButton() {
      if(this.liked) {
        this.unlike()
      }
      else {
        this.liked = true
        this.disliked = false
      }
      
    },
    dislikeButton() {
      if(this.disliked) {
        this.unlike()
      }
      else {
        this.liked = false
        this.disliked = true
      }
    },
    unlike() {
      this.liked = false
      this.disliked = false
    }
  }
};
</script>