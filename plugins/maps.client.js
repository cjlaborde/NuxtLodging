// inject a object or value into your app that is available through vue and vuex
export default function(context, inject) {
    let mapLoaded = false
    let mapWaiting = null

    addScript()
    // $maps will be available throughout your app
    // second argument is what you want to be returned when $maps is returned
    // it will return an object that contains our show method
    inject('maps', {
        showMap
    })



    function addScript() {
        // creates our script tag and attach it to our Document
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GMAP}&libraries=places&callback=initMap`
        script.async = true 
        window.initMap = initMap
        // append element to the head
        document.head.appendChild(script)
    }

    function initMap() {
        // if map waiting run render map
        mapLoaded = true
        if(mapWaiting) {
            const { canvas, lat, lng } = mapWaiting
            renderMap(canvas, lat, lng)
            mapWaiting = null
        }
    }

    function showMap(canvas, lat, lng)
    {
        if (mapLoaded) renderMap(canvas, lat, lng)
        // this will be place, we store call in showMap till google maps is ready
        else mapWaiting = { canvas, lat, lng }

    }

    // now that is inside plugins we not longer have access to our home and map object
    // so we need to add parameters canvas, lat, lng
    function renderMap(canvas, lat, lng ) {
        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(lat, lng),
            // turns off all default controls
            disableDefaultUI: true,
            zoomControl: true
        }
        // map object takes 2 parameter 1) where map will be drawn and map options
        // canvas replaces -----> this.$refs.map 
        const map = new window.google.maps.Map(canvas, mapOptions);
        const position = new window.google.maps.LatLng(lat, lng);
        const marker = new window.google.maps.Marker({ position });
        marker.setMap(map);
    }
}