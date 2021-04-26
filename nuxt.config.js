export default {
    components: true,
    server: {
        host: '0.0.0.0',
        port: 5500,
    },
    head: {
        // %s = placeholder for page title
        titleTemplate: "Mastering Nuxt: %s",
        htmlAttrs: {
           lang: "en" 
        },
        bodyAttrs: {
            class: ["my-style"]
        },
        meta: [{
            charset: "utf-8",
        }]
    },
    router: {
        prefetchLinks: false,
    },
    plugins: [
        '~/plugins/maps.client',
        '~/plugins/dataApi'
    ],
    modules: ['~/modules/test'],
    env: {
        GMAP: process.env.GMAP,
        AlgoliaAppID: process.env.AlgoliaAppID,
        SearchOnlyApiKey: process.env.SearchOnlyApiKey
    }
}