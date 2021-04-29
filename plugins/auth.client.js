export default ({ $config }) => {
    window.initAuth = init
    addScript()  

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
          });
        // https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams
        window.gapi.signin2.render('googleButton', {
            onsuccess: parseUser,
        })
    }

    function parseUser(user) {
        const profile = user.getBasicProfile()
        console.log('Name:' + profile.getName())
        console.log('Image Url:' + profile.getImageUrl())
    }
}