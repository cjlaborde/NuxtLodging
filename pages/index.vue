!<template>
   <div>
      <div v-for="home in homes" :key="objectID" style="float:left;margin:10px">
         <nuxt-link :to="`/home/${home.objectID}`" no-prefetch>
            <HomeCard :home="home" />
         </nuxt-link>
      </div>
   </div>
</template>

<script>
import homes from '~/data/homes'

export default {
   head() {
      return {
         title: 'Homepage',
         meta: [{ 
            name: 'description',
            content: 'This is a homepage!',
            hid: 'description'
         }]
      }
   },
   data() {
      return {
         // return first 3 homes by slicing array
         homes: homes.slice(0,3)
      }
   }
}
</script>