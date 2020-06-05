import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDnTEZNJSwUZO_h5MHDp0ta4jIfHrRMl5I',
      authDomain: 'trivla.firebaseapp.com',
      databaseURL: 'https://trivla.firebaseio.com',
      projectId: 'trivla',
      storageBucket: 'trivla.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
      this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app')
