import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import 'firebase/database'
import router from '../router'


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: null,
    loadedQuestions: [
      {
        id: 'aefroiurfeogi',
        title: 'Dans quel jeu Mario fait sa première apparition ?',
        answers: ['Mario Bros.', 'Donkey Kong', 'Space Invaders', 'Doki Doki Panic'],
        correctAnswer: 1
      },
      {
        id: 'oigusorigr',
        title: 'Quel est le nom de la princesse que Mario doit sauver ?',
        answers: ['Zelda', 'Samus', 'Harmonie', 'Peach'],
        correctAnswer: 3
      }
    ],
    loading: false,
    error: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    signUserUp({ commit }, payload) {
      commit('setLoading',true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading',false)
            const newUser = {
              id: user.user.uid,
              email: payload.email,
              pseudo: payload.pseudo
            }
            commit('setUser', newUser),
              firebase.database().ref('/users/' + user.user.uid).set(newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn({ commit }, payload) {
      commit('setLoading',true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading',false)
            firebase.database().ref('/users').child(user.user.uid).once("value", function (snapshot) {
              console.log(snapshot.val().pseudo)
              const newUser = {
                id: snapshot.val().id,
                email: user.user.email,
                pseudo: snapshot.val().pseudo
              }
              commit('setUser', newUser),
              router.push('/')
            })

          }
        )
        .catch(
          error => {
            commit('setLoading',false)
            commit('setError', error)
            console.log(error)
          }
        )
    }
  },
  modules: {
  },
  getters: {
    user(state) {
      return state.user
    },
    //Retourne les questions chargées
    loadedQuestions(state) {
      return state.loadedQuestions
    },
    //Retourne une question parmi les questions chargée par id
    loadedQuestion(state){
      return (questionId) => {
        return state.loadedQuestions.find((question) => {
          return question.id === questionId
        })
      }
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})
