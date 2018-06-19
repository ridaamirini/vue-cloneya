const directives = {
    cloneyaInput: function (el) {
        el.classList.add('vcloneya');
    },
    cloneyaAdd: function (el) {
        el.classList.add('vcloneya-add');
    },
    cloneyaRemove: function (el) {
        el.classList.add('vcloneya-remove');
    }
};


export const installDirectives = (Vue) => {
    for (let name in directives) Vue.directive(name, directives[name]);
};

export default installDirectives;