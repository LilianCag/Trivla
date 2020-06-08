<template>
  <v-item-group mandatory>
    <v-container>
      <v-layout style="margin-top:50px">
        <v-row>
          <v-col v-for="(category, index) in tab_questionnaires" :key="index" cols="12" md="3">
            <v-item>
              <v-hover v-slot:default="{ hover }">
                <router-link :to="{name: 'quiz', params:{cat : category.url, category: category.title}}" style="text-decoration: none;">
                <v-card
                  :elevation="hover ? 16 : 2"
                  class="d-flex align-center"
                  width="500px"
                  height="200px"
                  :color="hover ? category.color2 :category.color"
                >
                  <v-layout align-center justify-center>
                    <span style="font-size:1.5em;">{{ category.title }}</span>
                  </v-layout>
                </v-card>
                </router-link>
              </v-hover>
            </v-item>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      tab_questionnaires: [
        {
          title: "Général",
          color: "#C7BCF3",
          color2:"#4E2CD8",
          url: "general"
        },
        {
          title: "Histoire",
          color: "#8269E4",
          color2:"#4E2CD8",
          url: "histoire"
        },
        {
          title: "Géographie",
          color: "#A492EB",
          color2:"#4E2CD8",
          url: "geographie"
        },
        {
          title: "Langues",
          color: "#C7BCF3",
          color2:"#4E2CD8",
          url: "langues"
        },
        {
          title: "Cinéma",
          color: "#6B4EE0",
          color2:"#4E2CD8",
          url: "cinema"
        },
        {
          title: "Art",
          color: "#C7BCF3",
          color2:"#4E2CD8",
          url: "art"
        },
        {
          title: "Littérature",
          color: "#6B4EE0",
          color2:"#4E2CD8",
          url: "litterature"
        },
        {
          title: "Jeux vidéo",
          color: "#A492EB",
          color2:"#4E2CD8",
          url: "jeuxvideo"
        },
        {
          title: "Sport",
          color: "#8269E4",
          color2:"#4E2CD8",
          url: "sport"
        },
        {
          title: "Sciences",
          color: "#6B4EE0",
          color2:"#4E2CD8",
          url: "sciences"
        },
        {
          title: "Musique",
          color: "#A492EB",
          color2:"#4E2CD8",
          url: "musique"
        },
        {
          title: "Enfants",
          color: "#8269E4",
          color2:"#4E2CD8",
          url: "enfants"
        }
      ]
    };
  }
};
</script>

<style>

</style>

