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
              <v-list-tile two-line v-for="player in team.players">{{player.firstName + ' '+ player.lastName}}              
              </v-list-tile>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>           
            <template v-if='userIsCoach'>
              <form @submit.prevent="onAddPlayer">
              <v-text-field label="First Name" v-model="players.firstName"></v-text-field>   
              <v-text-field label="Last Name" v-model="players.lastName"></v-text-field>   
              <v-btn class="primary" type="submit">Add Player</v-btn>
              </form>
            </template>            
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
      players: {}
    };
  },
  computed: {
    team() {
      return this.$store.getters.loadedTeam(this.id);
    },
    playerlist() {
      return this.$store.getters.playerList(this.id);
    },

    userIsAuth() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCoach() {
      console.log('UserIsCoach');
      if (!this.userIsAuth) {
        return false;
      }
      return this.$store.getters.user.id === this.team.creatorId;
    }
  },
  methods: {
    // NEED TO PASS IN CURRENT PLAYERS HERE TO GET AS PAYLOAD IN STORE!
    onAddPlayer() {
      console.log('COMPUTED TEAM: ' + JSON.stringify(this.team, null, 4));

      if (this.players === '') {
        return;
      }
      const playerData = this.players;

      this.$store.dispatch('addPlayers', {
        players: playerData,
        id: this.team.id
      });
    }
  }
};
</script>
