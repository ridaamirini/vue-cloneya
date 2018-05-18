export const createCloneYa = (opts = {}) => {
    const name = opts.name || 'VueCloneya';

    const uniqId = function() {
        let alp = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let length = 8;
        let rtn = '';

        for (let i = 0; i < length; i++) {
            rtn += alp.charAt(Math.floor(Math.random() * alp.length));
        }

        return rtn;
    };

    const hasDirective = function (haystack, key, value) {
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i][key] === value) {
                return true;
            }
        }

        return false;
    };

    return {
        name,
        props: {
            minimum: {
                default: 1
            },
            maximum: {
                default: 999
            },
            value: {
                default: null,
                type: Array
            }
        },
        data() {
            return {
                renderData: []
            }
        },
        mounted() {
            if (this.value) {
                this.fillWithValues();
            }

            this.fillToMin();
        },
        render: function (h) {
            let _this = this;
            let vNodes = _this.$slots.default;

            if (!vNodes || vNodes.length > 1) {
                console.error('VueCloneya default slot should contain exactly one root element.');
                return;
            }

            const deepCloneInject = function (vnodes, payload, createElement) {
                function cloneVNode(vnode) {
                    let vdata = {...vnode.data};

                    // Inject events and values
                    if (vnode.data && vnode.data.hasOwnProperty('directives')) {
                        let addBtnListener = hasDirective(vnode.data.directives, 'name', 'cloneya-add');
                        let removeBtnListener = hasDirective(vnode.data.directives, 'name', 'cloneya-remove');
                        let input = hasDirective(vnode.data.directives, 'name', 'cloneya-input');

                        if (addBtnListener) {
                            vdata['on'] = {
                                click: _this.add
                            };
                        }

                        if (removeBtnListener) {
                            vdata['attrs'] = {...vdata.attrs, index: payload.index};
                            vdata['on'] = {
                                click: _this.del
                            };
                        }

                        if (input && payload.el.hasOwnProperty('value')) {
                            vdata['attrs'] = {...vdata.attrs, value: payload.el.value};
                        } else if (input && vdata['attrs'].hasOwnProperty('value')) {
                            // Clear old value from clone
                            let clone = {...vdata.attrs};
                            delete clone.value;
                            vdata['attrs'] = {...clone};
                        }
                    }

                    vnode.data = vdata;

                    const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode));
                    const cloned = createElement(vnode.tag, vnode.data, clonedChildren);

                    cloned.text = vnode.text;
                    cloned.isComment = vnode.isComment;
                    cloned.componentOptions = vnode.componentOptions;
                    cloned.elm = vnode.elm;
                    cloned.context = vnode.context;
                    cloned.ns = vnode.ns;
                    cloned.isStatic = vnode.isStatic;
                    cloned.key = vnode.key;

                    return cloned;
                }

                return vnodes.map(vnode => cloneVNode(vnode));
            };

            return h('div', {
                    class : {
                        'clone-wrapper': true
                    }
                },
                this.renderData.map(function (el, index){
                    let nodes = deepCloneInject(vNodes, {el, index}, h);

                    return h('div', {
                            key: el._hash,
                            class: {
                                'toClone': true
                            }
                        },
                        [
                            nodes
                        ]
                    );
                })
            )
        },
        methods: {
            add(){
                if (this.renderData.length === this.maximum) return;

                this.renderData.push({_hash: uniqId()});
            },
            del(event) {
                let index = event.currentTarget.attributes.index.value;

                if (this.renderData.length === this.minimum) {
                    return this.$set(this.renderData, index, {_hash: uniqId()});
                }

                this.renderData.splice(index, 1);
            },
            fillToMin() {
                let len = (this.minimum - this.renderData.length);

                for (let i = 0; i < len; i++) {
                    this.renderData.push({_hash: uniqId()});
                }
            },
            fillWithValues() {
                this.value.map(item => {
                    return this.renderData.push({_hash: uniqId(), value: item});
                });
            }
        },
        watch: {
            value: function() {
                this.renderData = [];
                this.fillWithValues();
                this.fillToMin();
            },
            renderData: function(data) {
                if (data.length === this.minimum) this.$emit('minimum:cloneya');
                if (data.length === this.maximum) this.$emit('maximum:cloneya');
            }
        }
    }
};

export const install = (Vue, opts) => {
    const Component = createCloneYa(opts);
    Vue.component(Component.name, Component);

    Vue.directive('cloneyaInput', function (el) {
        el.classList.add('vcloneya');
    });

    Vue.directive('cloneyaAdd', function (el) {
        el.classList.add('vcloneya-add');
    });

    Vue.directive('cloneyaRemove', function (el) {
        el.classList.add('vcloneya-remove');
    });
};

export default install;