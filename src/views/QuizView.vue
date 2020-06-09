<template>
  <v-container>
    <!-- CHARGEMENT -->
    <v-layout v-if="loading">
      <v-flex xs12 class="test-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <!-- QUIZ -->
    <v-layout v-else>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <v-card v-if="isOn">
          <!-- SCORE -->
          <v-progress-circular :size="75" rotate="-90" v-model="getProgressScore" color="purple">
            <label style="text-align:center">
              Score
              <br />
              {{score}} / {{questionCount}}
            </label>
          </v-progress-circular>
          <!-- TIMER -->
          <v-progress-circular
            :size="75"
            :value="(timeLeft/timeLimit)*100"
            :rotate="-90"
            :color="timerColor"
          >{{formattedTimeLeft}}</v-progress-circular>
          <!-- 
            QUESTION 
          -->
          <v-layout align-center pa-3 style="margin-bottom:50px">
            <v-flex xs12 md12>
              <v-card v-model="currentQuestion">
                <!-- CATEGORIE -->
                <v-chip>{{currentQuestion.category}}</v-chip>
                <!-- AUTEUR ET DATE -->
                <v-chip>Soumise par {{currentQuestion.author}} le {{currentQuestion.date}}</v-chip>
                <!-- NOMBRE DE TENTATIVES -->
                <v-chip>Jouée {{currentQuestion.nbPlayed}} fois</v-chip>
                <!-- 
                  JOKERS
                -->
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
                <!-- 
                  INTITULE DE LA QUESTION 
                -->
                <p style="font-size:48px;color:#4E2CD8;font-weight:bold;">{{currentQuestion.title}}</p>
              </v-card>
            </v-flex>
          </v-layout>
          <!-- 

            REPONSES

          -->
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
                          <span
                            style="font-size:1.5em; color: white; text-align:center"
                          >{{ answer }}</span>
                        </v-layout>
                        <!-- Avis des internautes -->
                        <label
                          v-if="audiencePoll"
                          value="audienceTab"
                        >{{audienceTab[currentQuestion.answers.indexOf(answer)]}} %</label>
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
              <v-btn @click="likeButton" :dark="liked">
                <v-icon>mdi-thumb-up-outline</v-icon>
              </v-btn>
              <v-btn @click="dislikeButton" :dark="disliked">
                <v-icon>mdi-thumb-down-outline</v-icon>
              </v-btn>
            </div>
            <!-- QUESTION SUIVANTE -->
            <v-btn
              @click="nextQuestion"
              v-if="questionCount<questionNumber"
              :disabled="!isAnswered"
            >Question suivante</v-btn>
            <!-- FIN DU QUIZ -->
            <v-btn @click="endQuiz" v-if="questionCount==questionNumber">Fin du quiz</v-btn>
          </div>
          <!-- PROGRESSION DANS LE QUIZ -->
          <v-progress-linear v-model="getProgress" color="purple"></v-progress-linear>
        </v-card>

        <!-- DEMARRER LE QUIZ -->
        <v-layout justify-center v-else>
          <v-card-actions>
            <v-img
              style="cursor: pointer;
              margin-top:20%"
              height="500px"
              width="500px"
              :src="require('../assets/letsgo.png')"
              @click="start"
            ></v-img>
          </v-card-actions>
        </v-layout>

        <!-- 
          GAME OVER 
        -->
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
      //Jeu en cours
      isOn: false,
      // Question répondue
      isAnswered: false,
      // Jeu terminé
      gameOver: false,
      // Question actuelle (type: Question)
      currentQuestion: null,
      // Numéro de la question en cours
      questionCount: 0,
      // Nombre de questions au total
      questionNumber: 0,
      // Nombre de réponses correctes du joueur
      score: 0,
      // Tableau des questions
      questions: [],
      // Timer
      timeLimit: 10,
      timePassed: 0,
      timerInterval: null,
      timerColor: "green",
      // Jokers
      isTimerFreezeUsed: false,
      isFiftyFiftyUsed: false,
      isAudiencePollUsed: false,
      audiencePoll: false,
      audienceTab: [],
      // Popularité
      liked: false,
      disliked: false
    };
  },
  watch: {
    // Termine la partie que le timer atteint 0
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
    //Charge les questions depuis la bdd
    /*
     * CHANGER CE IF !
     */
    if (this.category == null) {
      this.category = "Général";
    }
    this.$store.dispatch("loadQuestions", this.category);
  },
  computed: {
    // Retourne la progression dans le quiz
    getProgress() {
      return (this.questionCount / this.questionNumber) * 100;
    },
    // Retourne le score actuel du joueur
    getProgressScore() {
      return (this.score / this.questionNumber) * 100;
    },
    // Retourne le temps restant
    timeLeft() {
      return this.timeLimit - this.timePassed;
    },
    // Retourne le temps restant formaté
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      let seconds = timeLeft % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${seconds}`;
    },
    // Retourne l'état de chargement
    loading() {
      return this.$store.getters.loading;
    },
    /*
     * Retourne si les jokers sont utilisables
     */
    isTimerFreezeAvailable() {
      return this.isTimerFreezeUsed || this.isAnswered;
    },
    isFiftyFiftyAvailable() {
      return this.isFiftyFiftyUsed || this.isAnswered;
    },
    isAudiencePollAvailable() {
      return this.isAudiencePollUsed || this.isAnswered;
    },
    // Retourne si un utilisateur est connecté
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
    /*
     * CLIC SUR UNE REPONSE (ou fin du timer)
     */
    pickAnswer(answer) {
      /*
       * Si la réponse donnée est correcte on l'affiche en vert
       * Si la réponse donnée est fausse on l'affiche en rouge
       *     et on affiche la bonne réponse en vert
       */
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

      //Mise à jour des tableaux dans l'objet question
      if (this.currentQuestion.answers.indexOf(answer) != -1) {
        this.currentQuestion.peopleAnswers[
          this.currentQuestion.answers.indexOf(answer)
        ]++;
        this.currentQuestion.nbPlayed = this.currentQuestion.nbPlayed + 1;
      }

      this.pauseTimer();
      this.isAnswered = true;
      this.questionCount++;
    },
    /*
     * PASSAGE A LA QUESTION SUIVANTE
     */
    nextQuestion() {
      // Maj de la question dans la BDD
      if (this.liked) {
        this.currentQuestion.likes++;
      }
      if (this.disliked) {
        this.currentQuestion.dislikes++;
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

      // Reset de l'affichage
      this.audiencePoll = false;
      this.isAnswered = false;
      this.liked = false;
      this.disliked = false;
      // Passage à la question suivante
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
    /*
     * FIN DU QUIZ
     */
    endQuiz() {
      // Dernière màj de question dans la bdd
      if (this.liked) {
        this.currentQuestion.likes++;
      }
      if (this.disliked) {
        this.currentQuestion.dislikes++;
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
      // Ajout d'une partie jouée dans l'objet utilisateur
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
    // Charge les questions depuis le store
    setQuestions() {
      this.isOn = true;
      this.questions = this.$store.getters.loadedQuestions;
    },
    // Paramètre la question en cours
    setCurrentQuestion() {
      this.currentQuestion = this.questions[this.questionCount];
    },
    /*
     * TIMER
     */
    runTimer() {
      this.timeLimit = 10;
      this.timePassed = 0;
      this.timerColor = "green";
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
    pauseTimer() {
      clearInterval(this.timerInterval);
    },
    /*
     * JOKERS
     */
    jokerTimerFreeze() {
      this.pauseTimer();
      this.timerColor = "cyan";
      this.isTimerFreezeUsed = true;
    },
    jokerFiftyFifty() {
      let erase = [];
      let index = -1;
      // Recherche de 2 réponses fausses à effacer
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
      //Màj de l'affichage
      for (let answerToErase in erase) {
        document.getElementById(erase[answerToErase]).style.backgroundColor =
          "red";
        document.getElementById(erase[answerToErase]).style.opacity = 0;
      }
      this.isFiftyFiftyUsed = true;
    },
    jokerAudiencePoll() {
      this.isAudiencePollUsed = true;
      this.audiencePoll = true;
      //Si la question a déjà été jouée on affiche le tableau peopleAnswers
      if (this.currentQuestion.nbPlayed > 0) {
        for (let answer in this.currentQuestion.answers) {
          this.audienceTab[answer] = Math.round(
            (this.currentQuestion.peopleAnswers[answer] /
              this.currentQuestion.nbPlayed) *
              100
          );
        }
      }
      //Sinon on affiche 25 pour ne pas avoir à diviser par zéro
      else {
        for (let answer in this.currentQuestion.answers) {
          this.audienceTab[answer] = 25;
        }
      }
    },
    // J'aime
    likeButton() {
      if (this.liked) {
        this.unlike();
      } else {
        this.liked = true;
        this.disliked = false;
      }
    },
    // J'aime pas
    dislikeButton() {
      if (this.disliked) {
        this.unlike();
      } else {
        this.liked = false;
        this.disliked = true;
      }
    },
    // Recliquer sur J'aime/J'aime pas
    unlike() {
      this.liked = false;
      this.disliked = false;
    }
  }
};
</script>