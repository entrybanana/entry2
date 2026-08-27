chrome.runtime.onMessage.addListener((message) => {
    if (!message) {
        return;
    }

    if (message.type === "ENTRY_RUN") {
        console.log(
            "[External Runner] RUN received by background"
        );

        // TODO:
        // 나중에 여기서 외부 실행 프로그램으로
        // RUN 명령을 전달합니다.
    }
});
