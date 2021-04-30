import cookie from 'cookie'

export default function() {
    const authConfig = this.options.publicRuntimeConfig.auth
    // allow us to add middleware before nuxt adds the middleware using a hook
    // we can pass middleware differently to server instance
    // https://nuxtjs.org/docs/2.x/internals-glossary/internals-renderer

    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use('/api', handler)
    })

    function handler(req, res, next) {
        // get our cookie that hold our token
        // we get this cookie name from our authConfig.cookieName
        const idToken = cookie.parse(req.headers.cookie)[authConfig.cookieName];
        console.log(req.originalUrl);
        console.log(idToken);
        next();
    }
}