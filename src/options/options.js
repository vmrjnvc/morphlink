import { setStatus, createRegexOption, DEFAULT_PORT } from "../../utils.js";

const saveBtn = document.getElementById("save");
const addBtn  = document.getElementById("add");
const lhOptionEl = document.getElementById('lh-input');
const portOptionEl = document.getElementById('port-input');
const regexOptionsEl = document.querySelector('.regex-options');

// default values
lhOptionEl.checked = true;
portOptionEl.value = DEFAULT_PORT;

function togglePortAvailability() {
    portOptionEl.disabled = !lhOptionEl.checked;
}

lhOptionEl.addEventListener('change', () => {
    togglePortAvailability()
})

// add new command
function addOption(restoredData) {
    const regexOption = createRegexOption(restoredData);
    // console.log(regexOption);
    regexOptionsEl.appendChild(regexOption);
}

function getRegexOptionsData () {
    const childElements = regexOptionsEl.children;
    const regexOptionsArr = [];
    for (let i = 0; i < childElements.length; i++) {
        const child = childElements[i];
        const [name, pattern, replacement] = child.querySelectorAll('input');
        regexOptionsArr.push({name: name.value, pattern: pattern.value, replacement: replacement.value});
    }

    return regexOptionsArr;
}

// Saves options to chrome.storage
function saveOptions () {
    if (!portOptionEl.value) {
        setStatus('Invalid port value.');
        restoreOptions();
        return;
    }
    const regexOptionsData = getRegexOptionsData();
    const hasEmptyFields = regexOptionsData.some(option => !option.name || !option.pattern || !option.replacement);

    if (hasEmptyFields) {
        setStatus('All fields must be filled.');
        return;
    }

    chrome.storage.sync.set(
        {
            lhOption: lhOptionEl.checked,
            portOption: portOptionEl.value,
            regexOptions: regexOptionsData
        },
        () => {
            setStatus('Options saved')
        }
    );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions () {
    chrome.storage.sync.get(
        null,
        (items) => {
            const itemsKeys = Object.keys(items);

            if (itemsKeys.length) {
                itemsKeys.forEach(key => {
                    switch (key) {
                        case 'lhOption':
                            lhOptionEl.checked = items.lhOption;
                            portOptionEl.disabled = !items.lhOption
                            break;
                        case 'portOption':
                            portOptionEl.value = items.portOption;
                            break;
                        case 'regexOptions': {
                            items.regexOptions.forEach((regexOption) => {
                                addOption(regexOption);
                            })
                            break;
                        }
                        default:
                    }
                })
            }
        }
    );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
saveBtn.addEventListener('click', saveOptions);
addBtn.addEventListener('click', addOption);
