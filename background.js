chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message) return;

    if (message.type === "ENTRY_RUN") {
        console.log("[External Runner] RUN received by background");

        sendResponse({
            success: true,
            type: "RUN"
        });
    }
});
