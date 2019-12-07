import Vue from 'vue';
const header = () => import(/* webpackChunkName: "components" */ '../components/Header');
// const footer = () => import(/* webpackChunkName: "components" */ '../components/Footer');
Vue.component('Header', header);
// Vue.component('Footer', footer);
