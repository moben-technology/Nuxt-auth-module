<template>
    <div>
        <section class="section section-shaped section-lg my-5">
            <div class="container pt-lg-md">
                <div class="row justify-content-center">
                    <div class="col-lg-5">

                            <template>

                                <b-alert
                                        :show="dismissCountDown"
                                        dismissible
                                        :variant="variant"
                                        @dismissed="dismissCountDown=0"
                                        @dismiss-count-down="countDownChanged"
                                >
                                    {{alertmessage}}
                                </b-alert>
                                <ValidationObserver ref="observer">
                                    <b-form slot-scope="{ validate }" @submit.prevent="validate().then(signup)">
                                        <ValidationProvider rules="required|email" name="Email">
                                            <b-form-group
                                                    slot-scope="{ valid, errors }"
                                            >

                                                <b-form-input
                                                        type="email"
                                                        v-model="formemail"
                                                        :state="errors[0] ? false : (valid ? true : null)"
                                                        placeholder="Email .."
                                                        addon-left-icon="ni ni-email-83">
                                                </b-form-input>
                                                <b-form-invalid-feedback>
                                                    Email is required
                                                </b-form-invalid-feedback>

                                            </b-form-group>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required" name="Password" vid="password">
                                            <b-form-group
                                                    slot-scope="{ valid, errors }">
                                                <b-form-input
                                                        class="mb-3"
                                                        type="password"
                                                        v-model="formpassword"
                                                        :state="errors[0] ? false : (valid ? true : null)"
                                                        placeholder="Password ..">
                                                </b-form-input>
                                                <b-form-invalid-feedback>
                                                    Password required
                                                </b-form-invalid-feedback>
                                            </b-form-group>
                                        </ValidationProvider>

                                        <div class="text-center">
                                            <button block type="submit"
                                                    class="btn btn-card-primary btn-icon"
                                                    style="text-transform: none;"
                                                    :disabled="submitStatus === 'PENDING'">Register
                                            </button>

                                        </div>
                                    </b-form>
                                </ValidationObserver>

                            </template>


                    </div>
                </div>
            </div>

        </section>
    </div>
</template>
<script>

    import {ValidationObserver, ValidationProvider} from 'vee-validate';


    export default {
        components: {
            ValidationObserver,
            ValidationProvider
        },


        middleware: 'notAuthenticated',

        data() {
            return {
                formError: null,
                formemail: '',
                formpassword: '',
                formrole: '',
                alertmessage: '',
                variant: '',
                dismissSecs: 5,
                dismissCountDown: 0,


            }
        },
        methods: {
            showAlert(message, variant) {
                this.dismissCountDown = this.dismissSecs
                this.alertmessage = message
                this.variant = variant
            },
            async signup() {
                let vm = this
                try {
                    await this.$store.dispatch('signup', {

                        email: this.formemail,
                        password: this.formpassword,
                        userType: this.formtype,
                        roles: [""],
                        }).then(() => {
                        this.$auth.loginWith('local', {
                                data: {
                                    email: this.formemail,
                                    password: this.formpassword,
                                    rememberMe: false
                                }
                            }
                        )
                    }).then(function (response) {
                        console.log('Auth Success')
                        console.log(vm.$auth)
                        console.log(vm.$auth.loggedIn)
                        vm.$router.push('/')
                    }),


                    this.formemail = ''
                    this.formpassword = ''
                    this.formtype = ''
                    this.formrole = ''
                    this.formError = null
                } catch (e) {
                    this.formError = e.message

                    if (e.response.status === 400) {

                        this.showAlert('email already exist', 'danger');

                    } else if (e.response.status === 500) {
                        this.showAlert('server error', 'danger');


                    }
                }


            },


        },
        computed: {
            user() {
                if (this.$auth.$state.loggedIn) {
                    return this.$auth.state.user.user ? this.$auth.state.user.user : null
                }
            },
        },


    };
</script>
<style>
    button[type=submit] {
        width: 100%;
        background-color: #c8da53;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .error-form {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 0;
        background-color: transparent;
        padding-left: 0;
    }

    .custom-small {
        color: #444;
        font-size: 0.8rem;
    }
</style>
