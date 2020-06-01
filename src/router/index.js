import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchView from '../views/SearchView.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: "Bienvenue sur Trivla"
        }
    },
    {
        path: '/search',
        name: 'search',
        component: SearchView,
        meta: {
            title: "Rechercher - Trivla"
        }
    }


];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router