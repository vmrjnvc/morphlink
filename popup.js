import {
    createRegexCommand,
    executeRegexCommand,
    getOptionsAsync,
    openInLocalhost,
    openOptions
} from "./utils.js";

// html elements
const optionsBtn = document.querySelector('#options-btn');
const localhostBtn = document.querySelector('#localhost-btn');
const commandsContainerEl = document.querySelector('.commands-container');

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
    commandsContainerEl.appendChild(regexCommand);
})

// get all shortcuts set by user and show them in popup
chrome.commands.getAll((commands) => {
    console.log(options);
    console.log(commands);
});
