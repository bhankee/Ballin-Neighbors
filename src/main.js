import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import * as firebase from 'firebase';
import router from './router';
import { store } from './store';
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert.vue';

Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD6IDp05p3-Bs-rdcRv3M3YV3HdaIDN_ps',
      authDomain: 'ballin-neighbors.firebaseapp.com',
      databaseURL: 'https://ballin-neighbors.firebaseio.com',
      projectId: 'ballin-neighbors',
      storageBucket: 'ballin-neighbors.appspot.com',
      messagingSenderId: '212027331627'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadAllTeams');
  }
});
