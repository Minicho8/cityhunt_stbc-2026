// Configure your game times here (ISO strings or timestamps)
const GAME_START_TIME = new Date("2026-08-04T00:00:00").getTime();
const GAME_END_TIME   = new Date("2026-08-04T01:06:00").getTime();

const statusCard  = document.getElementById('statusCard');
const statusTitle = document.getElementById('statusTitle');
const statusMsg   = document.getElementById('statusMsg');
const hoursVal    = document.getElementById('hoursVal');
const minsVal     = document.getElementById('minsVal');
const secsVal     = document.getElementById('secsVal');

function pad(num) {
    return String(num).padStart(2, '0');
}

function updateWidget() {
    const now = new Date().getTime();

    statusCard.className = "status-card"; // Reset classes

    if (now < GAME_START_TIME) {
        // --- State: Pending (Before Start) ---
        statusCard.classList.add('state-pending');
        statusTitle.textContent = "遊戲即將開始 (UPCOMING)";
        statusMsg.textContent = "請準備，任務即將解鎖！";

        const diff = GAME_START_TIME - now;
        updateDisplay(diff);

    } else if (now >= GAME_START_TIME && now <= GAME_END_TIME) {
        const timeLeft = GAME_END_TIME - now;
        const minutesLeft = timeLeft / (1000 * 60);

        if (minutesLeft <= 15) {
            // --- State: Return Phase (Final 15 mins) ---
            statusCard.classList.add('state-return');
            statusTitle.textContent = "請返回營地！ (RETURN SOON)";
            statusMsg.textContent = "比賽即將結束，請立即回程！";
        } else if (minutesLeft <= 30) {
            // --- State: Urgent Phase (Final 30 mins) ---
            statusCard.classList.add('state-urgent');
            statusTitle.textContent = "最後衝刺階段！ (URGENT)";
            statusMsg.textContent = "剩餘時間不多，加緊完成任務！";
        } else {
            // --- State: Live / In-Progress ---
            statusCard.classList.add('state-live');
            statusTitle.textContent = "遊戲進行中 (LIVE)";
            statusMsg.textContent = "全力以赴，群體合一！";
        }

        updateDisplay(timeLeft);

    } else {
        // --- State: Ended ---
        statusCard.classList.add('state-ended');
        statusTitle.textContent = "遊戲已結束！多謝參與！";
        statusMsg.textContent = "感謝您的熱烈支持與參與！";
        
        hoursVal.textContent = "00";
        minsVal.textContent = "00";
        secsVal.textContent = "00";
    }
}

function updateDisplay(ms) {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    hoursVal.textContent = pad(hours);
    minsVal.textContent = pad(mins);
    secsVal.textContent = pad(secs);
}

// Run immediately and update every second
updateWidget();
setInterval(updateWidget, 1000);