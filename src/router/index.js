import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchView from '../views/SearchView.vue'
import QuizView from '../views/QuizView.vue'

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
        path: '/search',
        name: 'search',
        component: SearchView,
        meta: {
            title: "Rechercher - Trivla"
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