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
    modules: [],
    buildModules:['@nuxtjs/tailwindcss'],
    css: ['~/assets/sass/app.scss'],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0,
        }
    },
    env: {
        GMAP: process.env.GMAP,
        AlgoliaAppID: process.env.AlgoliaAppID,
        SearchOnlyApiKey: process.env.SearchOnlyApiKey,
        GAuthClientID: process.env.GAuthClientID,
        GAuthClientSecret: process.env.GAuthClientSecret,
    }

}