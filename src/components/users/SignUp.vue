<template>
    
 
        <v-dialog v-model="dialog" persistent max-width="600px">

        <!-- Bouton d'affichage de la popup de création de compte -->
        <template v-slot:activator="{on}">
            <v-btn v-on="on" class="white--text" color="#4E2CD8"> Créer un compte </v-btn>
        </template>

          <!-- Toolbar de la popup de connexion -->
          <v-card>
            <v-toolbar color="#4E2CD8" dark flat >
              <v-toolbar-title>Créer un compte</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <!-- Champs de l'id et du mot de passe -->
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Veuillez entrer un nom de joueur*"
                  name="login"
                  prepend-icon="mdi-account"
                  color="#4E2CD8"
                  type="text"
                  required></v-text-field>

                  <v-text-field
                  id="password"
                  label="Veuillez entrer votre mot de passe*"
                  name="password"
                  prepend-icon="mdi-lock"
                  color="#4E2CD8"
                  type="password"
                  required></v-text-field>

                <v-text-field
                  id="password"
                  label="Veuillez confirmer votre mot de passe*"
                  name="passwordcheck"
                  prepend-icon="mdi-lock"
                  color="#4E2CD8"
                  type="password"
                  required></v-text-field>

                </v-form>
              </v-card-text>

              <!-- Boutons de création d'un compte et de connexion -->
              <v-card-actions justify>
                <v-btn class="white--text" color="#4E2CD8" @click="dialog = false"> Fermer </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="white--text" color="#4E2CD8" > Créer un compte</v-btn>
              </v-card-actions>

          </v-card>
        </v-dialog>
  
    
</template>

<script>
 export default {
    data: () => ({
      dialog: false,
    }),
    props: {
      source: String,
    },
      methods: {

    }
  }
</script>

<style scoped>
  .SignUp{
    margin:0px;
    padding:0px;
  }
</style>