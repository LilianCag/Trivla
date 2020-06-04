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
      

      
      <!-- Bouton de connexion -->
      <v-spacer></v-spacer>

      <!-- MENU -->
      
      <div>
        <!-- Bouton de création de quizz -->
        <v-btn
          text
          @click="goToQuizzCreation">
          <span >Soumettre une question</span>
        </v-btn>
        <v-snackbar v-model="snackbar">Connectez-vous pour soumettre une question <SignIn/></v-snackbar>
      </div>
      <div v-if="userIsAuthenticated">
        <!--Bouton de profil -->
        <v-btn
          text
          @click="goToProfile">
          <span>Profil</span>
        </v-btn>
      </div>
      <div v-if="!userIsAuthenticated">
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
        snackbar:false
      }
    },
    methods: {
      //Renvoie vers l'accueil
      goToHome(){
        this.$router.push("/");
      },
      goToQuizzCreation(){
        if(this.userIsAuthenticated()) {
          this.$router.push("/createquizz");
        }
        else {
          this.snackbar = true
        }
      },
      goToProfile() {
        this.$router.push("/profile")
      },
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
}
</script>