// constants
const LOCALHOST_URL = 'http://localhost:'

// get everything after domain from url passed to func
export function getPathAfterDomain(urlString) {
    try {

        // create new URL object
        const url = new URL(urlString);

        // get pathname and query from URL object
        const path = url.pathname;
        const search = url.search;
        return path + search;

    } catch (error) {
        console.error("Invalid URL:", error);
    }
}

// get current tab info from which extension is executed
export async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

// get settings for regex from storage
export async function getOptionsAsync() {
    return chrome.storage.sync.get(null);
}

// open in localhost
export async function openInLocalhost () {
    // get current tab data
    const tab = await getCurrentTab();
    // gets user options data
    const res = await getOptionsAsync();

    // creates url from localhost constant, port value from user options and active tab following the domain
    const url = LOCALHOST_URL + res.portOption + getPathAfterDomain(tab.url);

    // creates new tab
    chrome.tabs.create({
        url,
    });
}
