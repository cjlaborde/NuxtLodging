export default function(context, inject) {
    const appId = process.env.AlgoliaAppID
    const apiKey = process.env.SearchOnlyApiKey

    // use inject to expose our getHome method
    inject('dataApi', {
        getHome
    })

    async function getHome(homeId) {
        // https://www.algolia.com/doc/rest-api/search/#get-objects
        // https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/*/objects
        const respose = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
            headers: {
                'X-Algolia-API-Key': apiKey,
                'X-Algolia-Application-Id': appId,
            }
        })
        const json = await respose.json();
        return json;
    }

}