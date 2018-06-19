import {uniqId, hasDirective} from './utils';
import installDirectives from './directives';

export const createCloneYa = (opts = {}) => {
    const name = opts.name || 'VueCloneya';

    return {
        name,
        props: {
            multiple: {
                default: false
            },
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
                    // Inject events and values
                    if (vnode.data && vnode.data.hasOwnProperty('directives')) {
                            let addBtnListener = hasDirective(vnode.data.directives, 'name', 'cloneya-add') !== -1;
                            let removeBtnListener = hasDirective(vnode.data.directives, 'name', 'cloneya-remove') !== -1;
                            let input = hasDirective(vnode.data.directives, 'name', 'cloneya-input');
                            let element = {
                                on: {...vnode.data['on']},
                                attrs: {...vnode.data['attrs']},
                                domProps: {}
                            };

                            if (addBtnListener) {
                                element.on['click'] = _this.add
                            } else if (removeBtnListener) {
                                element.attrs['index'] = payload.index;
                                element.on['click'] = _this.del;
                            }

                            // On input value
                            if (input !== -1) {
                                element.on['input'] = function (event) {
                                    _this.updateData(payload.index, event.target.value, vnode.data.directives[input].value);
                                };

                                if (payload.el.hasOwnProperty('value') || (_this.multiple && Object.keys(payload.el.value).length !== 0)) {
                                    // Set value
                                    element.domProps['value'] = _this.multiple ?
                                                                payload.el.value[vnode.data.directives[input].value] :
                                                                payload.el.value;
                                }
                            }

                        vnode.data = {...vnode.data, ...element};
                    }

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

                this.pushEmptyElement();
                this.emitData();
            },
            del(event) {
                let index = event.currentTarget.attributes.index.value;

                if (this.renderData.length === this.minimum) {
                    this.$set(this.renderData, index, {_hash: uniqId()});
                    return this.emitData();
                }

                this.renderData.splice(index, 1);
                this.emitData();

            },
            pushEmptyElement() {
                // Pushes element with empty value and hash
                let temp = {_hash: uniqId()};

                if (this.multiple) temp['value'] = {};

                this.renderData.push(temp);
            },
            updateData(index, value, key) {
                if (this.multiple && key) {
                    this.$set(this.renderData[index].value, key, value);
                    this.emitData();

                    return;
                }

                this.$set(this.renderData[index], 'value', value);
                this.emitData();
            },
            emitData() {
                this.emitting = true;
                this.$emit('input', this.getFilteredValues());
                this.$nextTick(() => {
                    this.emitting = false;
                });
            },
            fillToMin() {
                let len = this.minimum - this.renderData.length;

                for (let i = 0; i < len; i++) {
                    this.pushEmptyElement();
                }
            },
            fillWithValues() {
                this.value.map(item => {
                    return this.renderData.push({_hash: uniqId(), value: item});
                });
            },
            getFilteredValues() {
                return this.renderData.map((data) => {
                    if (!data.hasOwnProperty('value')) return "";

                    return data.value;
                });
            }
        },
        watch: {
            value: function() {
                if (this.emitting) return;

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

    installDirectives();
};

export default install;