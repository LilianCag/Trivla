<template>
  <v-container>
    <v-form @submit.prevent="onCreateQuestion">
      <v-layout fluid mt-5>
        <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
          <v-card flat>
            <v-layout align-center pa-3 style="margin-bottom:10px">
              <v-flex xs12 md12>
                <v-text-field
                  v-model="title"
                  label="Veuillez entrez votre question"
                  name="question"
                  prepend-icon="mdi-help"
                  color="#6B4EE0"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout justify-center pa-3 style="margin-bottom:10px">
              <v-col xs12 md12>
                <v-overflow-btn
                  v-model="category"
                  :items="categories"
                  prepend-icon="mdi-format-list-checkbox"
                  label="Veuillez sélectionner une catégorie"
                ></v-overflow-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <v-overflow-btn
                v-model="answerSelected"
                  :items="answers"
                  prepend-icon="mdi-check"
                  label="Veuillez sélectionner la bonne réponse"
                ></v-overflow-btn>
              </v-col>
            </v-layout>

            <v-layout align-center pa-3 style="margin-bottom:25px">
              <v-flex xs6 md6>
                <v-text-field
                  v-model="answer1"
                  label="Veuillez entrer une première proposition"
                  name="answer1"
                  prepend-icon="mdi-numeric-1-circle-outline"
                  color="#6B4EE0"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout align-center pa-3 style="margin-bottom:25px">
              <v-flex xs6 md6>
                <v-text-field
                  v-model="answer2"
                  label="Veuillez entrer une seconde proposition"
                  name="answer2"
                  prepend-icon="mdi-numeric-2-circle-outline"
                  color="#6B4EE0"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout align-center pa-3 style="margin-bottom:25px">
              <v-flex xs6 md6>
                <v-text-field
                  v-model="answer3"
                  label="Veuillez entrer une troisième proposition"
                  name="answer3"
                  prepend-icon="mdi-numeric-3-circle-outline"
                  color="#6B4EE0"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout align-center pa-3 style="margin-bottom:25px">
              <v-flex xs6 md6>
                <v-text-field
                  v-model="answer4"
                  label="Veuillez entrer une quatrième proposition"
                  name="answer4"
                  prepend-icon="mdi-numeric-4-circle-outline"
                  color="#6B4EE0"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout column align-center style="margin-bottom:25px">
        <v-flex xs12 md12>
          <v-btn class="white--text" color="#6B4EE0" type="submit" :disabled="!formIsValid">Valider</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "QuestionCreation",
  data() {
    return {
      title: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      category: "",
      correctAnswer: "",
      answerSelected: 0,
      categories: [
        "Histoire",
        "Géographie",
        "Langues",
        "Cinéma",
        "Art",
        "Littérature",
        "Jeux vidéo",
        "Sport",
        "Sciences",
        "Musique",
        "Enfants",
        "Divers"
      ],
      answers: [
        1,
        2,
        3,
        4
        //todo: liste dynamique pour afficher les réponses des emplacement answer1, answer2, answer3 et answer4
      ]
    };
  },
  computed: {
      formIsValid() {
          return this.title !== "" && this.answer1 !== "" && this.answer2 !== "" && this.answer3 !== "" && this.answer4 !== "" && this.category !== "" && this.answerSelected !== 0 && this.user!==null
      },
      //Retourne l'utilisateur
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
      onCreateQuestion() {
          if (!this.formIsValid) {
              return 
          }
          let answerList = [this.answer1, this.answer2, this.answer3, this.answer4]
          this.correctAnswer = answerList[this.answerSelected-1]

          const questionData = {
              author: this.user.pseudo,
              title: this.title,
              answers: answerList,
              correctAnswer: this.correctAnswer,
              category: this.category,
              date: new Date()
          }
          this.$store.dispatch('createQuestion', questionData)
          this.$router.push('/')
      }
  }
};
</script>
