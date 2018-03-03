<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Team</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateTeam">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="teamName"
                label="teamName"
                id="teamName"
                v-model="teamName"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required></v-text-field>
            </v-flex>
          </v-layout>         
         
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Create Team</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      teamName: '',
      location: '',
      players: ''
    };
  },
  computed: {
    formIsValid() {
      return this.teamName !== '' && this.location !== '';
    },

    methods: {
      onCreateTeam() {
        if (!this.formIsValid) {
          return;
        }
        const teamData = {
          teamName: this.teamName,
          location: this.location,
          players: this.players,
          date: this.submittableDateTime
        };
        this.$store.dispatch('createTeam', teamData);
        this.$router.push('/teams');
      }
    }
  }
};
</script>
