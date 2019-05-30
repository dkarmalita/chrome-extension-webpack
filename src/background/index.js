console.log('%cColdFire v0.1.0-dev.1', "color: red; font-size:15px;", (new Date).toISOString(), chrome.runtime.id )
// extension's background apge

// Listens

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "super-power":
            superPower();
            break;
    }
    return true;
});

var superPower = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "super-power"});
        chrome.browserAction.setBadgeText({text: "Wow!"});
    });
}