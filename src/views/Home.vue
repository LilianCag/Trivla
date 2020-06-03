<template>
  <v-item-group mandatory >
    <v-container>
      <v-layout style="margin-top:50px">
        <v-row >
          <v-col
            v-for="categorie in tab_questionnaires"
            :key="categorie"
            cols="12"
            md="3"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                color="#C0C0C0"
                class="d-flex align-center"
                height="200"
                @click="toggle"
                text-color=""
              >
              {{ categorie }}
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-item-group>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return{
        tab_questionnaires: ['Histoire','Géographie','Langues','Cinéma','Art','Littérature','Jeu Vidéo','Sport','Sciences','Musique','Enfants','Divers']
      }
    }
  }
  
</script>
