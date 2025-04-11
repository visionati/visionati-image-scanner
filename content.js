async function toDataURL(url) {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      return null;
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getImageDataURL") {
    toDataURL(message.url).then((dataURL) => {
      sendResponse({ dataURL });
    });
  }
  return true;
});
