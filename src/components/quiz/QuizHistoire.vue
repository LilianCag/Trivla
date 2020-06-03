<template>
  <v-container>
    <v-layout fluid mt-5>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <v-card
          flat
        >
            <v-layout align-center pa-3 style="margin-bottom:50px">
                <v-flex xs12 md12>
                    <p style="font-size:48px;color:#4E2CD8;font-weight:bold;"> Quelle est la couleur du cheval blanc d'Henri IV ? </p>
                </v-flex>
                
            </v-layout>
            
            <v-item-group mandatory >
                <v-container>
                <v-layout>
                    <v-row >
                    <v-col
                        v-for="categorie in tab_question"
                        :key="categorie"
                        cols="12"
                        md="3"
                    >
                        <v-item v-slot:default="{ active, toggle }">
                        <v-card
                            class="d-flex align-center"
                            width="500px"
                            height="200px"
                            @click="toggle"    
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
         
           
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  
    name:"QuizHistoire",
    data() {
    return{
        tab_question: [
          {
            title: "Rouge",
            color: "#8269E4",
            url: ""
          },
          {
            title: "Blanc",
            color: "#A492EB",
            url: ""
          },
          {
            title: "SPAAAACE",
            color: "#C7BCF3",
            url: ""
          },
          {
            title: "La mer noire",
            color: "#6B4EE0",
            url: ""
          },
        ]
      }
    }
}
</script>


