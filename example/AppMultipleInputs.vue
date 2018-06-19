<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <h1 style="text-align: center; font-weight: bold;">{{ title }}</h1>
            </div>
        </div>
        <div class="row" style="padding: 30px;">
            <div class="col-md-6 col-md-offset-4">
                <div class="col-md-8">
                    <vue-cloneya :minimum="5"
                                 :multiple="true"
                                 v-model="exampleData"
                                 v-on:minimum:cloneya="alert('min')"
                                 v-on:maximum:cloneya="alert('max')">
                        <div style="margin-top: 10px;">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" placeholder="Name" v-cloneya-input="'Name'">
                            </div>

                            <div class="form-group">
                                <label>Name2</label>
                                <input type="text" class="form-control" placeholder="Name2" v-cloneya-input="'Name2'">
                            </div>

                            <div class="form-group">
                                <label>Street</label>
                                <input type="text" class="form-control" placeholder="Street" v-cloneya-input="'Street'">
                            </div>

                            <div class="form-group">
                                <label>Notes</label>
                                <textarea rows="5" class="form-control" placeholder="Leave a note in here" v-cloneya-input="'Notes'" ></textarea>
                            </div>

                            <span class="input-group-btn pull-right" style="margin: 10px;">
                                <button type="button" class="btn btn-success clonspan" tabindex="-1" v-cloneya-add><i class="fa fa-plus"></i></button>
                                <button type="button" class="btn btn-danger delete" tabindex="-1"  v-cloneya-remove><i class="fa fa-minus"></i></button>
                            </span>
                        </div>
                    </vue-cloneya>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "App",
        data: () => {
            return {
                title: 'Vue Cloneya',
                exampleData: [
                    {
                        Name: 'John',
                        Name2: 'Doe',
                        Street: 'Main Street',
                        Notes: 'Keep multiple active'
                    },
                    {},
                    {
                        Name: 'John2',
                        Name2: 'Doe2',
                        Street: 'Main Street2',
                        Notes: 'Keep multiple active2'
                    }
                ]
            }
        },
        mounted() {
            setTimeout(() => {
                // this.exampleData.reverse();
                // alert('Example data reversed');
            }, 5000);
        },
        methods: {
            alert(msg) {
               // alert(msg);
            }
        }
    }
</script>

<style scoped>

</style>