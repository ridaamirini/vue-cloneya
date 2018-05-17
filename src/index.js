export const createCloneYa = (opts = {}) => {
    const name = opts.name || 'VueCloneya';

    return {
        name,
        props: {},
        data() {
            return {
                test: 'Hello World JSX!',
                renderData: [{}],
            }
        },
        mounted() {},
        beforeDestroy() {},
        render: function (h) {
            let _this = this;
            let vNodes = _this.$slots.default;

            console.log(vNodes);

            return h('div', {
                    class : {
                        'clone-wrapper': true
                    }
                },
                this.renderData.map(function (el, index, ctx){
                    console.log(index);

                        return h('div', {
                            key: index,
                            class: {
                                'toClone': true
                            },
                            on: {
                                click: _this.add
                            }
                        },
                        [
                            vNodes,
                            //button [-] :
                            //ctx.length > 1      ? h('input',  {attrs:{type:'button', value:'-', index: index}, on:{click:_this.del}} ) : null,
                            //button [+] :
                            //index==ctx.length-1 ? h('input',  {attrs:{type:'button', value:'+'}, on:{click:_this.add}} ): null
                        ]
                    )
                })
            )
        },
        methods: {
            add(){
                this.renderData.push({});
            },
            del(el){
                this.renderData.splice( el.srcElement.attributes.index.value , 1);
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