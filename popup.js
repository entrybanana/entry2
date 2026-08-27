const status = document.getElementById("status");
const statusDot = document.getElementById("statusDot");

const runButton = document.getElementById("run");
const stopButton = document.getElementById("stop");

function updateStatus(running) {
    if (running) {
        status.textContent = "상태: 실행 중";
        statusDot.style.background = "#22c55e";
    } else {
        status.textContent = "상태: 대기 중";
        statusDot.style.background = "#9ca3af";
    }
}

// 팝업을 열 때 현재 상태 가져오기
chrome.runtime.sendMessage({
    type: "GET_STATUS"
}, (response) => {
    if (chrome.runtime.lastError) return;

    if (response) {
        updateStatus(response.running);
    }
});

// 실행
runButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        type: "EXTERNAL_RUN"
    });

    updateStatus(true);
});

// 정지
stopButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        type: "EXTERNAL_STOP"
    });

    updateStatus(false);
});
