let running = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message) return;

    if (message.type === "EXTERNAL_RUN") {
        running = true;

        console.log("[External Runner] RUN");
        return;
    }

    if (message.type === "EXTERNAL_STOP") {
        running = false;

        console.log("[External Runner] STOP");
        return;
    }

    if (message.type === "GET_STATUS") {
        sendResponse({
            running: running
        });

        return true;
    }
});
