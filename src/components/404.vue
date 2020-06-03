<template>
  <v-container>
    <v-layout fluid mt-5>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <v-card
          flat
        >
            <v-layout align-center justify-center row  pa-3 style="margin-bottom:150px">
                <v-flex xs12 md8>
                <p style="font-size:48px;color:#4E2CD8">Erreur 404 </p>
                <p
                    style="font-size:32px;color:#4E2CD8"
                >La page que vous recherchez n'est pas disponible ou n'existe pas ! ¯\_(ツ)_/¯</p>

                </v-flex>
                
            </v-layout>
            
            <v-layout align-center justify-center>
                <img
                    src="../assets/logo-trivla_violet.png"
                    width="300"
                    @click="goToHome"
                />
            </v-layout>
           
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
    methods: {
    //Renvoie vers l'accueil
        goToHome(){
            this.$router.push("/");
        }
    }
}
</script>


