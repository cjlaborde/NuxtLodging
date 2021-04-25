<template>
  <div>
    {{ lat }} / {{ lng }} / {{ label }} <br>
    <div v-for="home in homes" :key="home.objectID">{{ home.title }} <br></div>
  </div>
</template>

<script>
export default {
    // https://nuxtjs.org/docs/2.x/components-glossary/pages-watchquery/
    // watchQuery: ['lat'],
    // destruct query from context'
    async beforeRouteUpdate(to, from, next) {
        const data = await this.$dataApi.getHomeByLocationId(to.query.lat, to.query.lng);
        this.homes = data.json.hits;
        this.label = to.query.label;
        this.lat = to.query.lat;
        this.lng = to.query.lng;
        next()
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