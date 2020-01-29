import axios from 'axios'


export const state = () => ({

    user: {},

})

export const mutations = {

    SET_USER_EMAIL: function (state, userEmail) {
        state.userEmail = userEmail
    },
    SET_USER: function (state, user) {
        state.auth.user = user
    },

}

export const actions = {
    async nuxtServerInit({dispatch, commit}, {req}) {

    },

    async logout({dispatch, state, commit}) {
        await this.$auth.logout()

        localStorage.clear();
        sessionStorage.clear();
        this.$router.push('/login')


    },
    async signup({commit, state}, {email, password, roles}) {
        try {
            let {data} = await axios.post('http://localhost:9000/api/signup', {

                email,
                password,
                roles,

            })

            commit('SET_USER_EMAIL', email)
            commit('SET_USER_PASSWORD', password)
            // commit('SET_TOKEN', data.token)

        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Bad credentials')
            }

            throw error
        }

    },
    async changepassword({commit, state}, {email, currentPassword, newPassword}) {

        try {
            await this.$axios.$post('http://localhost:9000/api/change-password', {

                email,
                newPassword,
                currentPassword,


            })
            let {data} =    await this.$axios.get(`http://localhost:9000/api/users/me`);
            commit('SET_USER', data)

        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Mot de passe incorrecte')
            }

            throw error
        }

    },
    async changeEmail({commit, state}, {currentEmail, newEmail, password}) {

        try {
            await this.$axios.post('http://localhost:9000/api/change-email', {

                currentEmail,
                newEmail,
                password,


            })
            await this.$auth.loginWith('local', {
                data: {
                    email: newEmail,
                    password: password,
                    rememberMe : false
                }
            })

        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Email does not exist')
            }

            throw error
        }

    },


}


export const getters = {




}

