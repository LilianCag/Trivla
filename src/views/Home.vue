<template>
  <v-item-group mandatory>
    <v-container>
      <v-layout style="margin-top:50px">
        <v-row>
          <v-col v-for="(categorie, index) in tab_questionnaires" :key="index" cols="12" md="3">
            <v-item>
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 16 : 2"
                  class="d-flex align-center"
                  width="500px"
                  height="200px"
                  @click="goTo(categorie.url)"
                  :color="hover ? categorie.color2 :categorie.color"
                >
                  <v-layout align-center justify-center>
                    <span style="font-size:1.5em;">{{ categorie.title }}</span>
                  </v-layout>
                </v-card>
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
          title: "Histoire",
          color: "#8269E4",
          color2:"#4E2CD8",
          url: "/quiz"
        },
        {
          title: "Géographie",
          color: "#A492EB",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Langues",
          color: "#C7BCF3",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Cinéma",
          color: "#6B4EE0",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Art",
          color: "#C7BCF3",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Litterature",
          color: "#6B4EE0",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Jeux vidéo",
          color: "#A492EB",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Sport",
          color: "#8269E4",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Sciences",
          color: "#6B4EE0",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Musique",
          color: "#A492EB",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Enfants",
          color: "#8269E4",
          color2:"#4E2CD8",
          url: ""
        },
        {
          title: "Divers",
          color: "#C7BCF3",
          color2:"#4E2CD8",
          url: ""
        }
      ]
    };
  },
  methods: {
    goTo(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style>

</style>

