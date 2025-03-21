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

document.querySelector('#open-new-tab').addEventListener('click', async function() {
    const tab = await getCurrentTab();
    console.log(tab);
    chrome.tabs.create({
        url: tab.url,
    });
});


