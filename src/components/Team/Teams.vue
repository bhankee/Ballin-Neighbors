<template>
  <v-container>
    <v-layout row wrap v-for="team in teams" :key="team.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>              
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <!--mb-0 is margin-bottom-->
                   
                    <h4 class="white--text ">{{ team.teamName }}</h4>
                    <h5 class="white--text ">{{ team.sport }}</h5>                    
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/teams/' + team.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Team
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    teams() {
      return this.$store.getters.loadedTeams;
    }
  }
};
</script>
