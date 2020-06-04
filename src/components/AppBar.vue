<template>
    <v-app-bar
      app
      color="#4E2CD8"
      dark
    >
      <!-- LOGO TRIVLA -->
      <div class="d-flex justify-center">
        <v-img
          alt="Trivla Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo-trivla.png"
          width="150"
          @click="goToHome"
        />
      </div>
      <v-spacer></v-spacer>

      <!-- MENU -->
      
      <v-spacer></v-spacer>
      
      <div>
        <!-- Bouton de création de quizz -->
        <v-btn
          text
          @click="goToQuizzCreation">
          <span >Soumettre une question</span>
        </v-btn>
        <v-snackbar
        color="#6344DD"
        v-model="snackbar"> Veuillez vous connectez-vous pour soumettre une question </v-snackbar>
      </div>
      <div v-if="userIsAuthenticated == true">
        <!--Bouton de profil -->
        <v-btn
          text
          @click="goToProfile">
          <span>Profil</span>
        </v-btn>
      </div>
      <!-- Bouton de connexion -->
      <div v-if="userIsAuthenticated == false">
        <SignIn />
      </div>
      
    </v-app-bar>

</template>

<script>
import SignIn from './users/SignIn.vue'
export default {
    name: 'AppBar',
    components : { 
      SignIn
    },
    data() {
      return {
        snackbar:false,
      }
    },
    computed: {
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      //Renvoie vers l'accueil
      goToHome(){
        this.$router.push("/");
      },
      goToQuizzCreation(){
        if(this.isUserAuthenticated()) {
          this.$router.push("/createquizz");
        }
        else {
          this.snackbar = true
        }
      },
      goToProfile() {
        this.$router.push("/profile")
      },
      isUserAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
}
</script>