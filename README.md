# Visionati Image Scanner

A browser extension to analyze images using the [Visionati API](https://visionati.com). Right-click any image on a webpage to get AI-generated descriptions, tags, and NSFW status.

## Features

- **Image Analysis**: Converts images to Base64 Data URLs for secure API calls to Visionati.
- **Alt Text Generation**: Use the Alt Text role to generate concise, accessibility-focused alt text for any image.
- **Customizable Backends**: Choose from multiple AI providers (e.g., OpenAI, Grok, Google Vision, Claude) in settings.
- **12 Built-in Roles**: Alt Text, Artist, Caption, Comedian, Critic, Ecommerce, General, Inspector, Promoter, Prompt, Realtor, and Tweet.
- **Results Popup**: Displays descriptions, tags, and NSFW status with async polling for real-time updates.
- **Scan History**: Stores recent scans (configurable depth: 5, 10, 25, 50) with navigation via toolbar arrows.
- **Error Handling**: Shows errors (e.g., "API key not set") and clears them on successful scans; displays "No results returned" when applicable.
- **Reset Option**: Clear scan history from the options page.

## Installation

1. **Chrome/Brave/Edge**: Visit [https://chromewebstore.google.com/detail/gdfpjjaflomhniipphhangfaodlhjifb](https://chromewebstore.google.com/detail/gdfpjjaflomhniipphhangfaodlhjifb) and click "Add to Chrome/Brave/Edge"
2. **Firefox**: Visit [https://addons.mozilla.org/en-US/firefox/addon/visionati-image-scanner/](https://addons.mozilla.org/en-US/firefox/addon/visionati-image-scanner/) and click "Add to Firefox"!
3. To install from source, clone this repo: `git clone https://github.com/visionati/visionati-image-scanner.git`. For Chrome based browsers go to `chrome://extensions/`, enable "Developer mode," click "Load unpacked," and select the `visionati-image-scanner` folder. For Firefox go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on," and choose `manifest.json` from the folder.

## Usage

1. Open the extension’s options (right-click icon > "Options" or via `chrome://extensions/`).
2. Enter your Visionati API key from [api.visionati.com](https://api.visionati.com).
3. Select desired AI backends (e.g., OpenAI for descriptions, Google Vision for tags).
4. Set history depth (default: 10) and choose whether to automatically open the popup after scanning (default: enabled).
5. Choose your role (default: General) to tailor analysis (e.g., Alt Text for accessibility, Artist for artistic analysis, Ecommerce for product descriptions, Tweet for social media) and enter a custom prompt to guide the analysis (optional).
6. Save settings.
7. Right-click an image on any webpage and select "Scan with Visionati."
8. View results in the popup (if auto-open is enabled) or by clicking the extension icon—navigate history with arrows, reset via options if needed.

**Supported Formats**: JPEG, PNG, GIF, WebP.
**Note**: Unsupported formats like SVG will show the right-click menu but result in an error explaining the supported formats. The "Automatically open popup after scan" option is not supported in Firefox; Firefox users must manually click the extension icon to view results.

## Development

- **Manifest**: Built with Manifest V3 for Chrome and Firefox compatibility.
- **API**: Uses Visionati’s `POST /api/fetch` endpoint—see [docs.visionati.com](https://docs.visionati.com) for details.
- **Files**:
  - `background.js`: Handles API calls and history management.
  - `popup.js/html`: Displays results and navigation.
  - `options.js/html`: Configures API key, backends, and history settings.

## Contributing

Pull requests are welcome! Please:

- Test changes thoroughly (e.g., scan with/without API key).
- Update `README.md` for new features or instructions.
- Submit issues for bugs or suggestions.

## License

MIT License - see [LICENSE](LICENSE) file.
