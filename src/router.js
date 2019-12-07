import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const Trade = () => import(/* webpackChunkName: "Trade" */ './views/trade/index.vue');

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
        component: Home
    },{
        path: '/trade',
        name: 'trade',
        component: Trade
    }]
})