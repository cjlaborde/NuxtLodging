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
    <div style="height:800px;width:800px" ref="map"></div>
    <div v-for="review in reviews" :key="review.objectID">
        <img :src="review.reviewer.image"/><br/>
        {{ review.reviewer.name }}<br/>
        {{ review.date }}<br/>
        {{ review.comment }}<br/>
    </div>
</div>
</template>

<script>

export default {
    head() {
        return {
            title: this.home.title,
        }
    },
    methods: {
        showMap() {
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
        }
    },
    mounted() {
        // we use map instead of google maps so that in the future we may switch to something else and only need to change code inside the plugin
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    },

    async asyncData({ params, $dataApi, error}) {
        const homeResponse = await $dataApi.getHome(params.id);
        if (!homeResponse.ok) return error({ statusCode: homeResponse.status, message: homeResponse.statusText })

        const reviewResponse = await $dataApi.getReviewsByHomeId(params.id);
        if (!reviewResponse.ok) return error({ statusCode: reviewResponse.status, message: reviewResponse.statusText })
        return {
            home: homeResponse.json,
            reviews: reviewResponse.json.hits,
        }
    }
    // async created() {
        // const home = homes.find((home) => home.objectID == this.$route.params.id);
        // console.log(this.$route);
        // const home = await this.$dataApi.getHome(this.$route.params.id);
        // // console.log(process.env.AlgoliaAppID);
        // this.home = home;

    // },
 
}
</script>
