// constants
const OPTIONS_PAGE = 'options.html'
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

// creates new regex option html element and returns it
export function createRegexOption () {
    // creates container
    const newEl = document.createElement('div');
    newEl.className = 'regex-option';

    // create input field for regex name
    const regexNameLabel = document.createElement('label');
    regexNameLabel.id = 'regex-name__label'
    regexNameLabel.setAttribute('for', 'regex-name__input');
    regexNameLabel.innerHTML = 'Regex Name';
    const regexNameInput = document.createElement('input');
    regexNameInput.id = 'regex-name__input';
    regexNameLabel.appendChild(regexNameInput);

    // create input field for regex value
    const regexValueLabel = document.createElement('label');
    regexValueLabel.id = 'regex-value__label'
    regexValueLabel.setAttribute('for', 'regex-value__input');
    regexValueLabel.innerHTML = 'Regex Value';
    const regexValueInput = document.createElement('input');
    regexValueInput.id = 'regex-value__input';
    regexValueLabel.appendChild(regexValueInput);

    newEl.appendChild(regexNameLabel);
    newEl.appendChild(regexValueLabel);
    console.log(newEl);
    return newEl;
}

// open options page function
export function openOptions () {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL(OPTIONS_PAGE));
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

// Update status to let user know options were saved or not.
export function setStatus (msg) {
    const status = document.getElementById('status');

    status.textContent = msg;
    setTimeout(() => {
        status.textContent = '';
    }, 750);
}
