export const state = () => ({
    isLoggedIn: false,
    user: {},
});

export const mutations = {
    user(state, user) {
       state.isLoggedIn = !!user
       // if pass value is falsy set user back to default
       state.user = user || {}
    }
}