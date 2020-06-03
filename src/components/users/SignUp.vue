<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <!-- Bouton d'affichage de la popup de création de compte -->
    <template v-slot:activator="{on}">
      <v-btn v-on="on" class="white--text" color="#6B4EE0">Créer un compte</v-btn>
    </template>

    <!-- Toolbar de la popup de connexion -->
    <v-card>
      <v-toolbar color="#6B4EE0" dark flat>
        <v-toolbar-title>Créer un compte</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- Champs de l'id et du mot de passe -->
      <v-card-text>
        <v-form>
          <v-text-field
            label="Nom de joueur*"
            name="login"
            id="login"
            v-model="login"
            prepend-icon="mdi-account"
            color="#6B4EE0"
            type="text"
            required
          ></v-text-field>

          <v-text-field
            label="Adresse mail*"
            name="email"
            prepend-icon="mdi-mail"
            id="email"
            v-model="email"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            id="password"
            label="Mot de passe*"
            name="password"
            prepend-icon="mdi-lock"
            color="#6B4EE0"
            v-model="password"
            type="password"
            required
          ></v-text-field>

          <v-text-field
            id="confirmPassword"
            label="Confirmez votre mot de passe*"
            name="confirmPassword"
            prepend-icon="mdi-lock"
            color="#6B4EE0"
            v-model="confirmPassword"
            type="password"
            :rules="[comparePasswords]"
          ></v-text-field>

          <!-- Boutons de création d'un compte et de connexion -->
          <v-card-actions justify>
            <v-btn class="white--text" color="#6B4EE0" @click="dialog = false">Fermer</v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" class="white--text" color="#6B4EE0">Créer un compte</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    login: "",
    email: "",
    password: "",
    confirmPassword: ""
  }),
  props: {
    source: String
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword ? 'Les mots de passe ne correspondent pas' : true;
    }
  },
  methods: {
    onSignUp() {
      // Vuex
      console.log({
        login: this.login,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
    }
  }
};
</script>

<style scoped>
.SignUp {
  margin: 0px;
  padding: 0px;
}
</style>