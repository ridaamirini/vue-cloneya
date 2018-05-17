<template>
    <div>
        <vue-cloneya>
            <div class="col-md-8">
                <div class="input-group m-t-10 toclone cloneya">
                    <input type="text" id="phone" name="phone[]" class="form-control p-l-0" placeholder="Telefon" value="" required="" v-cloneya-input>
                    <span class="input-group-btn" slot="action">
                        <button type="button" class="btn btn-success clone" tabindex="-1" v-cloneya-add-btn><i class="fa fa-plus"></i></button>
                        <button type="button" class="btn btn-danger delete" tabindex="-1" v-cloneya-remove-btn><i class="fa fa-minus"></i></button>
                    </span>
                </div>
            </div>
        </vue-cloneya>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>

</style>