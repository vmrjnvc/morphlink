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

// creates input field with label
function createInputField (name) {
    const label = document.createElement('label');
    label.id = `${name}__label`;
    label.setAttribute('for', `${name}__input`);
    label.innerHTML = name;
    const input = document.createElement('input');
    input.id = `${name}__input`;
    label.appendChild(input);
    return label;
}

function createDeleteButton () {
    const btn = document.createElement('button');
    btn.className = 'delete-option__btn';
    btn.innerHTML = 'Delete';
    btn.addEventListener('click', (event) => {
        const regex = event.target.parentElement;
        if (regex) {
            regex.remove();
        }
    })

    return btn;
}

// creates new regex option html element and returns it
export function createRegexOption (restoredData = {}) {
    // creates container
    const newEl = document.createElement('div');
    newEl.className = 'regex-option';
    const nameInput = createInputField('name');
    const regexInput = createInputField('regex');
    const replaceInput = createInputField('replace');
    const deleteBtn = createDeleteButton();

    // populate input values if restoredData exists
    if (restoredData) {
        const { name, regex, replace } = restoredData;
        nameInput.querySelector('input').value = name || '';
        regexInput.querySelector('input').value = regex || '';
        replaceInput.querySelector('input').value = replace || '';
    }

    newEl.appendChild(nameInput);
    newEl.appendChild(regexInput);
    newEl.appendChild(replaceInput);
    newEl.appendChild(deleteBtn);

    return newEl;
}

export function createRegexCommand (name) {
    const btn = document.createElement('button');
    btn.className = 'regex-command';
    btn.classList.add('command-btn');
    btn.innerHTML = name;

    return btn;
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

export async function executeRegexCommand (regexVal, replaceVal) {
    const tab = await getCurrentTab();

    const url = tab.url.replace(new RegExp(regexVal), replaceVal);
    console.log(regexVal, replaceVal);
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
