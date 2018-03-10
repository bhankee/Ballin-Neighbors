import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedTeams: [{
        id: 'afajfjadfaadfa323',
        teamName: 'Whitehall Magic',
        sport: 'Basketball',
        players: 'Brad',
        location: 'New York'
      },
      {
        id: 'aadsfhbkhlk1241',
        teamName: 'Blazers',
        sport: 'Basketball',
        players: 'Brad',
        location: 'Paris'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedTeams(state, payload) {
      state.loadedTeams = payload;
    },
    updatePlayers(state, payload) {
      const team = state.loadedTeams.find(team => {
        team.id === payload.id
        console.log('mutations2: ' + payload);
        return team.players === payload.players
      });
      if (payload.players) {
        state.loadedTeams.players = payload.players;
      }
    },
    createTeam(state, payload) {
      state.loadedTeams.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    loadAllTeams({
      commit
    }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('teams')
        .once('value')
        .then(data => {
          // DATA IS THE DATA FROM FIREBASE AND DATA.VAL GIVES PORPERTIES ON OBJECTS OF DATA
          const teams = [];
          const obj = data.val();
          for (let key in obj) {
            teams.push({
              id: key,
              teamName: obj[key].teamName,
              sport: obj[key].sport,
              location: obj[key].location,
              players: obj[key].players,
              creatorId: obj[key].creatorId
            });
          }
          commit('setLoadedTeams', teams);
          commit('setLoading', false);
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    createTeam({
      commit,
      getters
    }, payload) {
      const team = {
        teamName: payload.teamName,
        location: payload.location,
        players: payload.players,
        creatorId: getters.user.id
      };
      let key;
      firebase
        .database()
        .ref('teams')
        .push(team)
        .then(data => {
          key = data.key;
          commit('createTeam', {
            teamName: payload.teamName,
            location: payload.location,
            players: payload.players,
            creatorId: getters.user.id,
            id: key
          });
          console.log('ID: ' + key);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    /*----------------------------------------
      USE TO PUSH PLAYERS TO PLAYERS ARRAY
    ----------------------------------------*/
    addPlayers({
      commit,
      getters
    }, payload) {
      let player = {};
      if (payload.players) {
        player = payload.players;
      }
      console.log('PLAYER: ' + JSON.stringify(player, null, 4));
      console.log('PAYLOAD: ' + JSON.stringify(payload, null, 4));
      firebase
        .database()
        .ref(`teams/${payload.id}/players`)
        //.child(payload)
        .push(player)
        .then(user => {
          commit('updatePlayers', {
            players: payload.players
          });
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it      
    },
    signUserUp({
      commit
    }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid,
            registeredTeams: []
          };
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    signUserIn({
      commit
    }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid,
            registeredTeams: []
          };
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    autoSignIn({
      commit
    }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredTeams: []
      });
    },
    logout({
      commit
    }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    clearError({
      commit
    }) {
      commit('clearError');
    }
  },
  getters: {
    loadedTeams(state) {
      return state.loadedTeams.sort(teams => {
        return teams;
      });
    },
    featuredTeams(state, getters) {
      return getters.loadedTeams.slice(0, 5);
    },
    loadedTeam(state) {
      return teamId => {
        return state.loadedTeams.find(team => {
          return team.id === teamId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
});
