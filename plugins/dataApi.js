export default function(context, inject) {
    const appId = process.env.AlgoliaAppID
    const apiKey = process.env.SearchOnlyApiKey
    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
    };

    // use inject to expose our getHome method
    inject('dataApi', {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomeByLocationId
    })

    async function getHome(homeId) {
        try {
            // https://www.algolia.com/doc/rest-api/search/#get-objects
            // https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/*/objects
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }));
        } catch(error) {
            return getErrorResponse(error)
        }
    }

    async function getReviewsByHomeId(homeId) {
        try {
            // https://www.algolia.com/doc/rest-api/search/#search-index-post
            // Path: /1/indexes/{indexName}/query
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    // we only want 2 results per page
                    hitsPerPage: 6,
                    attributesToHighlight: []
                })
            }))
        } catch(error) {
            return getErrorResponse(error)
        }
    }

    async function getUserByHomeId(homeId){
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,                  
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function getHomeByLocationId(lat, lng, radiusInMeters = 1500){
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    aroundLatLng: `${lat},${lng}`,
                    // only get results about properties around the radiusInMeters
                    aroundRadius: radiusInMeters,
                    hitsPerPage: 10,         
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function unWrap(response) {
        const json = await response.json();
        const {ok, status, statusText } = response;
        return {
            json,
            ok,
            status,
            statusText
        }
    }

    function getErrorResponse(error) {
        return {
            ok: false,
            // means internal error has occured
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}  