# Morphlink

Morphlink is a Chrome extension designed to streamline your development process by allowing you to quickly navigate from any webpage to your local development server. Simplifying your workflow, Morphlink helps you easily transition between remote sites and your local environment.

## Features

- **Quick Navigation**: Navigate from a webpage's URL to your local server with a single click.
    - If you are on a URL such as `example.com/param1/param2`, the button will direct you to `localhost:3000/param1/param2`.

- **Configurable Port**: Customize the port number in the options to match your local server settings.

- **Custom Regex Options**: Enhance your navigation capabilities by adding custom regex patterns.
    - Easily add a regex option via the settings menu with three input fields:
        - **Name**: The name of your option, which will be displayed in the popup below the local server option.
        - **Regex Pattern**: Input the string pattern that you want to match.
        - **Replacement String**: Specify the string that will replace the matched regex pattern.

- **Shortcut Configurations**: In the settings, you can configure keyboard shortcuts for quick access:
    - Set a shortcut for the "Localhost" option.
    - Assign shortcuts for the first three custom regex options for easy navigation.

## How to Use

1. **Installation**:
    - Download the Morphlink extension from the Chrome Web Store.
    - Add it to your Chrome browser.

2. **Configuration**:
    - Click on the Morphlink icon in your Chrome toolbar.
    - Navigate to the options menu to set your desired port number and add any custom regex options.
    - Define shortcuts for quick access to the "Localhost" function and custom regex options.

3. **Adding Regex Options**:
    - In the options menu, find the "Add Regex Option" button.
    - Fill in the fields for name, regex pattern, and replacement string.
    - Save your settings and use them to tailor your navigation.

## Example Use Case

1. If you're browsing `example.com/about`, clicking the "Localhost" button will take you to `localhost:3000/about`.
2. If you added a regex that matches "about" and replaces it with "home", clicking the Morphlink button will redirect you to `localhost:3000/home`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
