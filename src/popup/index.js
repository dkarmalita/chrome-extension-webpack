import './styles.css'

// Popup

window.onload = function() {
    document.getElementById("button").onclick = function() {

        // it's sending super-power message which we are going to detect in script.js
        chrome.extension.sendMessage({
            type: "super-power"
        });
    }
}