const status = document.getElementById("status");
const runButton = document.getElementById("run");
const stopButton = document.getElementById("stop");

function setStatus(text) {
    status.textContent = "상태: " + text;
}

runButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        type: "EXTERNAL_RUN"
    });

    setStatus("실행 중");
});

stopButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        type: "EXTERNAL_STOP"
    });

    setStatus("정지");
});
