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
                                    <b-form slot-scope="{ validate }" @submit.prevent="validate().then(login)" >
                                        <ValidationProvider rules="required|email" name="Email">
                                            <b-form-group
                                                    slot-scope="{ valid, errors }"><b-form-input
                                                    type="email"
                                                    v-model="formemail"
                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                    placeholder="Email ..."
                                                    addon-left-icon="ni ni-email-83">
                                            </b-form-input>
                                                <b-form-invalid-feedback >
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
                                                        placeholder="Mot de passe ...">
                                                </b-form-input>
                                                <b-form-invalid-feedback id="inputLiveFeedback">
                                                Password is required
                                                </b-form-invalid-feedback>
                                            </b-form-group>
                                        </ValidationProvider>

                                        <div class="text-center">
                                            <button  type="connexion" @click="login()" style="text-transform: none;" class="btn btn-card-primary btn-icon">
                                                Login
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

    import Alerts from "~/components/common/Alerts";
    import Header from "~/components/common/Header";

    import { ValidationObserver, ValidationProvider } from 'vee-validate';

    export default {
        components: {
Header,
            Alerts,
            ValidationObserver,
            ValidationProvider
        },
        data() {
            return {
                formemail: '',
                formpassword: '',
                formrememberme: false,
                formError: null,
                submitStatus: null,
                alertmessage:'',
                variant:'',
                dismissSecs: 5,
                dismissCountDown: 0,
            }
        },
        middleware : 'notAuthenticated',

        methods: {
            showAlert(message, variant) {
                this.dismissCountDown = this.dismissSecs
                this.alertmessage= message
                this.variant = variant
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            async login() {
                let vm = this

                this.loading = true
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.formemail,
                            password: this.formpassword,
                            rememberMe : this.formrememberme
                        }
                    }).then(function(response) {
                        console.log('Auth Success')
                        console.log(vm.$auth)
                        console.log(vm.$auth.loggedIn)
                    })
                } catch (e) {
                    console.log(e)
                    this.showAlert('Email ou Mot de passe incorrecte', 'danger');



                }
                this.loading = false
            }
        },
        computed: {
            // user() {
            //     if (this.$store.getters['loggedIn']) {
            //         return this.$store.state.user ? this.$store.state.user : null
            //     }
            // }
        },
    };
</script>
<style>
    button[type=connexion] {
        width: 100%;
        background-color: #c8da53;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .columns {
        margin-left: -.75rem;
        margin-right: -.75rem;
        margin-top: 5.25rem;
    }
    a {
        color: #5e72e4;
        text-decoration: none;
        background-color: transparent;
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
