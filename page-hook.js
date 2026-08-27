(() => {
    console.log("[External Runner] page-hook loaded");

    let externalRunning = false;

    function installHook() {
        if (!window.Entry) return false;
        if (!Entry.Command) return false;
        if (!Entry.Command[501]) return false;

        const command = Entry.Command[501];

        if (command.__externalRunnerHooked) {
            return true;
        }

        command.__externalRunnerHooked = true;

        command.do = function (...args) {
            console.log(
                "[External Runner] 501 toggleRun intercepted",
                args
            );

            if (externalRunning) {
                console.log(
                    "[External Runner] already running - ignored"
                );
                return;
            }

            externalRunning = true;

            window.postMessage({
                source: "ENTRY_EXTERNAL_RUN",
                type: "RUN"
            }, "*");

            console.log(
                "[External Runner] external RUN started"
            );
        };

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
