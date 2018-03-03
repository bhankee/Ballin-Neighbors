<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/teams" class="info">Ballin Neighbors</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/team/new" class="info">Organize Team</v-btn>
      </v-flex>
    </v-layout>
    <!--<v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>-->
   
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>GROWING YOUR NEIGHBORHOOD!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {},
  methods: {}
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
