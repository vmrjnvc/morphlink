import { setStatus, createRegexOption } from "./utils.js";

const save = document.getElementById("save");
const add  = document.getElementById("add");
const lhOption = document.getElementById('lh-input');
const portOption = document.getElementById('port-input');
const optionsContainer = document.getElementById('options');

// default values
lhOption.checked = true;
portOption.value = 3000;

function togglePortAvailability() {
    portOption.disabled = !lhOption.checked;
}

lhOption.addEventListener('change', () => {
    togglePortAvailability()
})

// add new command
function addOption() {
    const regexOption = createRegexOption();

    optionsContainer.appendChild(regexOption);
}

// Saves options to chrome.storage
function saveOptions () {
    if (!Number(portOption.value)) {
        setStatus('Invalid port value.');
        restoreOptions();
        return;
    }
    chrome.storage.sync.set(
        {
            lhOption: lhOption.checked,
            portOption: portOption.value,
            portDisabled: portOption.disabled
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
                            lhOption.checked = items.lhOption;
                            break;
                        case 'portOption':
                            portOption.value = items.portOption;
                            break;
                        case 'portDisabled':
                            portOption.disabled = items.portDisabled;
                            break;
                        default:
                    }
                })
            }
        }
    );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
save.addEventListener('click', saveOptions);
add.addEventListener('click', addOption);
