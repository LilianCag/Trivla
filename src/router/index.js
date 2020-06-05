import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../components/users/SignIn.vue'
import SignUp from '../components/users/SignUp.vue'
import QuestionCreation from '../views/QuestionCreation.vue'
import Error404 from '../components/404.vue'
import QuizView from '../views/QuizView.vue'
import UserProfile from '../components/users/UserProfile.vue'

Vue.use(VueRouter);

const routes = [

    
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: "Bienvenue sur Trivla - Trivla"
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: UserProfile,
        meta: {
            title: "Profil - Trivla"
        }
    },
    {
        path: '/connexion',
        name: 'connexion',
        component: SignIn,
        meta: {
            title: "Connexion - Trivla"
        }
    },  
    {
        path: '/createaccount',
        name: 'createaccount',
        component: SignUp,
        meta: {
            title: "Créer un compte - Trivla"
        }
    },
    {
        path: '/createquestion',
        name: 'createaquestion',
        component: QuestionCreation,
        meta: {
            title: "Soumettre une question - Trivla"
        },
    },
    {
        path: '*',
        name: '404',
        component: Error404,
        meta:
        {
          title: "Error 404 - Page not found " 
        }
    },
    {
        path: '/quiz',
        name: 'quiz',
        component: QuizView,
        meta: {
            title: "Quiz (en test) - Trivla"
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next(next);
})

export default router