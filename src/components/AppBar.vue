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

        <!-- Bouton de création de question -->
        <v-btn
          text
          @click="goToQuestionCreation">
          <span >Créer une question</span>
        </v-btn>
      </div>

      
      <!-- MENU -->
      <div>
        <!--Bouton de profil -->
          <v-btn v-if="userIsAuthenticated"
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
    computed: {
      menuItems() {
        if(this.userIsAuthenticated()) {
          return true
        } else { return false }
      },
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
    },
    methods: {
      //Renvoie vers l'accueil
      goToHome(){
        this.$router.push("/");
      },
      goToQuestionCreation(){
        this.$router.push("/createquestion");
      },
      goToProfile() {
        this.$router.push("/profile")
      }
    }
}
</script>