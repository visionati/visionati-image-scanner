# Browser Extension Store Assets

Assets for the Visionati Image Scanner listings on the [Chrome Web Store](https://chromewebstore.google.com/detail/gdfpjjaflomhniipphhangfaodlhjifb) and [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/visionati-image-scanner/).

## Icons

Already in the repo root. No duplicates needed here.

| File | Size | Used By |
|------|------|---------|
| `../icon16.png` | 16×16 | Browser toolbar |
| `../icon48.png` | 48×48 | Extensions page |
| `../icon128.png` | 128×128 | Chrome Web Store, Firefox Add-ons |

## Screenshots

Chrome Web Store accepts **1280×800** or **640×400** PNG/JPEG (up to 5 screenshots).
Firefox Add-ons accepts any reasonable size (aim for **1280×800** for consistency).

All screenshots captured from Brave (Chromium-based, works for both Chrome Web Store and Firefox Add-ons listings). Source image: Hi'ilawe Falls, Waipio Valley on Unsplash.

| File | What it Shows | Status |
|------|--------------|--------|
| `screenshot-1.png` | **Right-click context menu**: "Scan with Visionati" on the Unsplash image page, showing the entry point | ✅ Ready |
| `screenshot-2.png` | **Full browser with popup**: Scan results overlaying the Unsplash page, showing the real-world in-context experience | ✅ Ready |
| `screenshot-3.png` | **Isolated popup**: Detailed view of the description (Gemini), prev/next/Copy cycling toolbar, and tags. Scrollbar visible to indicate more content below. | ✅ Ready |
| `screenshot-4.png` | **Settings page**: API key, history depth, auto-open toggle, role picker, language, custom prompt, description backends (Claude, Gemini, Grok, OpenAI checked), detection backends (Clarifai, Google Vision, Rekognition checked) | ✅ Ready |

## Promotional Images (Chrome Web Store)

Optional but recommended. These appear in search results and featured sections.

| File | Size | Description | Status |
|------|------|-------------|--------|
| `promo-small-440x280.png` | 440×280 | Small promotional tile (shows in search results) | ✅ Ready |
| `promo-marquee-1400x560.png` | 1400×560 | Large marquee banner (shows if featured) | ✅ Ready |

Generated via `promo-generator.html` (same pattern as WordPress `banner-generator.html` and Figma `cover-generator.html`). Dark slate background, high-res swirl icon (`icon-512x512.png` from marketing site), orange SVG wordmark, feature pills (Descriptions, Tags, NSFW, 12 Roles). Open in Chrome, DevTools → select element → Capture node screenshot to re-export.

## Store Listing Copy

### Chrome Web Store

**Name**: Visionati Image Scanner

**Summary**:
> Right-click any image on the web. Get AI-powered descriptions, alt text, tags, and content screening in seconds.

**Description** (live on Chrome Web Store):
```
Visionati Image Scanner sends images to the Visionati API, where multiple AI models analyze them and return results directly in your browser. Pick from models by Anthropic, Google, OpenAI, xAI, and others.

What it does:

- Right-click any JPEG, PNG, GIF, or WebP image and select "Scan with Visionati"
- Get AI-generated descriptions, object tags, and NSFW detection in a popup
- Generate alt text for accessibility with the dedicated Alt Text role
- Choose from 12 built-in roles to shape the output: Alt Text, Artist, Caption, Comedian, Critic, Ecommerce, General, Inspector, Promoter, Prompt, Realtor, and Tweet
- Write custom prompts for full control over what the AI focuses on
- Output in 160+ languages
- Browse past scans with navigable history (configurable up to 50 entries)

Who it's for:

- Web developers and content creators who need alt text for accessibility
- Marketers generating captions and product descriptions from images
- Anyone curious about what AI sees in an image

Setup:

1. Install the extension
2. Open Settings and enter your Visionati API key (sign up at api.visionati.com)
3. Pick your AI models, role, and language
4. Right-click an image and scan

Images are processed securely via the Visionati API. The extension never sends data anywhere else. Settings sync across devices.

Requires a Visionati API account. Sign up and purchase credits at api.visionati.com.
```

**Category**: Tools

**Language**: English

### Firefox Add-ons

**Name**: Visionati Image Scanner

**Summary**:
> Right-click any image to get AI-powered descriptions, alt text, tags, and content screening. Pick your AI model, choose from 12 roles, and output in 160+ languages. Powered by the Visionati API with models from Anthropic, Google, OpenAI, and xAI.

**Description** (live on Firefox Add-ons):
```
Right-click any image on the web. Get AI-powered descriptions, alt text, tags, and content screening in seconds.

Visionati Image Scanner sends images to the Visionati API, where multiple AI models analyze them and return results directly in your browser. Pick from models by Anthropic, Google, OpenAI, xAI, and others.

What it does:
Right-click any JPEG, PNG, GIF, or WebP image and select "Scan with Visionati"
Get AI-generated descriptions, object tags, and NSFW detection in a popup
Generate alt text for accessibility with the dedicated Alt Text role
Choose from 12 built-in roles to shape the output: Alt Text, Artist, Caption, Comedian, Critic, Ecommerce, General, Inspector, Promoter, Prompt, Realtor, and Tweet
Write custom prompts for full control over what the AI focuses on
Output in 160+ languages
Browse past scans with navigable history (configurable up to 50 entries)

Who it's for:
Web developers and content creators who need alt text for accessibility
Marketers generating captions and product descriptions from images
Anyone curious about what AI sees in an image

Setup:
Install the extension
Open Settings and enter your Visionati API key (sign up at api.visionati.com)
Pick your AI models, role, and language
Right-click an image and scan

Images are processed securely via the Visionati API. The extension never sends data anywhere else.

Note: The "Automatically open popup after scan" option is not supported in Firefox. Click the extension icon to view results after scanning.

Requires a Visionati API account. Sign up and purchase credits at api.visionati.com.
```

**Tags**: image search

## Publishing Checklist

### Chrome Web Store

- [x] All 4 screenshots captured at 1280×800
- [x] Small promotional image created (440×280)
- [x] Marquee promotional image created (1400×560)
- [x] Store listing copy reviewed
- [x] Description updated
- [x] Category selected (Tools)
- [x] Screenshots match current UI
- [x] Analytics opted in
- [x] Privacy policy URL: https://visionati.com/privacy-policy/
- [x] Test extension from Web Store install

### Firefox Add-ons

- [x] Screenshots uploaded (reused Brave screenshots)
- [x] Summary and description updated
- [x] Tags added
- [x] Note about popup not auto-opening in Firefox
- [x] Test extension from Add-ons install

### Both Stores

- [x] No real API key visible in any screenshot
- [x] Screenshots show current UI (roles, backends, features all match)
- [x] Version number in manifest.json matches what's published
- [x] README.md in repo root is up to date