<template>
   
   
   
        <v-dialog v-model="dialog" max-width="600px">

          <!-- Bouton d'affichage de la popup de connexion -->
          <template v-slot:activator="{on}">
            <v-btn v-on="on" color="#4E2CD8" depressed> Connexion </v-btn>
          </template>

          <!-- Toolbar de la popup de connexion -->
          <v-card>
            <v-toolbar color="#4E2CD8" dark flat >
              <v-toolbar-title>Connexion</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <!-- Champs de l'id et du mot de passe -->
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Identifiant"
                  name="login"
                  prepend-icon="mdi-account"
                  color="#4E2CD8"
                  type="text"></v-text-field>

                  <v-text-field
                  id="password"
                  label="Mot de passe"
                  name="password"
                  prepend-icon="mdi-lock"
                  color="#4E2CD8"
                  type="password"></v-text-field>
                </v-form>
              </v-card-text>

              <!-- Boutons de création d'un compte et de connexion -->
              <v-card-actions>
                <SignUp style="margin-left:0px; padding:0;">
                  

                </SignUp>

                <v-spacer></v-spacer>
                <v-btn class="white--text" color="#4E2CD8" > Connexion </v-btn>
              </v-card-actions>
              <!-- TODO: Corriger bug affichage bouton -->

          </v-card>
        </v-dialog>


</template>

<script>
import SignUp from './SignUp.vue'
  export default {
    props: {
      source: String,
    },
    components : { 
      SignUp
    },
      methods: {

    }
  }
</script>
