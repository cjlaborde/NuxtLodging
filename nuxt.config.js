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
    env: {
        GMAP: process.env.GMAP
    }
}