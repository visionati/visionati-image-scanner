document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    status: document.getElementById("status"),
    error: document.getElementById("error"),
    historyToolbar: document.getElementById("history-toolbar"),
    prevScan: document.getElementById("prev-scan"),
    scanIndex: document.getElementById("scan-index"),
    nextScan: document.getElementById("next-scan"),
    preview: document.getElementById("preview"),
    previewImage: document.getElementById("preview-image"),
    description: document.getElementById("description"),
    descriptionText: document.getElementById("description-text"),
    prevDesc: document.getElementById("prev-desc"),
    descSource: document.getElementById("desc-source"),
    nextDesc: document.getElementById("next-desc"),
    copyDesc: document.getElementById("copy-desc"),
    tags: document.getElementById("tags"),
    tagsList: document.getElementById("tags-list"),
    nsfw: document.getElementById("nsfw"),
    nsfwStatus: document.getElementById("nsfw-status"),
  };

  chrome.storage.local.get(
    ["currentScanIndex", "latestScanId", "scanHistory"],
    (data) => {
      const scanHistory = data.scanHistory || [];
      let currentScanIndex =
        data.currentScanIndex !== undefined ? data.currentScanIndex : -1;
      const latestScanId = data.latestScanId;

      if (latestScanId && scanHistory.length) {
        const latestIndex = scanHistory.findIndex(
          (scan) => scan.scanId === latestScanId,
        );
        if (latestIndex !== -1) {
          currentScanIndex = latestIndex;
          chrome.storage.local.set(
            { currentScanIndex, latestScanId: null },
            () => {
              updateResults(elements, currentScanIndex);
            },
          );
          return;
        }
      }
      updateResults(elements, currentScanIndex);
    },
  );

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.scanHistory) {
      chrome.storage.local.get("currentScanIndex", (data) => {
        let currentScanIndex =
          data.currentScanIndex !== undefined ? data.currentScanIndex : -1;
        updateResults(elements, currentScanIndex);
      });
    }
  });
});

function updateResults(elements, currentScanIndex) {
  chrome.storage.local.get("scanHistory", (data) => {
    resetDisplay(elements);

    const scanHistory = data.scanHistory || [];
    if (!scanHistory.length) {
      elements.status.textContent = "No scan data available.";
      elements.historyToolbar.classList.add("hidden");
      elements.prevScan.disabled = true;
      elements.nextScan.disabled = true;
      return;
    }

    if (currentScanIndex < 0 || currentScanIndex >= scanHistory.length) {
      currentScanIndex = scanHistory.length - 1;
    }
    updateScanDisplay(scanHistory, currentScanIndex, elements);

    elements.prevScan.onclick = () => {
      chrome.storage.local.get("scanHistory", (updatedData) => {
        const updatedHistory = updatedData.scanHistory || [];
        currentScanIndex = Math.max(0, currentScanIndex - 1);
        chrome.storage.local.set({ currentScanIndex }, () => {
          updateScanDisplay(updatedHistory, currentScanIndex, elements);
        });
      });
    };

    elements.nextScan.onclick = () => {
      chrome.storage.local.get("scanHistory", (updatedData) => {
        const updatedHistory = updatedData.scanHistory || [];
        currentScanIndex = Math.min(
          updatedHistory.length - 1,
          currentScanIndex + 1,
        );
        chrome.storage.local.set({ currentScanIndex }, () => {
          updateScanDisplay(updatedHistory, currentScanIndex, elements);
        });
      });
    };
  });
}

function resetDisplay(elements) {
  elements.status.textContent = "Loading...";
  elements.error.classList.add("hidden");
  elements.historyToolbar.classList.add("hidden");
  elements.preview.classList.add("hidden");
  elements.description.classList.add("hidden");
  elements.tags.classList.add("hidden");
  elements.nsfw.classList.add("hidden");
  elements.prevScan.disabled = true;
  elements.nextScan.disabled = true;
}

function updateScanDisplay(scanHistory, currentScanIndex, elements) {
  if (!scanHistory.length) {
    elements.status.textContent = "No scan data available.";
    elements.historyToolbar.classList.add("hidden");
    elements.prevScan.disabled = true;
    elements.nextScan.disabled = true;
    return;
  }

  currentScanIndex = Math.max(
    0,
    Math.min(currentScanIndex, scanHistory.length - 1),
  );
  elements.scanIndex.textContent = `${currentScanIndex + 1}/${scanHistory.length}`;
  elements.historyToolbar.classList.remove("hidden");

  elements.prevScan.disabled = currentScanIndex === 0;
  elements.nextScan.disabled = currentScanIndex === scanHistory.length - 1;

  displayScan(scanHistory[currentScanIndex], elements);
}

