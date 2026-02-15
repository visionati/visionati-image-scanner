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

Capture from Chrome with the extension installed. Use a clean browsing session (no other extensions visible). Save as PNG.

| File | What to Capture | Tips | Status |
|------|----------------|------|--------|
| `screenshot-1.png` | **Right-click context menu**: "Scan with Visionati" menu item on an interesting image (nature, food, architecture, etc.) | Use a visually appealing webpage. Show the context menu overlaying the image so the workflow is obvious in one glance. Crop to show the image and menu together, not the full browser window. | ⏳ Needed |
| `screenshot-2.png` | **Scan results: description**: Popup showing image preview, a compelling AI description, and the source/cycling toolbar | Pick an image that produces a vivid, impressive description. Show the prev/next and Copy buttons so people see they get multiple AI perspectives. | ⏳ Needed |
| `screenshot-3.png` | **Scan results: tags and NSFW**: Popup scrolled down to show tags with confidence scores and NSFW status | Use a safe image with diverse, interesting tags. The tag list and NSFW "safe" indicator show the detection backends at work. | ⏳ Needed |
| `screenshot-4.png` | **Scan history**: Navigating between previous scans using the history toolbar arrows | Show a different image/result than screenshot 2-3, with the history index visible (e.g., "2 / 5") to demonstrate the history feature. | ⏳ Needed |
| `screenshot-5.png` | **Settings page**: API key field, backend checkboxes, role picker, language dropdown, custom prompt textarea | Scroll or resize to show as much of the settings as possible. Have a few backends checked (the recommended ones marked with *). Show a role other than General selected to hint at the variety. | ⏳ Needed |

### Capture Tips

- **Browser window**: use a clean Chrome profile with no bookmarks bar, no other extensions, default theme
- **Popup screenshots** (2, 3, 4): right-click the extension icon → Inspect Popup, then use DevTools to screenshot the popup at a clean size. Or use a screen capture tool to grab just the popup.
- **Context menu screenshot** (1): this is the hardest to capture cleanly. Use a timed screenshot tool (e.g., macOS Screenshot with timer, or Snipping Tool delay on Windows) so you can right-click and have the menu open when it fires.
- **Settings screenshot** (5): open the options page in a tab (`chrome-extension://<id>/options.html`), resize the browser window to ~400px wide to match the extension's `width: 350px` body style, or screenshot the content area only.
- **Final size**: crop/resize all screenshots to exactly **1280×800** for consistency across both stores. If the content doesn't fill that, center it on a light background (#f5f5f5 or white).
- **No personal data**: make sure no real API key is visible in screenshots. Use a placeholder or blur it.

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

**Summary** (132 char max):
> AI image analysis: right-click any image for descriptions, tags, and NSFW detection. 7 AI models, 12 roles, 160+ languages.

**Description** (16,000 char max, no markdown):
```
Right-click any image on any webpage to get AI-powered analysis from multiple AI services at once.

WHAT YOU GET
• AI Descriptions — rich, detailed descriptions from up to 7 AI models (OpenAI, Claude, Gemini, Grok, Jina AI, LLaVA, BakLLaVA). Cycle through them to compare perspectives.
• Tags — object and concept labels with confidence scores from computer vision services (Clarifai, Google Vision, Imagga, Rekognition).
• NSFW Detection — content moderation scores so you know what you're looking at.

12 BUILT-IN ROLES
Tailor the AI's perspective: Alt Text for accessibility, Ecommerce for product descriptions, Caption for social media, Artist for creative analysis, and 8 more. Or write your own custom prompt.

160+ LANGUAGES
Get descriptions in English, Spanish, Japanese, Arabic, Hindi, and 155+ other languages.

HOW IT WORKS
1. Install the extension and enter your Visionati API key (get one at api.visionati.com).
2. Right-click any image and select "Scan with Visionati."
3. View results in the popup — descriptions, tags, and NSFW status.
4. Use the Copy button to grab any description instantly.
5. Navigate scan history with the toolbar arrows.

Supports JPEG, PNG, GIF, and WebP images.

Powered by the Visionati API — one request, multiple AI perspectives.
```

**Category**: Accessibility (or Productivity)

**Language**: English

### Firefox Add-ons

**Name**: Visionati Image Scanner

**Summary** (250 char max):
> Right-click any image for AI-powered descriptions, tags, and NSFW detection. 7 AI models, 12 roles, 160+ languages. One scan, multiple perspectives.

**Description**: same as Chrome but with markdown formatting (Firefox supports it).

**Categories**: Other (Firefox has limited categories for extensions)

**Tags**: images, accessibility, AI, alt text, descriptions, tags

**Note**: Firefox does not support auto-opening the popup after scan. This is mentioned in the extension's options page and should be noted in the description if relevant.

## Publishing Checklist

### Chrome Web Store

- [ ] All 5 screenshots captured at 1280×800
- [x] Small promotional image created (440×280)
- [x] Marquee promotional image created (1400×560)
- [ ] Store listing copy reviewed (summary under 132 chars)
- [ ] Description updated (check that role list and backend list are current)
- [ ] Category selected
- [ ] Verify current screenshots match current UI (re-capture if UI has changed)
- [ ] Privacy policy URL (if required): link to visionati.com privacy page
- [ ] Test extension from Web Store install (not just unpacked)

### Firefox Add-ons

- [ ] Screenshots uploaded (reuse Chrome screenshots)
- [ ] Summary and description updated
- [ ] Tags added
- [ ] Note about popup not auto-opening in Firefox
- [ ] Test extension from Add-ons install (not just temporary)

### Both Stores

- [ ] No real API key visible in any screenshot
- [ ] Screenshots show current UI (roles, backends, features all match)
- [ ] Version number in manifest.json matches what's published
- [ ] README.md in repo root is up to date