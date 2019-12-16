import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const Trade = () => import(/* webpackChunkName: "Trade" */ './views/trade/index.vue');
const accountsExplorer = () => import(/* webpackChunkName: "Trade" */ './views/accountsExplorer/index.vue');
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export default new Router({
    mode: (/file/gi.test(location.href)) ? 'hash' : process.env.NODE_ENV === 'production' ? 'hash' : 'history' ,
    base: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
    routes: [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/accountsExplorer',
        name: 'accountsExplorer',
        component: accountsExplorer,
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade
    }
]
})