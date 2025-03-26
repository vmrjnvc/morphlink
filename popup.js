import { getOptionsAsync, openInLocalhost } from "./utils.js";

const optionsBtn = document.querySelector('#options-btn');
const localhostBtn = document.querySelector('#localhost-btn');

// handles open options button click
optionsBtn.addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

// handles click on open in localhost in new tab command
localhostBtn.addEventListener('click', openInLocalhost);

// load user options
document.addEventListener('DOMContentLoaded', getOptionsAsync);

