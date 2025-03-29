import {openOptions, getOptionsAsync, openInLocalhost, createRegexCommand, executeRegexCommand} from "./utils.js";

// html elements
const optionsBtn = document.querySelector('#options-btn');
const localhostBtn = document.querySelector('#localhost-btn');
const regexCommandsContainerEl = document.querySelector('.regex-commands');

// handles open options button click
optionsBtn.addEventListener('click', openOptions);

// handles click on open in localhost in new tab command
localhostBtn.addEventListener('click', openInLocalhost);

// get regex commands from storage
async function getRegexCommands () {
    const options = await getOptionsAsync();

    return options.regexOptions;
}
const regexCommands = await getRegexCommands();

// create buttons for regex commands and insert them in DOM
regexCommands.forEach(cmd => {
    const regexCommand = createRegexCommand(cmd.name);
    regexCommand.addEventListener('click', () => {
        executeRegexCommand(cmd['regex'], cmd['replace']);
    })
    regexCommandsContainerEl.appendChild(regexCommand);
})
console.log(regexCommands);
