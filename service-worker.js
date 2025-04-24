import {openInLocalhost, executeRegexCommand, getOptionsAsync} from "./utils.js";

chrome.commands.onCommand.addListener(async (command) => {
    switch (command) {
        case 'localhost':
            openInLocalhost();
            break;
        default:
            const options = await getOptionsAsync();
            const regexCommandNum = Number(command.split('-')[1]);
            const regexOption = options.regexOptions?.[regexCommandNum];
            if (regexOption) {
                const {regex, replace} = regexOption;
                executeRegexCommand(regex, replace);
            }
    }
});

