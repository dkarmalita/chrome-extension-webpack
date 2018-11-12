// https://www.raymondcamden.com/2012/07/15/How-to-add-a-panel-to-Chrome-Dev-Tools
chrome.devtools.panels.create(
  "ColdFire",
  "coldfusion10.png",
  "panel.html",
  function(panel) {
    console.log("devtool callback");
  }
);

console.log("devtool is loaded");
