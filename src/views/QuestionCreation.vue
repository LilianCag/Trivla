<template>
  <v-container>
    <v-form
    @submit="submit"
    onSubmit="return false;">
        <v-layout fluid mt-5>
        <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
            <v-card flat>
                <v-layout align-center pa-3 style="margin-bottom:10px">
                    <v-flex xs12 md12>


                        <v-text-field
                        label="Veuillez entrez votre question"
                        name="question"
                        prepend-icon="mdi-help"
                        color="#6B4EE0"
                        type="text"></v-text-field>
                    
                </v-flex>
            </v-layout>
           
        <v-layout justify-center pa-3 style="margin-bottom:10px">
            
            <v-col xs12 md12>
                <v-overflow-btn 
                    :items="categories"
                    prepend-icon="mdi-format-list-checkbox"
                    label="Veuillez sélectionner une catégorie"
                ></v-overflow-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
                <v-overflow-btn 
                    :items="reponses"
                    prepend-icon="mdi-check"
                    label="Veuillez sélectionner la bonne réponse"
                ></v-overflow-btn>
            </v-col>
         </v-layout>

            <v-layout align-center pa-3 style="margin-bottom:25px">
                <v-flex xs6 md6>
                  
                        <v-text-field
                        v-model="answer1"
                        label="Veuillez entrer une première proposition"
                        name="answer1"

                        prepend-icon="mdi-numeric-1-circle-outline"
                        color="#6B4EE0"
                        type="text"></v-text-field>
                    
                </v-flex>
            </v-layout>

            <v-layout align-center pa-3 style="margin-bottom:25px">
                <v-flex xs6 md6>
                    
                        <v-text-field
                        v-model="answer2"
                        label="Veuillez entrer une seconde proposition"
                        name="answer2"
                        prepend-icon="mdi-numeric-2-circle-outline"
                        color="#6B4EE0"
                        type="text"></v-text-field>
                   
                </v-flex>
            </v-layout>

            <v-layout align-center pa-3 style="margin-bottom:25px">
                <v-flex xs6 md6>
                   
                        <v-text-field
                        v-model="answer3"
                        label="Veuillez entrer une troisième proposition"
                        name="answer3"
                        prepend-icon="mdi-numeric-3-circle-outline"
                        color="#6B4EE0"
                        type="text"></v-text-field>
                  
                </v-flex>
            </v-layout>

            <v-layout align-center pa-3 style="margin-bottom:25px">
                <v-flex xs6 md6>
                   
                        <v-text-field
                        v-model="answer4"
                        label="Veuillez entrer une quatrième proposition"
                        name="answer4"
                        prepend-icon="mdi-numeric-4-circle-outline"
                        color="#6B4EE0"
                        type="text"></v-text-field>
                   
                </v-flex>
            </v-layout>

        </v-card>
        
      </v-flex>
      
    </v-layout>
        <v-layout column align-center style="margin-bottom:25px">
            <v-flex xs12 md12 >
                <v-btn class="white--text" color="#6B4EE0" > Valider </v-btn>
            </v-flex>
        </v-layout>
    </v-form>
  </v-container>
  
</template>

<script>
export default {
    name:"QuestionCreation",
    data() {
        return{
        answer1:"",
        answer2:"",
        answer3:"",
        answer4:"",
        categories: [
            'Histoire','Géographie','Langues','Cinéma','Art','Littérature','Jeux vidéo','Sport','Sciences','Musique','Enfants','Divers'
        ],
        reponses: [
            "Réponse n°1","Réponse n°2","Réponse n°3","Réponse n°4"
            //todo: liste dynamique pour afficher les réponses des emplacement answer1, answer2, answer3 et answer4
        ]
    }
    },
    methods:{

    }
}
</script>


