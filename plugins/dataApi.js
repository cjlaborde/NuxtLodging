export default function(context, inject) {
    const appId = process.env.AlgoliaAppID
    const apiKey = process.env.SearchOnlyApiKey
    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
    };

    // use inject to expose our getHome method
    inject('dataApi', {
        getHome
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