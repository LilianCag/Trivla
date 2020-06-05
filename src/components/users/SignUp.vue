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
        <v-form @submit.prevent="onSignUp()">
          <v-text-field
            label="Nom de joueur*"
            name="login"
            id="login"
            v-model="login"
            prepend-icon="mdi-account"
            color="#6B4EE0"
            type="text"
            required
            :rules="loginRules"
          ></v-text-field>

          <v-text-field
            label="Adresse mail*"
            name="email"
            prepend-icon="mdi-email"
            color="#6B4EE0"
            id="email"
            v-model="email"
            type="email"
            required
            :rules="emailRules"
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
            :rules="passwordRules"
          ></v-text-field>

          <v-text-field
            id="confirmPassword"
            label="Confirmez votre mot de passe*"
            name="confirmPassword"
            prepend-icon="mdi-lock"
            color="#6B4EE0"
            v-model="confirmPassword"
            type="password"
            required
            :rules="[comparePasswords]"
          ></v-text-field>

          <!-- Boutons de création d'un compte et de connexion -->
          <v-card-actions justify>
            <v-btn class="white--text" color="#6B4EE0" @click="dialog = false">Fermer</v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" class="white--text" @click="onSignUp" color="#6B4EE0">Créer un compte</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    snackbar:false,
    dialog: false,
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
    loginRules: [
      v => !!v || 'Ce champ est obligatoire'
    ],
    emailRules: [
        v => !!v || 'Ce champ est obligatoire',
        v => /.+@.+/.test(v) || 'Votre e-mail n\'est pas valide'
      ],
      passwordRules: [
        (v) => !!v || 'Ce champ est obligatoire',
        (v) => v.length > 5 || 'Votre mot de passe doit contenir 6 caractères minimum'
      ]
  }),
  props: {
    source: String
  },
  computed: {
    //Retourne l'utilisateur
    user() {
      return this.$store.getters.user
    },
    //Compare les mots de passe
    comparePasswords() {
      return this.password !== this.confirmPassword ? 'Les mots de passe ne correspondent pas' : true;
    },
  },
  watch: {
    //Ferme la boîte de dialogue après inscription
    user(value) {
      if (value !== null && value !== undefined) {
        this.dialog=false;
      }
    }
  },
  methods: {
    //Appelle la fonction d'inscription dans le store
    onSignUp() {
      if(this.login !== "" && this.password !== "" && this.email !== "" && this.password.length > 5 )  {
      this.$store.dispatch('signUserUp', {
        pseudo: this.login, 
        email: this.email, 
        password : this.password})
    }
    else  {
      this.snackbar = true
    }
    },
  }
}

</script>
