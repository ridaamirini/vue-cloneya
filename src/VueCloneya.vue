<template>
    <div class="clone-wrapper">
        <div class="toclone" v-for="n of length">
            <div v-html="content"></div>
            <div class="clone">
                <button type="button" @click="add">Add</button>
            </div>
            <div class="delete">
                <button type="button" @click="remove">Remove</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VueCloneya",
        props: [
            'name'
        ],
        data: () => {
            return {
                min: 1,
                max: 5,
                length: 1,
                content: null
            }
        },
        created() {
            // Clone connected
            let el = this.$parent.$refs['placeholder'].cloneNode();
            el.removeAttribute('style');
            el.disabled = false;

            this.content = el.outerHTML;
        },
        methods: {
            add() {
                if (this.max === this.length) return;

                this.length++;
            },
            remove() {
                if (this.min === this.length) return;

                this.length--;
            }
        }
    }
</script>

<style scoped>

</style>