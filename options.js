document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("apiKey");
  const historyDepthSelect = document.getElementById("historyDepth");
  const backendCheckboxes = document.querySelectorAll("input[name='backend']");
  const saveButton = document.getElementById("save");
  const resetHistoryButton = document.getElementById("resetHistory");
  const statusDiv = document.getElementById("status");

  saveButton.disabled = true;
  function updateSaveButtonState() {
    const apiKey = apiKeyInput.value.trim();
    const checkedBackends = Array.from(backendCheckboxes).filter(
      (cb) => cb.checked,
    ).length;
    saveButton.disabled = !apiKey || checkedBackends === 0;
  }

  apiKeyInput.addEventListener("input", updateSaveButtonState);
  backendCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateSaveButtonState);
  });
  historyDepthSelect.addEventListener("change", updateSaveButtonState);

  const defaultBackends = [
    "claude",
    "gemini",
    "grok",
    "openai",
    "clarifai",
    "googlevision",
    "rekognition",
  ];

  chrome.storage.sync.get(["apiKey", "backends", "historyDepth"], (data) => {
    const apiKey = data.apiKey || "";
    const backends = data.backends || defaultBackends;
    const historyDepth = data.historyDepth || "10";

    apiKeyInput.value = apiKey;
    historyDepthSelect.value = historyDepth;
    backendCheckboxes.forEach((checkbox) => {
      checkbox.checked = backends.includes(checkbox.value);
    });
    updateSaveButtonState();
  });

  saveButton.addEventListener("click", () => {
    const apiKey = apiKeyInput.value.trim();
    const historyDepth = parseInt(historyDepthSelect.value, 10);
    const backends = Array.from(backendCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    if (!apiKey) {
      statusDiv.textContent = "Please enter an API key.";
      statusDiv.className = "error";
      setTimeout(() => {
        statusDiv.textContent = "";
        statusDiv.className = "";
      }, 2000);
      return;
    }

    chrome.storage.sync.set({ apiKey, backends, historyDepth }, () => {
      chrome.storage.local.get("scanHistory", (localData) => {
        let scanHistory = localData.scanHistory || [];
        while (scanHistory.length > historyDepth) {
          scanHistory.shift();
        }
        chrome.storage.local.set({ scanHistory }, () => {
          statusDiv.textContent = "Settings saved!";
          statusDiv.className = "success";
          setTimeout(() => {
            statusDiv.textContent = "";
            statusDiv.className = "";
          }, 2000);
        });
      });
    });
  });

  resetHistoryButton.addEventListener("click", () => {
    chrome.storage.local.set({ scanHistory: [] }, () => {
      statusDiv.textContent = "Scan history reset!";
      statusDiv.className = "success";
      setTimeout(() => {
        statusDiv.textContent = "";
        statusDiv.className = "";
      }, 2000);
    });
  });
});
