<template>
    <v-app-bar
      app
      color="#4E2CD8"
      dark
    >
      <!-- LOGO TRIVLA -->
      <div class="d-flex align-center">
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
        <v-btn
          target="_blank"
          text
          @click="goToSearch">
          <span class="mr-2">Rechercher</span>
        </v-btn>
        <v-btn text>
          <span class="mr-2">Créer un quiz</span>
          </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Connexion</span>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'AppBar',
    methods: {
      //Renvoie vers l'accueil
      goToHome (){
        this.$router.push("/");
      },
      goToSearch(){
        this.$router.push("/search")
      }
    }
}
</script>