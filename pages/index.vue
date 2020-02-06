<template>
    <div>
        <section class="section section-shaped section-lg my-5">
            <div class="container pt-lg-md">
                <div class="row justify-content-center">
                    <div class="col-lg-12">

                        <b-alert
                                :show="dismissCountDown"
                                dismissible
                                :variant="variant"
                                @dismissed="dismissCountDown=0"
                                @dismiss-count-down="countDownChanged"
                        >
                            {{alertmessage}}
                        </b-alert>

                            <div class="small-12 columns"
                            >

                                <p class="margin-bottom">
                                    Update email : <em class="">{{$auth.user.user.email}}</em>
                                </p>
                                <ValidationObserver ref="observer">
                                    <b-form slot-scope="{ validate }" @submit.prevent="validate().then(ChangeEmail())">


                                        <div class="row ">
                                            <div class="form-group col-md-5 "
                                            >
                                                <ValidationProvider rules="required|email" name="Email">
                                                    <b-form-group
                                                            slot-scope="{ valid, errors }"
                                                    >

                                                        <b-form-input
                                                                type="email"
                                                                v-model="formemail"
                                                                :state="errors[0] ? false : (valid ? true : null)"
                                                                placeholder="New email"
                                                                addon-left-icon="ni ni-email-83">
                                                        </b-form-input>
                                                        <b-form-invalid-feedback>
                                                            Email required
                                                        </b-form-invalid-feedback>

                                                    </b-form-group>
                                                </ValidationProvider>
                                            </div>
                                            <div class="form-group col-md-5"
                                            >
                                                <ValidationProvider rules="required" name="Password" vid="password">
                                                    <b-form-group
                                                            slot-scope="{ valid, errors }">
                                                        <b-form-input
                                                                class="mb-3"
                                                                type="password"
                                                                v-model="formpassword"
                                                                :state="errors[0] ? false : (valid ? true : null)"
                                                                placeholder="Current password ..">
                                                        </b-form-input>
                                                        <b-form-invalid-feedback>
                                                            Password required
                                                        </b-form-invalid-feedback>
                                                    </b-form-group>
                                                </ValidationProvider>
                                            </div>


                                            <div class="medium-2 columns text-right">

                                                <button class="btn-sm btn btn-default"
                                                        style="border-bottom-color: #172b4d"
                                                        type="submit">Save
                                                </button>
                                            </div>
                                        </div>
                                    </b-form>
                                </ValidationObserver>
                            </div>
                        <br>


                            <div class="small-12 columns"
                            >

                                <p class="margin-bottom">
                                    Update password </p>
                                <ValidationObserver ref="observer">
                                    <b-form slot-scope="{ validate }"
                                            @submit.prevent="validate().then(changePassword())">


                                        <div class="row ">
                                            <div class="form-group col-md-5"
                                            >

                                                <ValidationProvider rules="required" name="currentPassword" vid="password">
                                                    <b-form-group
                                                            slot-scope="{ valid, errors }">
                                                        <b-form-input
                                                                class="mb-3"
                                                                type="password"
                                                                v-model="formcurrentPassword"
                                                                :state="errors[0] ? false : (valid ? true : null)"
                                                                placeholder="Current password ..">
                                                        </b-form-input>
                                                        <b-form-invalid-feedback>
                                                            Current password is required
                                                        </b-form-invalid-feedback>
                                                    </b-form-group>
                                                </ValidationProvider>


                                            </div>

                                            <div class="form-group col-md-5"
                                            >
                                                <ValidationProvider rules="required" name="currentPassword" vid="password">
                                                    <b-form-group
                                                            slot-scope="{ valid, errors }">
                                                        <b-form-input
                                                                class="mb-3"
                                                                type="password"
                                                                v-model="formNewPassword"
                                                                :state="errors[0] ? false : (valid ? true : null)"
                                                                placeholder="New password">
                                                        </b-form-input>
                                                        <b-form-invalid-feedback>
                                                            New password is required
                                                        </b-form-invalid-feedback>
                                                    </b-form-group>
                                                </ValidationProvider>


                                            </div>


                                            <div class="medium-2 columns text-right">
                                                <button class="btn-sm btn btn-default"
                                                        style="border-bottom-color: #172b4d"
                                                        type="submit">Save
                                                </button>
                                            </div>
                                        </div>

                                    </b-form>
                                </ValidationObserver>
                            </div>
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
            ValidationProvider,
        },
        middleware: 'authenticated',

        data() {
            return {
                formError: null,
                formpassword: '',
                formrepeatPassword: '',
                token: '',
                submitStatus: null,
                formcurrentPassword: '',
                formNewPassword: '',
                formemail: '',
                alertmessage: '',
                variant: '',
                dismissSecs: 5,
                dismissCountDown: 0,

            }
        },


        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert(message, variant) {
                this.dismissCountDown = this.dismissSecs
                this.alertmessage = message
                this.variant = variant
            },
            async ChangeEmail() {

                try {
                    await this.$store.dispatch('changeEmail', {

                        newEmail: this.formemail,
                        currentEmail: this.$auth.$state.user.user.email,
                        password: this.formpassword


                    }).then(() => {
                        this.showAlert('Password changed ...', 'info')})
                    this.formemail = ''
                    this.formpassword = ''
                } catch (e) {
                    this.formError = e.message
                }
                // }
            },


            async changePassword() {
                try {
                    await this.$store.dispatch('changepassword', {

                        email: this.$auth.$state.user.user.email,
                        currentPassword: this.formcurrentPassword,
                        newPassword: this.formNewPassword,
                        userId: this.$auth.$state.user.user._id,


                    }).then(() => {
                        this.showAlert('Password changed ...', 'info')})
                    this.formemail = ''
                    this.formpassword = ''
                } catch (e) {
                    this.formError = e.message
                }

            },
        },


    };
</script>
<style>
</style>
