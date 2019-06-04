// send message to background
export const sendMessage = (type, payload) => {
  chrome.extension.sendMessage({
      type,
      payload,
  });
};

export const addExtensionListener = (listener) =>
  chrome.extension.onMessage.addListener(listener);