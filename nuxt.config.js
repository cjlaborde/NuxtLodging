export default {
    components: true,
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
    plugins:[ 
        '~/plugins/maps.client', 
        '~/plugins/dataApi', 
        '~/plugins/auth.client'
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
    publicRuntimeConfig:{
        auth:{
            cookieName: 'idToken',
            clientId: process.env.GAuthClientID,
        },
        algolia:{
            appId: process.env.AlgoliaAppID,
            key:process.env.SearchOnlyApiKey,
        },
        gmap: {
            key: process.env.GMAP
        }
    },
    // publicRuntineConfig: {
    //     auth: {
    //         cookieName: 'idToken',
    //         clientId: process.env.GAuthClientID
    //     }
    // },
    // env: {
    //     GMAP: process.env.GMAP,
    //     AlgoliaAppID: process.env.AlgoliaAppID,
    //     SearchOnlyApiKey: process.env.SearchOnlyApiKey,
    //     // GAuthClientID: process.env.GAuthClientID,
    //     // GAuthClientSecret: process.env.GAuthClientSecret,
    // }

}