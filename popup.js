import {
    createRegexCommand,
    createShortcutsContainer,
    executeRegexCommand,
    getOptionsAsync,
    openInLocalhost,
    openOptions
} from "./utils.js";

// html elements
const optionsBtn = document.querySelector('#options-btn');
const localhostBtn = document.querySelector('#localhost-btn');
const regexCommandsContainerEl = document.querySelector('.regex-commands');
const shortcutsContainerEl = document.querySelector('.shortcuts');

// handles open options button click
optionsBtn.addEventListener('click', openOptions);

const options = await getOptionsAsync();

if (!options.lhOption) {
    localhostBtn.disabled = true;
} else {
    // handles click on open in localhost in new tab command
    localhostBtn.addEventListener('click', openInLocalhost);
}

// get user regex commands
const regexCommands = options.regexOptions

// create buttons for regex commands and insert them in DOM
regexCommands.forEach(cmd => {
    const regexCommand = createRegexCommand(cmd.name);
    regexCommand.addEventListener('click', () => {
        executeRegexCommand(cmd['regex'], cmd['replace']);
    })
    regexCommandsContainerEl.appendChild(regexCommand);
})

// get all shortcuts set by user and show them in popup
chrome.commands.getAll((commands) => {
    const localhostShortcut = commands.find(command => command.name === 'localhost');
    const regexShortcuts = commands.filter(command => command.name.startsWith('regex-'));
    regexShortcuts.unshift(localhostShortcut);

    const shortcutsWrapper = createShortcutsContainer(regexShortcuts);

    shortcutsContainerEl.appendChild(shortcutsWrapper);
});
