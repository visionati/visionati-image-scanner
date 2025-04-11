const DEFAULT_BACKENDS = [
  "claude",
  "gemini",
  "grok",
  "openai",
  "clarifai",
  "googlevision",
  "rekognition",
];
const DEFAULT_HISTORY_DEPTH = 10;

const SUPPORTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

let scanQueue = [];
let isProcessing = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["apiKey", "backends", "historyDepth"], (data) => {
    let settings = data || {};
    if (!settings.apiKey && !settings.backends && !settings.historyDepth) {
      chrome.storage.sync.set({
        apiKey: "",
        backends: DEFAULT_BACKENDS,
        historyDepth: DEFAULT_HISTORY_DEPTH,
      });
    }
  });

  chrome.contextMenus.create({
    id: "scanImage",
    title: "Scan with Visionati",
    contexts: ["image"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "scanImage") return;

  chrome.tabs.sendMessage(
    tab.id,
    { action: "getImageDataURL", url: info.srcUrl },
    handleImageResponse,
  );
});

function handleImageResponse(response) {
  if (!response) {
    console.error("No response received from content script");
    queueScanResult({ error: "No response from content script" }, null);
    return;
  }

  if (response.error) {
    console.error("Image load error:", response.error);
    queueScanResult({ error: response.error }, response.dataURL);
    return;
  }

  if (!response.dataURL) {
    console.error("No valid image Data URL received:", response);
    queueScanResult({ error: "Failed to load image" }, null);
    return;
  }

  const dataURLMimeMatch = response.dataURL.match(/^data:([^;]+);base64,/);
  if (!dataURLMimeMatch || !dataURLMimeMatch[1]) {
    console.error("Invalid data URL format:", response.dataURL);
    queueScanResult({ error: "Invalid image data format." }, response.dataURL);
    return;
  }

  const mimeType = dataURLMimeMatch[1];
  if (!SUPPORTED_MIME_TYPES.includes(mimeType)) {
    const errorMsg = `Unsupported image format: ${mimeType}. Supported formats: ${SUPPORTED_MIME_TYPES.join(", ")}.`;
    console.error(errorMsg);
    queueScanResult({ error: errorMsg }, response.dataURL);
    return;
  }

  chrome.storage.sync.get(["apiKey", "backends"], (data) => {
    const apiKey = data.apiKey || "";
    const backends = data.backends || [];

    if (!apiKey) {
      queueScanResult(
        { error: "API key not set. Please configure in options." },
        response.dataURL,
      );
      return;
    }

    fetchImageAnalysis(response.dataURL, apiKey, backends);
  });
}

async function fetchImageAnalysis(dataURL, apiKey, backends) {
  const payload = {
    feature: ["nsfw", "tags", "descriptions"],
    file: [dataURL],
    backend: backends,
    tag_score: 0.85,
  };

  try {
    const response = await fetch("https://api.visionati.com/api/fetch", {
      method: "POST",
      headers: {
        "X-API-Key": `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const result = await response.json();
    const scanId = Date.now() + Math.random().toString(36).substr(2, 9);
    queueScanResult({ ...result, scanId }, dataURL);
  } catch (err) {
    console.error("API Error:", err.message);
    queueScanResult({ error: err.message }, dataURL);
  }
}

function queueScanResult(result, dataURL) {
  scanQueue.push({ result, dataURL });
  processScanQueue();
}

function processScanQueue() {
  if (isProcessing || scanQueue.length === 0) return;
  isProcessing = true;

  const { result, dataURL } = scanQueue.shift();
  setScanResult(result, dataURL);
}

function setScanResult(result, dataURL) {
  chrome.storage.sync.get("historyDepth", (syncData) => {
    const historyDepth = syncData.historyDepth || DEFAULT_HISTORY_DEPTH;
    chrome.storage.local.get("scanHistory", (localData) => {
      let scanHistory = localData.scanHistory || [];
      const newScan = { ...result, dataURL, timestamp: Date.now() };

      scanHistory = scanHistory.filter((scan) => !scan.error);
      scanHistory.push(newScan);
      while (scanHistory.length > historyDepth) {
        scanHistory.shift();
      }

      const scanId =
        newScan.scanId || (result.error ? `error-${Date.now()}` : null);
      const currentScanIndex = scanHistory.length - 1;
      chrome.storage.local.set(
        { scanHistory, currentScanIndex, latestScanId: scanId },
        () => {
          if (chrome.action && chrome.action.openPopup) {
            chrome.action
              .openPopup()
              .then(() => console.log("Popup opened successfully"))
              .catch((err) => console.error("Popup Error:", err.message));
          } else {
            console.log(
              "Popup not supported; click the extension icon to view results.",
            );
          }
          isProcessing = false;
          processScanQueue();
        },
      );
    });
  });
}
