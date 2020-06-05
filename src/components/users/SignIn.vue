<template>
  <v-dialog v-model="dialog" max-width="600px">
    <!-- Bouton d'affichage de la popup de connexion -->
    <template v-slot:activator="{on}">
      <v-btn v-on="on" color="#4E2CD8" depressed>Connexion</v-btn>
    </template>

    <!-- Toolbar de la popup de connexion -->
    <v-form @submit.prevent="onSignIn()">
      <v-card>
        <v-toolbar color="#6B4EE0" dark flat>
          <v-toolbar-title>Connexion</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <!-- Champs de l'id et du mot de passe -->

        <v-card-text>
          <v-text-field
            label="Identifiant"
            name="login"
            v-model="login"
            prepend-icon="mdi-account"
            color="#6B4EE0"
            type="text"
            required
          ></v-text-field>

          <v-text-field
            id="password"
            label="Mot de passe"
            name="password"
            v-model="password"
            prepend-icon="mdi-lock"
            color="#6B4EE0"
            type="password"
            required
          ></v-text-field>
        </v-card-text>

        <!-- Boutons de création d'un compte et de connexion -->
        <v-card-actions>
          <SignUp style="margin-left:0px; padding:0;"></SignUp>

          <v-spacer></v-spacer>
          <v-btn type="submit" class="white--text" color="#6B4EE0">Connexion</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import SignUp from "./SignUp.vue";
export default {
  data: () => ({
    dialog: false,
    login: "",
    password: ""
  }),
  props: {
    source: String
  },
  components: {
    SignUp
  },
  computed: {
    //Retourne l'utilisateur
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    //Ferme la boîte de dialogue après inscription
    user(value) {
      if (value !== null && value !== undefined) {
        this.dialog = false;
      }
    }
  },
  methods: {
    //Appelle la fonction d'inscription dans le store
    onSignIn() {
      if(this.login !== "" && this.password !== "") {    
      console.log(this.login),
      this.$store.dispatch("signUserIn", {
        email: this.login,
        password: this.password
      });
    }
    }
  }
};
</script>
