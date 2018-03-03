import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedTeams: [
      {
        id: 'afajfjadfaadfa323',
        teamName: 'Whitehall Magic',
        sport: 'Basketball',
        players: ['Brad', 'Owen'],
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        id: 'aadsfhbkhlk1241',
        teamName: 'Blazers',
        sport: 'Basketball',
        players: ['Brad', 'Angel'],
        location: 'Paris',
        description: "It's Paris!"
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
    loadAllTeams({ commit }) {
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
              players: obj[key].players,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            });
          }
          console.log('ACTIONS LOADALLTEAMS FIRED!');
          commit('setLoadedTeams', teams);
          commit('setLoading', false);
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    createTeam({ commit, getters }, payload) {
      const team = {
        teamName: payload.teamName,
        location: payload.location,
        players: payload.players,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      };
      firebase
        .database()
        .ref('teams')
        .push(team)
        .then(data => {
          const key = data.key;
          commit('createTeam', {
            ...team,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    /*----------------------------------------
      USE TO PUSH PLAYERS TO PLAYERS ARRAY
    ----------------------------------------*/
    addPlayers({ commit, getters }, payload) {
      console.log('PAYLOAD: ' + JSON.stringify(payload, null, 4));
      const player = {
        players: payload.players
      };
      firebase
        .database()
        .ref('teams')
        .push(player)
        .then(data => {
          const key = data.key;
          commit('addPlayers', {
            ...team.players,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    signUserUp({ commit }, payload) {
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
    signUserIn({ commit }, payload) {
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
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredTeams: [] });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    clearError({ commit }) {
      commit('clearError');
    }
  },
  getters: {
    loadedTeams(state) {
      return state.loadedTeams.sort(teams => {
        console.log('GETTER TEAMS: ' + JSON.stringify(teams, null, 4));
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
