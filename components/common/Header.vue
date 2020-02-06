<template>
    <div>
        <header class="header-global" style="    box-shadow: 1px 1px 10px 1px rgba(0,0,0,.2);">
            <base-nav class="navbar-main"  style="max-width: 100%;" type="" effect="Light" expand>

                <a href="/register" type="default" style="width: 100%;text-align: right;" class="btn btn-card-primary btn-icon" v-if="!$auth.$state.loggedIn && $route.path !== '/register'">
                    <span style="text-transform: none;">register</span>
                </a>

                        <a href="/login" type="default" style="width: 100%;text-align: right;" class="btn btn-card-primary btn-icon" v-if="!$auth.$state.loggedIn && $route.path !== '/login'">
                            <span style="text-transform: none;">Login</span>
                        </a>
                    <div class="add-property-button">
                        <div class="action-button">
                        </div>
                    </div>
                    <div class="add-property-button">
                        <div class="action-button">
                        </div>
                    </div>
                        <form name="form" @submit.prevent="logout()" v-if="$auth.$state.loggedIn">
                            <button type="submit" class="dropdown-item" style="width: 100%;text-align: right;"
                            >Logout
                            </button>
                        </form>
            </base-nav>
        </header>
    </div>
</template>

<script>

    export default {

        methods: {
            async logout() {
                try {
                    await this.$store.dispatch('logout')

                } catch (e) {
                    console.log(e.message)
                }

            },
        },

    }
</script>

<style>

</style>
