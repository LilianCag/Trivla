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
    updateUser(state, payload) {
      const user = state.user
      if (payload.email) {
        user.email = payload.email
      }
      if (payload.pseudo) {
        user.pseudo = payload.pseudo
      }
      if (payload.nbGames) {
        user.nbGames = payload.nbGames
      }
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
    /*
    * Fonction d'inscription
    */
    signUserUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              email: payload.email,
              pseudo: payload.pseudo,
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
    /*
    * Fonction de connexion
    */ 
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
    /*
    * Fonction de déconnexion
    */
    logoutUser({ commit }) {
      firebase.auth().signOut().then(function () {
      })
        .catch(
          error => {
            console.log(error)
          }
        )
      commit('setUser', null)
    },
    /*
    * Màj d'un utilisateur dans la bdd
    */ 
    updateUserData({ commit }, payload) {
      const updateObj = {}
      if (payload.email) {
        updateObj.email = payload.email
      }
      if (payload.pseudo) {
        updateObj.pseudo = payload.pseudo
      }
      if (payload.nbGames) {
        updateObj.nbGames = payload.nbGames + 1
      }
      firebase.database().ref('users').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateUser', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
    /*
    * Charge les questions
    */
    loadQuestions({ commit }, cat) {
      commit('setLoading', true)
      /*
      * Si la catégorie est Général on charge des questions venant de toutes catégories
      */ 
      if (cat === "Général") {
        commit('setLoadedQuestions', [])
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
                peopleAnswers: obj[key].peopleAnswers,
                date: obj[key].date
              })
              commit('createQuestion', questions[0])
              commit('setLoading', false)
            })

        }
      }
      /*
      * Sinon on charge des questions venant de la dîte catégorie
      */
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
                  peopleAnswers: obj[key].peopleAnswers,
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
    /*
    * Màj d'une question
    */
    updateQuestionData({ commit }, payload) {
      //Création d'un nouvel objet pour mettre à jour la bdd
      const updateObj = {}
      updateObj.author = payload.author
      updateObj.title = payload.title
      updateObj.answers = payload.answers
      updateObj.correctAnswer = payload.correctAnswer
      updateObj.category = payload.category
      updateObj.likes = payload.likes
      updateObj.dislikes = payload.dislikes
      updateObj.nbPlayed = payload.nbPlayed
      updateObj.peopleAnswers = payload.peopleAnswers
      updateObj.date = payload.date

      /* GESTION DE LA POPULARITE (J'aime/J'aime pas)
      * Une question sera supprimée si :
      * - il y a plus de 10 questions dans sa catégorie
      * & elle a obtenu plus de 10 avis
      * & son taux de dislikes dépasse 75 %
      */
      if (updateObj.likes + updateObj.dislikes > 10) { // Condition des 10 avis ici pour éviter la division par zéro
        firebase.database().ref('/questions/' + updateObj.category).once('value')
          .then(function (snapshot) {
            if ((((updateObj.dislikes / (updateObj.likes + updateObj.dislikes)) * 100) > 75)
              && snapshot.numChildren() > 10) {
              //Suppresion de la question
              firebase.database().ref('/questions/' + updateObj.category).child(payload.id).remove()
              .then(() => {
                commit('setLoading', false)
              })
              .catch(error => {
                console.log(error)
                commit('setLoading', false)
              }) 
            }
            else {
              //Màj dans la bdd
              firebase.database().ref('/questions/'+updateObj.category).child(payload.id).update(updateObj) 
                .then(() => {
                  commit('setLoading', false)
                })
                .catch(error => {
                  console.log(error)
                  commit('setLoading', false)
                })
            }
          })
      }
      else {
        //Màj dans la bdd
        firebase.database().ref('/questions/'+updateObj.category).child(payload.id).update(updateObj)
                .then(() => {
                  commit('setLoading', false)
                })
                .catch(error => {
                  console.log(error)
                  commit('setLoading', false)
                })
      }
    },
    autoSignIn({ commit }, payload) {
      firebase.database().ref('/users').child(payload.uid).once("value", function (snapshot) {
        commit('setUser', { id: snapshot.val().id, email: snapshot.val().email, pseudo: snapshot.val().pseudo, score: snapshot.val().score, nbGames: snapshot.val().nbGames })
      })
    }
  },
  modules: {
  },
  getters: {
    //Retourne l'utilisateur
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
    //Retourne l'état de chargement
    loading(state) {
      return state.loading
    },
    //Retourne l'erreur
    error(state) {
      return state.error
    },
    //Retourne la catégorie
    category(state) {
      return state.category
    }
  }
})
