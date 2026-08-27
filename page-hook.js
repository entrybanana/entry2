(() => {
    function hook() {
        if (!window.Entry || !Entry.Command || !Entry.Command[501]) {
            return false;
        }

        const command = Entry.Command[501];

        if (command.__externalRunnerHooked) {
            return true;
        }

        command.__externalRunnerHooked = true;

        const originalDo = command.do;

        command.do = function (...args) {
            console.log(
                "[External Runner] 501 toggleRun intercepted",
                args
            );

            window.dispatchEvent(
                new CustomEvent("ENTRY_EXTERNAL_RUN")
            );

            // 중요:
            // originalDo()를 호출하지 않는다.
            // 따라서 Entry 기본 실행이 발생하지 않는다.
        };

        console.log("[External Runner] 501 hook installed");

        return true;
    }

    const timer = setInterval(() => {
        if (hook()) {
            clearInterval(timer);
        }
    }, 100);
})();
