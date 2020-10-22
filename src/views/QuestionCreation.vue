<template>
  <v-container>
    <v-form @submit.prevent="onCreateQuestion">
      <v-layout fluid mt-5>
        <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
          <v-card flat>
            <!-- INTITULE DE LA QUESTION -->
            <v-layout align-center pa-3 style="margin-bottom:10px">
              <v-flex xs12 md12>
                <v-text-field
                  v-model="title"
                  label="Veuillez entrer votre question"
                  name="question"
                  prepend-icon="mdi-help"
                  color="#6B4EE0"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <!-- CATEGORIE -->
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
              <!-- REPONSE CORRECTE -->
              <v-col>
                <v-overflow-btn
                  v-model="answerSelected"
                  :items="answers"
                  prepend-icon="mdi-check"
                  label="Veuillez sélectionner la bonne réponse"
                ></v-overflow-btn>
              </v-col>
            </v-layout>
            <!-- REPONSE 1 -->
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
            <!-- REPONSE 2 -->
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
            <!--REPONSE 3 -->
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
            <!-- REPONSE 4 -->
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
      <!-- VALIDER -->
      <v-layout column align-center style="margin-bottom:25px">
        <v-flex xs12 md12>
          <v-btn class="white--text" color="#6B4EE0" type="submit" :disabled="!formIsValid">Valider</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <v-dialog width=200 v-model="dialog">
      <v-toolbar color="#6B4EE0" dark flat>
        <v-toolbar-title>Question soumise<br></v-toolbar-title>
      </v-toolbar>
      <v-btn @click="goToHome">OK</v-btn>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "QuestionCreation",
  data() {
    return {
      // Intitulé de la question
      title: "",
      // Réponses
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      category: "",
      // Sélection de la bonne réponse
      answers: [1, 2, 3, 4],
      answerSelected: 0,
      // Tableau de catégories
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
        "Enfants"
      ],
      // Fenêtre de dialogue
      dialog: false
    };
  },
  computed: {
    // Retourne si le formulaire est bien rempli
    formIsValid() {
      return (
        this.title !== "" &&
        this.answer1 !== "" &&
        this.answer2 !== "" &&
        this.answer3 !== "" &&
        this.answer4 !== "" &&
        this.category !== "" &&
        this.answerSelected !== 0 &&
        this.user !== null
      );
    },
    //Retourne l'utilisateur
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    /*
     * Création de la question
     */
    onCreateQuestion() {
      if (!this.formIsValid) {
        return;
      }
      /*
       * Création des dernières données
       */
      // Liste des réponses mises dans un tableau
      let answerList = [this.answer1, this.answer2, this.answer3, this.answer4];
      // La bonne réponse (String)
      let theAnswer = answerList[this.answerSelected - 1];
      // La date (String)
      let dateTemp = new Date();
      let stringDate =
        "" +
        ("0" + dateTemp.getDate()).slice(-2) +
        "/" +
        ("0" + (dateTemp.getMonth() + 1)).slice(-2) +
        "/" +
        dateTemp.getFullYear();

      /*
       * Création de l'objet et ajout dans la bdd
       */
      const questionData = {
        author: this.user.pseudo,
        title: this.title,
        answers: answerList,
        correctAnswer: theAnswer,
        category: this.category,
        likes: 0,
        dislikes: 0,
        nbPlayed: 0,
        peopleAnswers: [0, 0, 0, 0],
        date: stringDate
      };
      this.$store.dispatch("createQuestion", questionData);
      this.dialog = true
    },
    goToHome() {
      this.$router.push("/");
    }
  }
};
</script>
