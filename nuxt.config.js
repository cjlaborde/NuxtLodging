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
    publicRuntimeConfig: {
        test1: "public",
        test2: "public"
    },
    // intended for server side rendering
    // If used in pre rendered sites, the private information would be visible to everyone
    // these values accessible now to global plugin called config
    privateRuntimeConfig: {
        test2: process.env.TEST,
    },
    env: {
        GMAP: process.env.GMAP,
        AlgoliaAppID: process.env.AlgoliaAppID,
        SearchOnlyApiKey: process.env.SearchOnlyApiKey,
        GAuthClientID: process.env.GAuthClientID,
        GAuthClientSecret: process.env.GAuthClientSecret,
    }

}