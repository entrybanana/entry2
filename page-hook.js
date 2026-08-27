(() => {
    console.log("[External Runner] page-hook loaded");

    function installHook() {
        if (!window.Entry) {
            return false;
        }

        if (!Entry.Command) {
            return false;
        }

        if (!Entry.Command[501]) {
            return false;
        }

        const command = Entry.Command[501];

        if (command.__externalRunnerHooked) {
            return true;
        }

        const originalDo = command.do;

        command.do = function (...args) {
            console.log(
                "[External Runner] 501 toggleRun intercepted",
                args
            );

            window.postMessage(
                {
                    source: "ENTRY_EXTERNAL_RUN",
                    type: "RUN"
                },
                "*"
            );

            // originalDo를 호출하지 않음
            // → Entry 기본 실행 차단
        };

        command.__externalRunnerHooked = true;

        console.log(
            "[External Runner] 501 hook installed"
        );

        return true;
    }

    const timer = setInterval(() => {
        if (installHook()) {
            clearInterval(timer);
        }
    }, 100);
})();
