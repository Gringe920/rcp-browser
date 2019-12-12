import Vue from 'vue';
const header = () => import(/* webpackChunkName: "components" */ '../components/Header');
const footer = () => import(/* webpackChunkName: "components" */ '../components/Footer');
const Search = () => import(/* webpackChunkName: "components" */ '../components/Search');
const msg = () => import(/* webpackChunkName: "components" */ '../components/Msg');
Vue.component('Header', header);
Vue.component('Footer', footer);
Vue.component('Msg', msg);
Vue.component('Search', Search);
