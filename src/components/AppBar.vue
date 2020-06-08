<template>
  <v-app-bar app color="#4E2CD8" dark>
    <!-- LOGO TRIVLA -->
    <div class="d-flex justify-center">
      <router-link to="/">
      <v-img
        style="cursor: pointer"
        alt="Trivla Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo-trivla.png"
        width="150"
      />
      </router-link>
    </div>

    
    <v-spacer></v-spacer>

    
    <!-- MENU -->


    <div v-if="userIsAuthenticated == true">

      <!-- Bouton de création de quizz -->
      <v-btn text to="/createquestion">
      <v-icon > mdi-frequently-asked-questions </v-icon>
      <span class="btn"> Soumettre une question </span>
      </v-btn>
     

      <!--Bouton de profil -->
      <v-btn text to="/profile">
       <v-icon > mdi-account-details </v-icon>
        <span class="btn"> Profil </span>
      </v-btn>

      <v-btn text @click="logOut()" to="/"> 
       <v-icon > mdi-exit-run </v-icon>
        <span class="btn"> Se déconnecter </span>
      </v-btn>
    </div>
    <!-- Bouton de connexion -->
    <div v-else>

        
        <!-- Bouton de création de quizz -->
        <v-btn
          text
          @click= "snackbar = true">
        <v-icon > mdi-frequently-asked-questions </v-icon>
      <span class="btn"> Soumettre une question </span>
        </v-btn>
        <v-snackbar
        color="#6344DD"
        timeout="2000"
        v-model="snackbar">Connectez-vous pour soumettre une question.</v-snackbar>
    
      <SignIn />
    </div>
  </v-app-bar>
</template>

<script>
import SignIn from "./users/SignIn.vue";
export default {
  name: "AppBar",
  components: {
    SignIn
  },
  data() {
    return {
      snackbar: false
    };
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    logOut() {
      if (this.userIsAuthenticated) {
        this.$store.dispatch("logoutUser");
      }
    }
  }
};
</script>

<style>

.btn {
  padding: 5%;
}

</style>