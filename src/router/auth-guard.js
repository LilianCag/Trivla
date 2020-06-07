import store from '../store'

export default (to, from, next) => {

    if (to !== from) {
        if (store.getters.user == null) {
            setTimeout(function () {
                if (store.getters.user) {
                    next(next);
                }
                else {
                    next('/')
                }
            }, 2000)
        }
        else {
            next(next);
        }
    }
}