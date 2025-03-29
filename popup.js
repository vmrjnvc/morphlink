import { openOptions, getOptionsAsync, openInLocalhost } from "./utils.js";

const optionsBtn = document.querySelector('#options-btn');
const localhostBtn = document.querySelector('#localhost-btn');

// handles open options button click
optionsBtn.addEventListener('click', openOptions);

// handles click on open in localhost in new tab command
localhostBtn.addEventListener('click', openInLocalhost);


