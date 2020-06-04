import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import 'firebase/database'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user=payload
    }
  },
  actions: {
    signUserUp ({commit}, payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id : user.user.uid,
            email : payload.email,
            pseudo : payload.pseudo
          }
          commit('setUser', newUser),
          firebase.database().ref('/users/' + user.user.uid).set(newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id : user.user.uid,
            email: payload.email,
            pseudo : firebase.database().ref('/users').child(user.user.uid).pseudo
          }
          commit('setUser', newUser),
          console.log(user),
          console.log(firebase.database().ref('/users').child(user.user.uid).val().pseudo)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    }
  },
  modules: {
  },
  getters: {
    user(state){
      return state.user
    }
  }
})
