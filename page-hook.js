(() => {
    function hook() {
        if (
            !window.Entry ||
            !Entry.Command ||
            !Entry.Command[501]
        ) {
            return false;
        }

        const command = Entry.Command[501];

        // 중복 후킹 방지
        if (command.__externalRunnerHooked) {
            return true;
        }

        command.__externalRunnerHooked = true;

        command.do = function (...args) {
            console.log(
                "[External Runner] 501 toggleRun intercepted",
                args
            );

            // content.js로 전달
            window.postMessage(
                {
                    source: "ENTRY_EXTERNAL_RUN",
                    type: "RUN"
                },
                "*"
            );

            // 중요:
            // 원래 command.do()를 호출하지 않음
            // → Entry 기본 실행을 막음
        };

        console.log(
            "[External Runner] 501 hook installed"
        );

        return true;
    }

    // Entry가 로드될 때까지 기다림
    const timer = setInterval(() => {
        if (hook()) {
            clearInterval(timer);
        }
    }, 100);
})();
