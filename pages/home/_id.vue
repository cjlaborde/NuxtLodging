<template>
<div>
    <div style="display:flex;">
      <img v-for="image in home.images" :key="image" :src="image" width="200" height="150"/>
    </div>      
    {{ home.title }} <br>
    ${{ home.pricePerNight }} / night<br>
    <img src="/images/marker.svg" width="20" height="20"/>{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{home.location.country }} <br>
    <img src="/images/star.svg" width="20" height="20"/>{{ home.reviewValue }} <br>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath <br>
    {{ home.description }}
    <div style="height:800px;width:800px" ref="map">

    </div>
</div>
</template>

<script>
import homes from '~/data/homes';

export default {
    head() {
        return {
            title: this.home.title,
            script: [{
                src:`https://maps.googleapis.com/maps/api/js?key=${process.env.GMAP}&libraries=places&callback=initMap`,
                hid: "map",
                // defer guarantee to execute in order they appear
                defer: true,
                // this will skip adding this page on a page change.
                skip: process.client && window.mapLoaded
            }, {
                // know when google map is loaded
                innerHTML: "window.initMap = function() { window.mapLoaded = true }",
                hid: "map-init",
            }],
        }
    },
    data() {
        return  {
            home: {}
        }
    },
    mounted() {
        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng),
            // turns off all default controls
            disableDefaultUI: true,
            zoomControl: true
        }
        // map object takes 2 parameter 1) where map will be drawn and map options
        const map = new window.google.maps.Map(this.$refs.map, mapOptions);
        const position = new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng);
        const marker = new window.google.maps.Marker({ position });
        marker.setMap(map);
    },
    created() {
        const home = homes.find((home) => home.objectID == this.$route.params.id);
        // console.log(this.$route);
        // console.log(process.env.GMAP);
        this.home = home;

    }
}
</script>
