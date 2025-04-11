# Visionati Image Scanner

A browser extension to analyze images using the [Visionati API](https://visionati.com). Right-click any image on a webpage to get AI-generated descriptions, tags, and NSFW status.

## Features

- **Image Analysis**: Converts images to Base64 Data URLs for secure API calls to Visionati.
- **Customizable Backends**: Choose from multiple AI providers (e.g., OpenAI, Grok, Google Vision, Claude) in settings.
- **Results Popup**: Displays descriptions, tags, and NSFW status with async polling for real-time updates.
- **Scan History**: Stores recent scans (configurable depth: 5, 10, 25, 50) with navigation via toolbar arrows.
- **Error Handling**: Shows errors (e.g., "API key not set") and clears them on successful scans; displays "No results returned" when applicable.
- **Reset Option**: Clear scan history from the options page.

## Installation

1. Clone this repo: `git clone https://github.com/visionati/visionati-image-scanner.git`
2. **Chrome**: Go to `chrome://extensions/`, enable "Developer mode," click "Load unpacked," and select the `visionati-image-scanner` folder.
3. **Firefox**: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on," and choose `manifest.json` from the folder.

## Usage

1. Open the extension’s options (right-click icon > "Options" or via `chrome://extensions/`).
2. Enter your Visionati API key from [api.visionati.com](https://api.visionati.com).
3. Select desired AI backends (e.g., OpenAI for descriptions, Google Vision for tags).
4. Set history depth (default: 10) and save settings.
5. Right-click an image on any webpage and select "Scan with Visionati."
6. View results in the popup—navigate history with arrows, reset via options if needed.

**Note**: Supports raster images (e.g., PNG, JPEG). SVGs may show the menu but won’t process correctly.

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
