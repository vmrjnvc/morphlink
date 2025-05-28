import {
    createCommand,
    executeRegexCommand,
    getOptionsAsync,
    openInLocalhost,
    openOptions
} from "../../utils.js";

// html elements
const optionsBtn = document.querySelector('.options');
const commandsContainerEl = document.querySelector('.commands-container');

// handles open options button click
optionsBtn.addEventListener('click', openOptions);

const options = await getOptionsAsync();
const userShortcuts = await chrome.commands.getAll();
console.log(userShortcuts);
const localhostCommand = createCommand('Localhost', userShortcuts[1].shortcut);
commandsContainerEl.appendChild(localhostCommand);

if (!options.lhOption) {
    localhostCommand.disabled = true;
} else {
    // handles click on open in localhost in new tab command
    localhostCommand.addEventListener('click', openInLocalhost);
}

// get user regex commands
const regexCommands = options.regexOptions

// create buttons for regex commands and insert them in DOM
regexCommands.forEach((cmd, index) => {
    console.log(userShortcuts[index+2]);
    const regexCommand = createCommand(cmd.name, userShortcuts[index+2]?.shortcut);
    regexCommand.addEventListener('click', () => {
        executeRegexCommand(cmd['regex'], cmd['replace']);
    })
    commandsContainerEl.appendChild(regexCommand);
})

// get all shortcuts set by user and show them in popup
// chrome.commands.getAll((commands) => {
//     console.log(options);
//     console.log(commands);
// });
