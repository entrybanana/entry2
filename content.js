window.addEventListener("message", (event) => {
    if (event.source !== window) return;

    const data = event.data;

    if (
        data &&
        data.source === "ENTRY_EXTERNAL_RUN" &&
        data.type === "RUN"
    ) {
        console.log("[External Runner] RUN received");

        chrome.runtime.sendMessage({
            type: "EXTERNAL_RUN"
        });
    }
});
