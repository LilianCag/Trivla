<template>
  <v-item-group mandatory >
    <v-container>
      <v-layout style="margin-top:50px">
        <v-row >
          <v-col
            v-for="categorie in tab_questionnaires"
            :key="tab_questionnaires[tab_questionnaires.indexOf(categorie)].title"
            cols="12"
            md="3"
          >
            <v-item>
              <v-card
                class="d-flex align-center"
                width="500px"
                height="200px"
                @click="goTo(categorie.url)"  
                :color="categorie.color"
                       
              >
                <v-layout align-center justify-center>
                  <span style="font-size:1.5em;">
                  {{ categorie.title }}
                  </span>
                </v-layout>
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
        tab_questionnaires: [
          {
            title: "Histoire",
            color: "#8269E4",
            url: "/history"
          },
          {
            title: "Géographie",
            color: "#A492EB",
            url: ""
          },
          {
            title: "Langues",
            color: "#C7BCF3",
            url: ""
          },
          {
            title: "Cinéma",
            color: "#6B4EE0",
            url: ""
          },
          {
            title: "Art",
            color: "#C7BCF3",
            url: ""
          },
          {
            title: "Litterature",
            color: "#6B4EE0",
            url: ""
          },
          {
            title: "Jeux vidéo",
            color: "#A492EB",
            url: ""
          },
          {
            title: "Sport",
            color: "#8269E4",
            url: ""
          },
          {
            title: "Sciences",
            color: "#6B4EE0",
            url: ""
          },
          {
            title: "Musique",
            color: "#A492EB",
            url: ""
          },
          {
            title: "Enfants",
            color: "#8269E4",
            url: ""
          },
          {
            title: "Divers",
            color: "#C7BCF3",
            url: ""
          },
        ]
      }
    },
    methods: {
      goTo(url){
        this.$router.push(url);
      }
        
    }

  }
  
</script>
