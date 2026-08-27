// 페이지의 postMessage 수신
window.addEventListener("message", (event) => {
    // 다른 창/프레임에서 온 메시지는 무시
    if (event.source !== window) {
        return;
    }

    const data = event.data;

    if (!data) {
        return;
    }

    if (
        data.source === "ENTRY_EXTERNAL_RUN" &&
        data.type === "RUN"
    ) {
        console.log(
            "[External Runner] RUN received"
        );

        // background.js로 전달
        chrome.runtime.sendMessage({
            type: "ENTRY_RUN"
        });
    }
});
