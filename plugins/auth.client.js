import Cookie from 'js-cookie';

export default ({ $config, store }, inject) => {
    window.initAuth = init;
    addScript();
    inject('auth', {
        signOut,
    });  

    function addScript(){
         // creates our script tag and attach it to our Document
        const script = document.createElement('script')
        script.src = "https://apis.google.com/js/platform.js?onload=initAuth"
        script.async = true
         // append element to the head
        document.head.appendChild(script)
    }

     // https://developers.google.com/identity/sign-in/web/reference#auth_setup
    function init(){
          // since gapi is global lets add window
        window.gapi.load('auth2', async function() {
               /* Ready. Make a call to gapi.auth2.init or some other API */
            const auth2 = await window.gapi.auth2.init({
                client_id: $config.auth.clientId,
            })

            auth2.currentUser.listen(parseUser);
          });
        // https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams
        window.gapi.signin2.render('googleButton', {
            onsuccess: parseUser,
        })
    }

    function parseUser(user) {
        const profile = user.getBasicProfile();
        console.log('Name:' + profile.getName());
        console.log('Image Url:' + profile.getImageUrl());
        // console.log('Token:' + user.getAuthResponse().id_token);

        if (!user.isSignedIn()) {
            Cookie.remove($config.auth.cookieName);
            store.commit('auth/user', null);
            return;
        }

        store.commit('auth/user', {
            fullName: profile.getName(),
            profileUrl: profile.getImageUrl()
        });

        // the set Method takes a Cookie value from our auth config
        // 1/12 = 1 hour
        // Lax tells browser to send a cookie on the server on initials hits and
        // As well as subsequent requests
        const idToken = user.getAuthResponse().id_token;
        Cookie.set($config.auth.cookieName, idToken, { expires: 1/24, sameSite: 'Lax' });
    }

    function signOut() {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut();
    }
}