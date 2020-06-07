import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import 'firebase/database'
import router from '../router'


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: null,
    loadedQuestions: [],
    loading: false,
    error: null,
    category: ""
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    createQuestion (state, payload) {
      state.loadedQuestions.push(payload)
    },
    setLoadedQuestions(state, payload) {
      state.loadedQuestions = payload
    },
    setCategory(state, newCategory) {
      state.category = newCategory
    }
  },
  actions: {
    //Fonction d'inscription
    signUserUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
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
            console.log(error)
          }
        )
    },
    //Fonction de connexion
    signUserIn({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
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
            console.log(error)
          }
        )
    },
    //Fonction de déconnexion
    logoutUser({ commit }) {
      firebase.auth().signOut().then(function() {
        router.push('/') 
      })
      .catch(
        error => {
          console.log(error)
        }
      )
      commit('setUser',null)
    },
    //Créé une question et la stocke dans la bdd
    createQuestion ({commit}, payload) {
      const question = {
        author: payload.author,
        title: payload.title,
        answers: payload.answers,
        correctAnswer : payload.correctAnswer,
        category : payload.category
      }
      //Stockage dans firebase
      firebase.database().ref('questions').push(question)
        .then((data) => {
          const key = data.key
          commit('createQuestion', {
            ...question,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //Charge les questions
    loadQuestions({commit}, cat) {
      commit('setLoading',true)
      firebase.database().ref('questions').once('value')
        .then((data) => {
          const questions = []
          const obj = data.val()

          for (let key in obj) {
            if(obj[key].category == cat || cat == "Général"){
              questions.push({
              id: key,
              author: obj[key].author,
              title: obj[key].title,
              answers: obj[key].answers,
              correctAnswer: obj[key].correctAnswer,
              category: obj[key].category
            })
            }
            
          }
          commit('setLoadedQuestions', questions)
          commit('setLoading',false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading',true)
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
    },
    category(state) {
      return state.category
    }
  }
})