function displayScan(result, elements) {
  elements.status.textContent = "";
  elements.error.classList.add("hidden");
  elements.error.textContent = "";
  elements.description.classList.add("hidden");
  elements.descriptionText.textContent = "";
  elements.tags.classList.add("hidden");
  elements.tagsList.textContent = "";
  elements.nsfw.classList.add("hidden");
  elements.nsfwStatus.textContent = "";

  if (result.dataURL) {
    elements.previewImage.src = result.dataURL;
    elements.preview.classList.remove("hidden");
  }

  if (result.error) {
    elements.error.textContent = result.error;
    elements.error.classList.remove("hidden");
    elements.status.textContent = "Error";
  } else if (result.response_uri) {
    elements.status.textContent = "Processing...";
    pollResponse(result.response_uri, result.scanId, elements);
  } else {
    displayResults(result, elements);
  }
}

function displayResults(result, elements) {
  elements.status.textContent = "";
  const asset = result.all?.assets?.[0];

  let hasResults = false;

  if (asset?.descriptions?.length) {
    let currentIndex = 0;
    const descriptions = asset.descriptions;
    const updateDescription = () => {
      elements.descriptionText.textContent =
        descriptions[currentIndex].description;
      elements.descSource.textContent = formatSource(
        descriptions[currentIndex].source,
      );
    };
    updateDescription();
    elements.description.classList.remove("hidden");
    hasResults = true;

    elements.prevDesc.onclick = () => {
      currentIndex =
        (currentIndex - 1 + descriptions.length) % descriptions.length;
      updateDescription();
    };
    elements.nextDesc.onclick = () => {
      currentIndex = (currentIndex + 1) % descriptions.length;
      updateDescription();
    };
    elements.copyDesc.onclick = () => {
      navigator.clipboard
        .writeText(descriptions[currentIndex].description)
        .then(() => console.log("Description copied"))
        .catch((err) => console.error("Copy failed:", err));
    };
  }

  if (asset?.tags) {
    const allTags = Object.values(asset.tags).flat();
    const uniqueTags = [...new Map(allTags.map((t) => [t.name, t])).values()];
    if (uniqueTags.length) {
      elements.tagsList.textContent = uniqueTags.map((t) => t.name).join(", ");
      elements.tags.classList.remove("hidden");
      hasResults = true;
    }
  }

  if (asset?.nsfw?.length) {
    const isNsfw = asset.nsfw.some(
      (n) =>
        (n.source === "googlecloud" &&
          ["VERY_LIKELY", "LIKELY"].includes(n.likelihood)) ||
        (n.source === "rekognition" && n.score > 0.5) ||
        (n.label === "nsfw" && n.score > 0.5),
    );
    if (isNsfw) {
      const nsfwTags = asset.nsfw
        .filter(
          (n) =>
            n.score > 0.5 || ["VERY_LIKELY", "LIKELY"].includes(n.likelihood),
        )
        .map((n) => n.label);
      elements.nsfwStatus.textContent = `Yes${nsfwTags.length ? ` (${nsfwTags.join(", ")})` : ""}`;
      elements.nsfw.classList.remove("hidden");
      hasResults = true;
    }
  }

  if (!hasResults) {
    elements.status.textContent = "No results returned.";
  }
}

async function pollResponse(uri, scanId, elements) {
  chrome.storage.sync.get("apiKey", async (data) => {
    try {
      const response = await fetch(uri, {
        headers: { "X-API-Key": `Token ${data.apiKey}` },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const result = await response.json();
      if (result.status === "completed") {
        chrome.storage.local.get(
          ["scanHistory", "currentScanIndex"],
          (data) => {
            const scanHistory = data.scanHistory || [];
            const scanIndex = scanHistory.findIndex(
              (scan) => scan.scanId === scanId,
            );
            if (scanIndex !== -1) {
              scanHistory[scanIndex] = {
                ...result,
                dataURL: scanHistory[scanIndex].dataURL,
                timestamp: Date.now(),
                scanId,
              };
              const currentScanIndex =
                data.currentScanIndex !== undefined
                  ? data.currentScanIndex
                  : scanHistory.length - 1;
              chrome.storage.local.set({ scanHistory }, () => {
                updateResults(elements, currentScanIndex);
              });
            } else {
              console.error("Scan ID not found in history:", scanId);
            }
          },
        );
      } else if (result.status === "queued" || result.status === "processing") {
        setTimeout(() => pollResponse(uri, scanId, elements), 2000);
      } else {
        elements.status.textContent = "Error";
        elements.error.textContent = result.error || "Unexpected response";
        elements.error.classList.remove("hidden");
      }
    } catch (err) {
      elements.status.textContent = "Error";
      elements.error.textContent = err.message;
      elements.error.classList.remove("hidden");
    }
  });
}

function formatSource(source) {
  const sources = {
    openai: "OpenAI",
    gemini: "Gemini",
    grok: "Grok",
    claude: "Claude",
    llava: "LLaVA",
    bakllava: "BakLLaVA",
    jinaai: "Jina AI",
  };
  return sources[source] || source;
}
