import Vue from 'vue';
import App from './App';
//import App from './AppMultipleInputs'; // Multiple Inputs Example
import VueCloneya from '../src';

Vue.use(VueCloneya);

new Vue({
    el: '#app',
    render: h => h(App)
});