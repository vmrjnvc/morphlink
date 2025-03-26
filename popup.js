import { getOptionsAsync, openInLocalhost } from "./utils.js";

document.querySelector('#go-to-options').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

// handles click on open in localhost in new tab command
document.querySelector('#open-in-localhost').addEventListener('click', openInLocalhost);

// load user options
document.addEventListener('DOMContentLoaded', getOptionsAsync);

