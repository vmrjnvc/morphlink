document.querySelector('#go-to-options').addEventListener('click', function() {
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
    return chrome.storage.sync.get(
        { regExp: '' }
    );
}

document.querySelector('#open-new-tab').addEventListener('click', async function() {
    const tab = await getCurrentTab();

    const res = await getOptionsAsync();
    const regexp = new RegExp(res.regExp);
    console.log(regexp);
    const morphedUrl = tab.url.replace(regexp, 'localhost:3000');
    chrome.tabs.create({
        url: morphedUrl,
    });
});


document.addEventListener('DOMContentLoaded', getOptionsAsync);

