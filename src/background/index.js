console.log('%cColdFire v0.1.0-dev.1', "color: red; font-size:15px;", (new Date).toISOString(), chrome.runtime.id )
// extension's background apge

// Listens

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case 'super-power':
            superPower(request.payload);
            break;
        case 'panda-info':
            console.log('panda-info', request.payload);
            break;
        case 'echo':
            console.log('echo', request.payload);
            break;
    }
    return true;
});

var superPower = function(state) {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: 'super-power'}); // send message to selected tab
        chrome.browserAction.setBadgeText({text: state ? 'Wow!' : ''});
    });
}