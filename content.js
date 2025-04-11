async function toDataURL(url) {
  if (url.startsWith("data:image/")) {
    return url;
  }
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.blob();
    })
    .then((blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    })
    .catch((err) => {
      console.error("Fetch error:", err.message);
      throw err;
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getImageDataURL") {
    toDataURL(message.url)
      .then((dataURL) => {
        sendResponse({ dataURL, error: null });
      })
      .catch((err) => {
        sendResponse({ dataURL: null, error: err.message });
      });
  }
  return true;
});
