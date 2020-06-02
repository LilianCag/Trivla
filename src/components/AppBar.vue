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
      <div>
        <!--Bouton de recherche -->
        <v-btn
          text
          @click="goToSearch">
          <span >Rechercher</span>
        </v-btn>

        <!-- Bouton de création de quizz -->
        <v-btn
          text
          @click="goToQuizzCreation">
          <span >Créer un quizz</span>
        </v-btn>
      </div>

      
      <!-- MENU -->
      <div>
        <!--Bouton de profil -->
        <v-btn
          text
          @click="goToProfile">
          <span>Profil</span>
        </v-btn>
      </div>

      <!-- Bouton de connexion -->
      <v-spacer></v-spacer>
        <SignIn />
    </v-app-bar>

</template>

<script>
import SignIn from './users/SignIn.vue'
export default {
    name: 'AppBar',
    components : { 
      SignIn
    },
    methods: {
      //Renvoie vers l'accueil
      goToHome(){
        this.$router.push("/");
      },
      goToSearch(){
        this.$router.push("/search");
      },
      goToQuizzCreation(){
        this.$router.push("/createquizz");
      },
      goToProfile() {
        this.$router.push("/profile")
      }
    }
}
</script>