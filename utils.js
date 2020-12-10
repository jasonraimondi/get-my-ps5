const axios = require('axios').default;

/** addToCartLoop 
 * Recursively tries to add a product to the cart
 * @return string
 */
function addToCartLoop(id, guid, numTries, checkInterval = 10000) {
    return new Promise(resolve => {
        axios.post(`https://api.direct.playstation.com/commercewebservices/ps-direct-us/users/anonymous/carts/${guid}/entries`, {
            "product": {
                "code": id
            },
            "quantity": 1,
            "cartIdCreated": false,
            "findingMethod": "pdp",
        }).catch(onFailure => {
            console.log(`Could not add product to cart. Trying again...`);
            console.log(`Times run: ${numTries}`);
            console.log("");
            numTries++;

            setTimeout(() => {
                addToCartLoop(id, guid, numTries);
            }, checkInterval);
        }).then(onSuccess => {
            if (onSuccess) {
                console.log("Product successfully added to cart!", onSuccess);
                resolve(onSuccess);
            }
        });
    });
}

const baseUrl = "https://direct.playstation.com";

/** checkForPlaystationDirectRedirect
 * Recursively checks for redirects.
 * @param checkInterval - How often to check in ms
 * @param onSuccess - Callback function for successful redirect
 */
async function checkForPlaystationDirectRedirect(checkInterval, onSuccess, numTries = 1, url = `${baseUrl}/en-us/consoles/console/playstation5-console.3005816`) {
    axios.get(url)
        .then(response => {
            // Workaround for users who hit "JavaScript required page"
            if (response.data.indexOf("The site requires JavaScript to be enabled!") > 0) {
                // Parse the redirect URL from the data.
                const redirectUrl = response.data.match(/\/\?c=[a-zA-Z(0-9)(&|=|%|.|\-)?]+/);

                // Start the process again, except use the redirect URL instead of our baseUrl so we can try to get past Sony's measures
                setTimeout(() => {
                    console.log("Redirect detected, but not necessarily for the queue. Checking again...");
                    console.log("Number of tries", numTries);
                    console.log("");
                    numTries++;
                    
                    checkForPlaystationDirectRedirect(checkInterval, onSuccess, numTries, `${baseUrl}${redirectUrl[0]}`)
                }, checkInterval);
            } else if (response.data.indexOf("queue-it_log") > 0) {
                onSuccess();
            } else {
                setTimeout(() => {
                    console.log("No redirect detected. Trying again...");
                    console.log("Number of tries", numTries);
                    console.log("");
                    numTries++;

                    checkForPlaystationDirectRedirect(checkInterval, onSuccess, numTries);
                }, checkInterval);
            }
        });
}


/** getGuid 
 * Get unique identifier (guid) used in subsequent results
 * Makes us look like we're human
 * @return string
 */
async function getGuid() {
    const response = await axios.post("https://api.direct.playstation.com/commercewebservices/ps-direct-us/users/anonymous/carts?fields=BASIC")
    return response.data.guid;
}

module.exports = {
    addToCartLoop,
    checkForPlaystationDirectRedirect,
    getGuid,
}