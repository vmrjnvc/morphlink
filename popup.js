import { getPathAfterDomain } from "./utils.js";

document.querySelector('#go-to-options').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

// get current tab info from which extension is executed
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

// get settings for regex from storage
async function getOptionsAsync() {
    return chrome.storage.sync.get(null);
}

document.querySelector('#open-in-localhost').addEventListener('click', async () => {
    let url = 'http://localhost:'
    const tab = await getCurrentTab();
    const res = await getOptionsAsync();
    url += res.portOption;
    url += getPathAfterDomain(tab.url);

    chrome.tabs.create({
        url,
    });
});


document.addEventListener('DOMContentLoaded', getOptionsAsync);

