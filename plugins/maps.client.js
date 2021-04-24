// inject a object or value into your app that is available through vue and vuex
export default function(context, inject) {
    let isLoaded = false;
     let waiting = [];

    addScript()
    // $maps will be available throughout your app
    // second argument is what you want to be returned when $maps is returned
    // it will return an object that contains our show method
    inject('maps', {
        showMap
    });



    function addScript() {
        // creates our script tag and attach it to our Document
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GMAP}&libraries=places&callback=initGoogleMaps`;
        script.async = true;
        window.initGoogleMaps = initGoogleMaps;
        // append element to the head
        document.head.appendChild(script);
    }

    function initGoogleMaps() {
        // if map waiting run render map
        isLoaded = true
        // since waiting is an array lets use for each method
        waiting.forEach((item) => {
            if (typeof item.fn === 'function') {
                item.fn(...item.arguments)
            }
        })
        // now that our queue is all ran lets clear the queue
        waiting = []
    }

    // now that is inside plugins we not longer have access to our home and map object
    // so we need to add parameters canvas, lat, lng
    function showMap(canvas, lat, lng) {
        if (!isLoaded) {
            // we will call reference to current function so we can call it later
            waiting.push({
                // fn = function
                fn: showMap,
                arguments
            })
             // we don't want to do anything else if map is not loaded
            return
        }

        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(lat, lng),
            // turns off all default controls
            disableDefaultUI: true,
            zoomControl: true,
        }
        // map object takes 2 parameter 1) where map will be drawn and map options
        // canvas replaces -----> this.$refs.map 
        const map = new window.google.maps.Map(canvas, mapOptions);
        const position = new window.google.maps.LatLng(lat, lng);
        const marker = new window.google.maps.Marker({ position });
        marker.setMap(map);
    }
}