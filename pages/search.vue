<template>
  <div class="app-search-results-page">
      <div class="app-search-results">
            <div class="app-search-results-listing">
                <h2 class="app-title">Stays in {{ label }}</h2>
                <nuxt-link v-for="home in homes" :key="home.objectID" :to="`/home/${home.objectID}`">
                    <HomeRow class="app-house" :home="home" @mouseover.native="highlightMarker(home.objectID, true)" @mouseout.native="highlightMarker(home.objectID, false)"/>
                </nuxt-link>
            </div>
            <div class="app-search-results-map">
                <div class="app-map" ref="map"></div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    head() {
        return {
            title: `Homes around ${this.label}`
        }
    },
    mounted() {
        this.updateMap()
    },
    methods: {
           highlightMarker(homeId, isHighlighted){
            // returns array but there should only be 1 result hence [0]
            // home-${homeId} is the class we set up in the maps.client.js plugin
            // then use classList.toggle to toggle the class on and off
            document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted)
        },

        updateMap() {
            this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers());
        },
        getHomeMarkers() {
            // returns nulls when there are no search results
            if (this.homes.length == 0) return null;
            return this.homes.map((home) => {
                return {
                    // create spread of geoloc to get all lat and lng properties
                    ...home._geoloc,
                    // add price to marker
                    pricePerNight: home.pricePerNight,
                    id: home.objectID,
                }
            })
        }
    },
    // https://nuxtjs.org/docs/2.x/components-glossary/pages-watchquery/
    // watchQuery: ['lat'],
    // destruct query from context'
    async beforeRouteUpdate(to, from, next) {
        const data = await this.$dataApi.getHomeByLocationId(to.query.lat, to.query.lng);
        this.homes = data.json.hits;
        this.label = to.query.label;
        this.lat = to.query.lat;
        this.lng = to.query.lng;
        this.updateMap();
        next();
    },
    async asyncData({ query, $dataApi }) {
        const data = await $dataApi.getHomeByLocationId(query.lat, query.lng)
        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng,
        }
    }
}
</script>

<style>
.marker {
    background-color: white;
    border: 1px solid lightgray;
    font-weight: bold;
    border-radius: 20px;
    padding: 5px 8px;
}

.marker-highlight {
  /* we need to use important, since google maps uses an inline style for the color */
  color: white !important;
  background-color: black;
  border-color:black;
}
</style>