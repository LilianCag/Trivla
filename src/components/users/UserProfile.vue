<template>
<v-container class="my-5">
    <h1>Profil de DAVID</h1>

      <v-card flat class="pa-5" color="#E1DBF9">
        <v-layout row>
          <v-flex class="pa-5 ProfilePage">
            <v-avatar size="300">
              <img src="../../assets/David_GoodEnough2.png" alt="David" />
            </v-avatar>
          </v-flex>

          <v-flex pa-5>
            <v-flex class="mb-3" xs12 md12 lg12>
              <span class="title"> Pseudo </span>
              <br/>
              <span class="infos">Pseudo de l'utilisateur </span>
            </v-flex>

            <v-flex class="mb-3" xs12 md12 lg12>
              <span class="title"> Mot De Passe </span>
              <br/>
              <span class="infos"> Mot de passe de l'utilisateur </span>
            </v-flex>

            <v-flex class="mb-3" xs12 md12 lg12>
              <span class="title"> Adresse Email </span>
              <br/>
              <span class="infos"> Adresse Email de l'utilisateur </span>
            </v-flex>

            <v-flex class="mb-3" xs12 md12 lg12>
              <span class="title"> Score </span>
              <br/>
              <span class="infos"> Score de l'utilisateur </span>
            </v-flex>

            <v-flex class="mb-3" xs12 md12 lg12>
              <span class="title"> Nombre de parties jouées </span>
              <br/>
              <span class="infos"> Nombre de parties jouées de l'utilisateur </span>
            </v-flex>
          </v-flex>

        </v-layout>
      </v-card>
    </v-container>

</template>

<script>
export default {};
</script>


<!-- CSS de la page -->
<style>
.profile {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}

h1 {
  text-align: center;
  margin-top: 1%;
  margin-bottom: 1%;
}

.ProfilePage {
  text-align: center;
}

.title {
  color:grey;
}

.infos {
  font-weight: bold;
}

</style>