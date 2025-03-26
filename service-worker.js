import { openInLocalhost } from "./utils.js";

chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case 'run-localhost':
            openInLocalhost();
    }
});

