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
                 
                >
                <v-img
                height="200px"
                :src="category.img"
                >
                <v-card-title class="infoTitle justify-center"> {{ category.title }} </v-card-title>
                </v-img>
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
          url: "general",
          img: require("../assets/general.png")
        },
        {
          title: "Histoire",
          url: "histoire",
          img: require("../assets/histoire.jpg")
        },
        {
          title: "Géographie",
          url: "geographie",
          img: require("../assets/geographie.jpg")
        },
        {
          title: "Langues",
          url: "langues",
          img: require("../assets/langues.png")
        },
        {
          title: "Cinéma",
          url: "cinema",
          img: require("../assets/cinema.jpg")
        },
        {
          title: "Art",
          url: "art",
          img: require("../assets/art.jpg")
        },
        {
          title: "Littérature",
          url: "litterature",
          img: require("../assets/litterature.jpg")
        },
        {
          title: "Jeux vidéo",
          url: "jeuxvideo",
          img: require("../assets/jeux.jpg")
        },
        {
          title: "Sport",
          url: "sport",
          img: require("../assets/sport.jpg")
        },
        {
          title: "Sciences",
          url: "sciences",
          img: require("../assets/science.jpg")
        },
        {
          title: "Musique",
          url: "musique",
          img: require("../assets/music.jpg")
        },
        {
          title: "Enfants",
          url: "enfants",
          img: require("../assets/enfant.jpg")
        }
      ]
    };
  }
};
</script>

<style>

.infoTitle {
  font-size: 40px;
  text-justify: auto;
  padding-top: 20%;
  color:white;
  font-weight: bold;
  text-shadow: black 0.1em 0.1em 0.2em;
}

</style>

