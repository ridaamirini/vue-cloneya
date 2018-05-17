import find from 'lodash/find';
import cloneDeep from 'lodash/clone';

export const createCloneYa = (opts = {}) => {
    const name = opts.name || 'VueCloneya';

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
            for (let i = 0; i < this.minimum; i++) this.renderData.push({});
        },
        beforeDestroy() {},
        render: function (h) {
            let _this = this;
            let vNodes = _this.$slots.default;

            if (!vNodes || vNodes.length > 1) {
                console.error('VueCloneya default slot should contain exactly one root element.');
                return;
            }

            let elIndex = null;
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

            return h('div', {
                    class : {
                        'clone-wrapper': true
                    }
                },
                this.renderData.map(function (el, index, ctx){
                    elIndex = index;

                    let vNodeCloned = cloneDeep(vNodes)[0];
                    vNodeCloned.children.map(deepMap);

                    return h('div', {
                            key: index,
                            class: {
                                'toClone': true
                            }
                        },
                        [
                            vNodeCloned
                        ]
                    );
                })
            )
        },
        methods: {
            add(){
                if (this.renderDatalength() === this.maximum) return;

                this.renderData.push({});
            },
            del(event) {
                if (this.renderDatalength() === this.minimum) return;

                let el = event.currentTarget;
                let index = parseInt(el.getAttribute('index'));

                console.log(index);

                this.renderData.splice(index, 1);
                //delete this.renderData[index];
                //this.$forceUpdate();
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