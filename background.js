chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "ENTRY_RUN") {
        console.log("[External Runner] RUN received");
    }
});
