// inject a object or value into your app that is available through vue and vuex
export default function(context, inject) {
    let isLoaded = false;
     let waiting = [];

    addScript();
    // $maps will be available throughout your app
    // second argument is what you want to be returned when $maps is returned
    // it will return an object that contains our show method
    inject('maps', {
        showMap,
        makeAutoComplete,
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

    function makeAutoComplete(input) {
        // check if map is loaded or not
        if (!isLoaded) {
            waiting.push({ fn: makeAutoComplete, arguments})
            return
        }
        // you need to add window since we in the context of a plugin
        // https://developers.google.com/maps/documentation/javascript/places-autocomplete#constraining-autocomplete
        // const autocomplete = new google.maps.places.Autocomplete(input, options);
        // turn options inside an object to send multiple options
        // when you type places will suggest cities 
        const autoComplete = new window.google.maps.places.Autocomplete(input, { types: ['(cities)']});
        // with Listener we can know when someone selected an option in our dropdown
        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace();
            // dispatchEvent takes 2 arguments
            // 1) We going to use CustomEvent() object instead of the Event() object
            // 2) The second parameter is the object we want to initialize the custom event with
            // we will send the payload with our event
            // we will use special property called detail, is not included in the tradional event object
            // we will add object with detail: place
            input.dispatchEvent(new CustomEvent('changed', { detail: place}));
        });
    }

    // now that is inside plugins we not longer have access to our home and map object
    // so we need to add parameters canvas, lat, lng
    // The idea is that when we create our map and we don't have any custom markets we will show the existing lat & lng  
    function showMap(canvas, lat, lng, markers) {
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
            // https://developers.google.com/maps/documentation/javascript/style-reference
            styles: [{
                // selects all points of interest for businesses
                featureType: 'poi.business',
                // selects the icons of all businesses
                elementType: 'labels.icon',
                // let add the style
                stylers:[{ visibility: 'off'}]
            }]
        }
        // map object takes 2 parameter 1) where map will be drawn and map options
        // canvas replaces -----> this.$refs.map 
        const map = new window.google.maps.Map(canvas, mapOptions);
        // if there are no markers
        if (!markers) {
            const position = new window.google.maps.LatLng(lat, lng);
            const marker = new window.google.maps.Marker({ 
                position,
                clickable: false,
            });
            marker.setMap(map);
            return
        }

        // remember to add window. in front of it since this code is not part of the global space
        // lets loop through our market array using foreach and annonymous function
        // https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds
        const bounds = new window.google.maps.LatLngBounds()
        markers.forEach((home) => {
            const position = new window.google.maps.LatLng(home.lat, home.lng);
            const marker = new window.google.maps.Marker({ 
                position,
                label: {
                    // if you just pass a number it will throw error since it gmaps api is  expecting a string
                    text: `$${home.pricePerNight}`,
                    // add css style class
                    className: `marker home-${home.id}`
                },
                icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
                clickable: false
            });
            marker.setMap(map);
            // pass the position of the market so the bound can grow
            marker.setMap(map);
            bounds.extend(position)
        });
        // https://developers.google.com/maps/documentation/javascript/reference/map#Map.fitBounds
        map.fitBounds(bounds)
    }
}