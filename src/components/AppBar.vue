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
          target="_blank"
          text
          @click="goToSearch">
          <span class="mr-2">Rechercher</span>
        </v-btn>

        <!-- Bouton de création de question -->
        <v-btn
          target="_blank"
          text
          @click="goToQuestionCreation">
          <span class="mr-2">Créer une question</span>
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
      goToQuestionCreation(){
        this.$router.push("/createquestion");
      },
    }
}
</script>