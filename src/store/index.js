import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
    ]
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
            id : user.uid
          }
          commit('setUser', newUser)
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
    }
  }
})
