const script = document.createElement("script");

script.src = chrome.runtime.getURL("page-hook.js");

script.onload = () => {
    script.remove();
};

(document.head || document.documentElement).appendChild(script);

window.addEventListener("ENTRY_EXTERNAL_RUN", () => {
    console.log("[External Runner] content.js → RUN");

    chrome.runtime.sendMessage({
        type: "ENTRY_RUN"
    });
});
