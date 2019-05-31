export default function(text) {
    chrome.tabs.getSelected(null, function(tab){
        chrome.browserAction.setBadgeText({ text });
    });
}
