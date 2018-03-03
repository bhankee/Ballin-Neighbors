<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ team.teamName }}</h6>
          </v-card-title>
         
          <v-card-text>
            <div class="info--text">{{ team.location }}</div>
            
            <v-list>
              Players: 
              <v-list-tile two-line v-for="player in team.players">{{player}}
                
              </v-list-tile>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <form @submit.prevent="onAddPlayer">
            <v-text-field></v-text-field>
            <v-btn class="primary" type="submit">Add Player</v-btn>
            </form>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      players: ''
    };
  },
  computed: {
    team() {
      return this.$store.getters.loadedTeam(this.id);
    }
  },
  methods: {
    onAddPlayer() {
      const playerData = {
        players: this.players
      };
      this.$store.dispatch('addPlayers', playerData);

      this.$router.push('/teams');
    }
  }
};
</script>
