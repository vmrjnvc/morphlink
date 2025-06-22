type RegexOption = {
  name: string;
  pattern: string | RegExp;
  replacement: string | RegExp;
}

// constants
const OPTIONS_PAGE = 'options.html'
const LOCALHOST_URL = 'http://localhost:'

// get everything after domain from url passed to func
export function getPathAfterDomain(urlString: string): string {
  try {

    // create new URL object
    const url = new URL(urlString);

    // get pathname and query from URL object
    const path = url.pathname;
    const search = url.search;
    return path + search;

  } catch (error) {
    console.error("Invalid URL:", error);
    return 'Error'
  }
}

// creates input field with label
function createInputField (name: string): HTMLLabelElement {
  const label = document.createElement('label');
  label.id = `${name}__label`;
  label.setAttribute('for', `${name}__input`);
  const span = document.createElement('span');
  span.innerHTML = name;
  const input = document.createElement('input');
  input.id = `${name}__input`;
  label.appendChild(span);
  label.appendChild(input);
  return label;
}

function createDeleteButton (): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'delete-option__btn';
  btn.innerHTML = 'Remove';
  btn.addEventListener('click', (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    const regex = target?.parentElement;
    if (regex) {
      regex.remove();
    }
  })

  return btn;
}

// creates new regex option html element and returns it
export function createRegexOption (restoredData: RegexOption): HTMLDivElement {
  // creates container
  const newEl = document.createElement('div');
  newEl.className = 'regex-option';
  const formGroupEl = document.createElement('div');
  formGroupEl.className = 'form-group';
  const nameInput = createInputField('name');
  const patternInput = createInputField('pattern');
  const replacementInput = createInputField('replacement');
  const deleteBtn = createDeleteButton();

  // populate input values if restoredData exists
  if (restoredData) {
    const { name, pattern, replacement } = restoredData;
    nameInput.querySelector('input').value = name || '';
    patternInput.querySelector('input').value = pattern || '';
    replacementInput.querySelector('input').value = replacement || '';
  }

  formGroupEl.appendChild(nameInput);
  formGroupEl.appendChild(patternInput);
  formGroupEl.appendChild(replacementInput);
  newEl.appendChild(formGroupEl)
  newEl.appendChild(deleteBtn);

  return newEl;
}

export function createCommand (name, shortcut) {
  const btn = document.createElement('button');
  btn.innerHTML = name;
  btn.className = 'command';

  if (shortcut) {
    const span =  document.createElement('span');
    span.className = 'shortcut';
    span.innerHTML = shortcut

    btn.appendChild(span);
  }

  return btn;
}

// open options page function
export function openOptions () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL(OPTIONS_PAGE));
  }
}

// get current tab info from which extension is executed
export async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// get settings for regex from storage
export async function getOptionsAsync() {
  return chrome.storage.sync.get(null);
}

// open in localhost
export async function openInLocalhost () {
  // get current tab data
  const tab = await getCurrentTab();
  // gets user options data
  const res = await getOptionsAsync();

  // creates url from localhost constant, port value from user options and active tab following the domain
  const url = LOCALHOST_URL + res.portOption + getPathAfterDomain(tab.url);

  // creates new tab
  chrome.tabs.create({
    url,
  });
}

export async function executeRegexCommand (pattern, replacement) {
  const tab = await getCurrentTab();

  const url = tab.url.replace(new RegExp(pattern), replacement);
  console.log(pattern, replacement);
  // creates new tab
  chrome.tabs.create({
    url,
  });
}

// Update status to let user know options were saved or not.
export function setStatus (msg) {
  const status = document.getElementById('status');

  status.textContent = msg;
  setTimeout(() => {
    status.textContent = '';
  }, 750);
}

// create shortcut element to show set shortcut
function createShortcut (shortcut)  {
  const div = document.createElement('div');
  div.className = 'shortcut';
  div.innerHTML = shortcut;
  return div
}
