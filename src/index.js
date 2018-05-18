import find from 'lodash/find';

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

    return {
        name,
        props: {
            minimum: {
                default: 1
            },
            maximum: {
                default: 999
            },
            // Coming soon
            /*valueClone: {
                default: false
            },*/
            /*dataClone: {
                default: false
            },*/
            /*deepClone: {
                default: false
            },*/
        },
        data() {
            return {
                renderData: []
            }
        },
        mounted() {
            for (let i = 0; i < this.minimum; i++) this.renderData.push({index: i, _hash: uniqId()});
        },
        beforeDestroy() {},
        render: function (h) {
            let _this = this;
            let vNodes = _this.$slots.default;

            if (!vNodes || vNodes.length > 1) {
                console.error('VueCloneya default slot should contain exactly one root element.');
                return;
            }

            /*let elIndex = null;
            // Add Event listener to buttons
            const deepMap = function (el) {
                if (el.tag === undefined) return;

                if (el.data && el.data.hasOwnProperty('directives')) {
                    let addBtnListener = find(el.data.directives, {'name': 'cloneya-add-btn'});
                    let removeBtnListener = find(el.data.directives, {'name': 'cloneya-remove-btn'});

                    if (addBtnListener) {
                        el.data['on'] = {
                            click: _this.add
                        };

                        return;
                    }

                    if (removeBtnListener) {
                        el.data['attrs']['index'] = elIndex;

                        el.data['on'] = {
                            click: _this.del
                        };
                        return;
                    }
                }

                if (el.hasOwnProperty('children') && el.children) {
                    return el.children.map(deepMap);
                }
            };
            */

            function deepCloneInject(vnodes, index, createElement) {
                // console.log(index);

                function cloneVNode (vnode) {
                    // Inject events and values
                    let vdata = {...vnode.data};
                    console.log(vdata);

                    if (vnode.data && vnode.data.hasOwnProperty('directives')) {
                        let addBtnListener = find(vnode.data.directives, {'name': 'cloneya-add-btn'});
                        let removeBtnListener = find(vnode.data.directives, {'name': 'cloneya-remove-btn'});
                        let input = find(vnode.data.directives, {'name': 'cloneya-input'});

                        if (addBtnListener) {
                            vdata['on'] = {
                                click: _this.add
                            };
                        }

                        if (removeBtnListener) {
                            //console.log(vnode.data['attrs']);

                            vdata['attrs']['index'] = index;

                            vdata['on'] = {
                                click: _this.del
                            };
                        }

                        if (input) {
                            vdata['attrs']['value'] = index;
                        }
                    }

                    vnode.data = vdata; // vdata;

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
            }

            return h('div', {
                    class : {
                        'clone-wrapper': true
                    }
                },
                this.renderData.map(function (el, index, ctx){
                    //elIndex = index;

                    //let vNodeCloned = vNodes[0]; //deepClone(vNodes, h)[0];

                    //let vNodesC = deepClone(vNodes, h);
                    //console.log(vNodesC);
                    //console.log(vNodeCloned);

                    //vNodeCloned.children.map(deepMap);

                    let nodes = deepCloneInject(vNodes, index, h);

                   // console.log(el._hash);

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
                if (this.renderDatalength() === this.maximum) return;

                this.renderData.push({index: this.renderData.length, _hash: uniqId()});
            },
            del(event) {
                if (this.renderDatalength() === this.minimum) return;

                let el = event.currentTarget;

                console.log(el.attributes.index.value);

                this.renderData.splice(el.attributes.index.value, 1);
            },
            renderDatalength() {
                return this.renderData.filter(el => el !== undefined).length;
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

    Vue.directive('cloneyaAddBtn', function (el) {
        el.classList.add('vcloneya-add-btn');
    });

    Vue.directive('cloneyaRemoveBtn', function (el) {
        el.classList.add('vcloneya-remove-btn');
    });
};

export default install;