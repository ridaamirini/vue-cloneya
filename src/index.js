export const createCloneYa = (opts = {}) => {
    const name = opts.name || 'VueCloneya';

    return {
        name,
        props: {},
        data() {
            return {
                test: 'Hello World JSX!'
            }
        },
        mounted() {},
        beforeDestroy() {},
        render(h) {
            returnh('div', {key : el, style : {width:'inherit'}},
                [
                    h('div', {style : {width:'80%', display:'inline'}}, vNodes),
                    //button [-] :
                    ctx.length > 1      ? h('input',  {attrs:{type:'button', value:'-', index : index}, on:{click:_this.del}} ) : null,
                    //button [+] :
                    index==ctx.length-1 ? h('input',  {attrs:{type:'button', value:'+'}, on:{click:_this.add}} ): null
                ]
            );
        },
        methods: {}
    }
};

export const install = (Vue, opts) => {
    const Component = createCloneYa(opts);
    Vue.component(Component.name, Component);
    /*Vue.directive('cloneya', function (el) {
        el.style.display = 'none';
        el.disabled = true; // To be ignored by submitting
    });*/
};

export default install;