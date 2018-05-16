import Vue from 'vue';
import VueCloneya from './VueCloneya.vue';

Vue.directive('cloneya', function (el) {
    el.style.display = 'none';
    el.disabled = true; // To be ignored by submitting
});

module.exports = {
    install: function (Vue) {
        Vue.component('vue-cloneya', VueCloneya);
    }
};