import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import 'firebase/database'



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
    createQuestion(state, payload) {
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
              pseudo: payload.pseudo,
              score: 0,
              nbGames: 0
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
              //console.log(snapshot.val().pseudo)
              const newUser = {
                id: snapshot.val().id,
                email: user.user.email,
                pseudo: snapshot.val().pseudo,
                score: snapshot.val().score,
                nbGames: snapshot.val().nbGames
              }
              commit('setUser', newUser)
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
      })
        .catch(
          error => {
            console.log(error)
          }
        )
      commit('setUser', null)
    },
    //Créé une question et la stocke dans la bdd
    createQuestion({ commit }, payload) {
      const question = {
        author: payload.author,
        title: payload.title,
        answers: payload.answers,
        correctAnswer: payload.correctAnswer,
        category: payload.category,
        likes: payload.likes,
        dislikes: payload.dislikes,
        nbPlayed: payload.nbPlayed,
        peopleAnswers: payload.peopleAnswers,
        date: payload.date
      }
      //Stockage dans firebase
      firebase.database().ref('/questions/' + question.category).push(question)
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
    loadQuestions({ commit }, cat) {
      commit('setLoading', true)
      if (cat === "Général") {
        commit('setLoadedQuestions',[])
        const categories = ["Histoire", "Géographie", "Langues", "Cinéma", "Art", "Littérature", "Jeux vidéo", "Sport", "Sciences", "Musique", "Enfants"]
        let index = -1
        for (let i = 0; i < 10; i++) {
          index = Math.floor((Math.random() * categories.length))
          firebase.database().ref('/questions/' + categories[index]).once('value')
            .then((data) => {
              const questions = []
              const obj = data.val()
              const ids = Object.keys(obj)
              let indexList = []
              let index = -1
              let key = ""
              index = Math.floor((Math.random() * ids.length))
              key = ids[index]


              indexList.push(index)
              questions.push({
                id: key,
                author: obj[key].author,
                title: obj[key].title,
                answers: obj[key].answers,
                correctAnswer: obj[key].correctAnswer,
                category: obj[key].category,
                likes: obj[key].likes,
                dislikes: obj[key].dislikes,
                nbPlayed: obj[key].nbPlayed,
                people: obj[key].people,
                date: obj[key].date
              })
              commit('createQuestion', questions[0])
              commit('setLoading', false)
            })

        }
      }
      else {
        firebase.database().ref('/questions/' + cat).once('value')
          .then((data) => {
            const questions = []
            const obj = data.val()
            const ids = Object.keys(obj)
            let indexList = []
            let index = -1
            let key = ""
            for (let i = 0; i < 10; i++) {
              if (i < ids.length) {
                if (index == -1) {
                  index = Math.floor((Math.random() * ids.length))
                  key = ids[index]
                }
                else {
                  while (indexList.includes(index)) {
                    index = Math.floor((Math.random() * ids.length))
                    key = ids[index]
                  }
                }

                indexList.push(index)
                questions.push({
                  id: key,
                  author: obj[key].author,
                  title: obj[key].title,
                  answers: obj[key].answers,
                  correctAnswer: obj[key].correctAnswer,
                  category: obj[key].category,
                  likes: obj[key].likes,
                  dislikes: obj[key].dislikes,
                  nbPlayed: obj[key].nbPlayed,
                  people: obj[key].people,
                  date: obj[key].date
                })
              }
            }
            commit('setLoadedQuestions', questions)
            commit('setLoading', false)
          })
          .catch(
            (error) => {
              console.log(error)
              commit('setLoading', true)
            }
          )

      }

    },

    autoSignIn({ commit }, payload) {
      firebase.database().ref('/users').child(payload.uid).once("value", function(snapshot) {
              commit('setUser', { id: snapshot.val().id, email: snapshot.val().email, pseudo: snapshot.val().pseudo, score: snapshot.val().score, nbGames: snapshot.val().nbGames})
          })
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
    loadedQuestion(state) {
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
