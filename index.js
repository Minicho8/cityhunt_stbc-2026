// --- MAP IDs TO PASSWORDS & TARGET URLs ---
const pageData = {
    "test": {
    "34": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436565",
    img: "../img/img1.jpeg",
    context: "請找出此處的地產公司的電話號碼(格式:XXXXXXXX)"
    },
    "202608chk1": {
    "26432866": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436580",
    img: "../img/img1.jpeg",
    context: "a test on the context"
    },
    "202608chk2": {
    "26432866": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436593",
    img: "../img/img1.jpeg",
    context: "a test on the context"
    },
    "202608chk3": {
    "": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=380046174",
    img: "../img/img1.jpeg",
    context: ""
    },


    "202608chk4": {
    "M04": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436602",
    img: "../img/i5990108993_56a862a99fb97a867116ff83416b4d80_IMG_0161.jpg",
    context: "請找出圖中的石製水箱上的編號"
    },
    "202608chk5": {
    "34": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436610",
    img: "../img/img1.png",
    context: "請找出此處的垃圾桶上的數字"
    },
    "202608chk6": {
    "T424": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436615",
    img: "../img/5990108993_4e8a52ca7213315a3ba3b5d78000a1f9_IMG_0158.jpg",
    context: "請找出耀安邨護衛員室左邊的樹木編號"
    },
    "202608chk7": {
    "NS285A": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436617",
    img: "../img/IMG_0121.jpg",
    context: "請找出A出口升降機口右上角的黃色反光板上的編號"
    },
    "202608chk8": {
    "05/02/2026": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436619",
    img: "../img/5990108993_2de96c88dc9091073ce72a81d1f30a69_IMG_0071.jpg",
    context: "請找出此處飲水機上次更換濾芯的時間(格式:dd/mm/yyyy)"
    },
    "202608chk9": {
    "BE3893": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436624",
    img: "../img/IMG_0097.jpg",
    context: "請找出此處圖中燈柱上的編號"
    },
    "202608chk10": {
    "2027-6": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436638",
    img: "../img/IMG_0080.jpg",
    context: "請找出此處飲水機下次更換UV紫外光燈的日期(格式:yyyy-m)"
    },
    "202608chk11": {
    "3": "https://padlet.com/joshuatam/submission-request/m9LGXq6G8r56vaKY?section=381436645",
    img: "../img/IMG_0086.jpg",
    context: "請找出公園入面有幾多個垃圾桶"
    }
};

let canvas;
let context;
let canvasWidth = 0;
let canvasHeight = 0;
let animationFrameId = 0;
let startTime = performance.now();
const missionBoardUrl = "https://padlet.com/joshuatam/breakout-room/3n6K2Wz3Mkjx40A9-eWRpzxVGONYRv7Qr";

const resizeCanvas = () => {
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = Math.floor(canvasWidth * devicePixelRatio);
    canvas.height = Math.floor(canvasHeight * devicePixelRatio);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
};

const drawCloud = (x, y, scale, alpha, time) => {
    const sway = Math.sin(time * 0.00035 + x * 0.01) * 10;
    context.save();
    context.translate(x + sway, y);
    context.scale(scale, scale);
    context.globalAlpha = alpha;
    context.fillStyle = "rgba(255, 255, 255, 0.9)";
    context.beginPath();
    context.ellipse(0, 0, 60, 24, 0, 0, Math.PI * 2);
    context.ellipse(36, -10, 38, 18, 0, 0, Math.PI * 2);
    context.ellipse(-32, -8, 34, 16, 0, 0, Math.PI * 2);
    context.ellipse(15, -18, 28, 16, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
};

const drawRope = (startX, startY, endX, endY, color, thickness, waveAmount, waveSpeed, time) => {
    const segments = 64;
    context.strokeStyle = color;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = thickness;
    context.beginPath();
    for (let index = 0; index <= segments; index += 1) {
        const progress = index / segments;
        const x = startX + (endX - startX) * progress;
        const y = startY + (endY - startY) * progress;
        const wave = Math.sin(progress * Math.PI * 6 + time * waveSpeed) * waveAmount;
        const pull = Math.sin(progress * Math.PI) * waveAmount * 0.25;
        const offsetY = y + wave + pull;
        if (index === 0) {
            context.moveTo(x, offsetY);
        } else {
            context.lineTo(x, offsetY);
        }
    }
    context.stroke();
};

const drawKnot = (x, y, time) => {
    const pulse = 1 + Math.sin(time * 0.002) * 0.03;
    context.save();
    context.translate(x, y);
    context.scale(pulse, pulse);

    context.shadowColor = "rgba(0, 0, 0, 0.18)";
    context.shadowBlur = 12;
    context.shadowOffsetY = 6;

    context.fillStyle = "#d8a53d";
    context.beginPath();
    context.arc(0, 0, 26, 0, Math.PI * 2);
    context.fill();

    context.shadowBlur = 0;
    context.strokeStyle = "rgba(98, 63, 11, 0.45)";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(-8, -4, 12, 0.2, Math.PI * 1.3);
    context.arc(8, 4, 12, Math.PI * 1.2, Math.PI * 2.2);
    context.stroke();

    context.restore();
};

const drawMountains = () => {
    const baseY = canvasHeight * 0.76;
    context.fillStyle = "#96b5c9";
    context.beginPath();
    context.moveTo(0, baseY);
    context.lineTo(canvasWidth * 0.14, canvasHeight * 0.56);
    context.lineTo(canvasWidth * 0.28, baseY * 0.93);
    context.lineTo(canvasWidth * 0.43, canvasHeight * 0.50);
    context.lineTo(canvasWidth * 0.59, baseY * 0.92);
    context.lineTo(canvasWidth * 0.76, canvasHeight * 0.52);
    context.lineTo(canvasWidth, baseY * 0.95);
    context.lineTo(canvasWidth, canvasHeight);
    context.lineTo(0, canvasHeight);
    context.closePath();
    context.fill();

    context.fillStyle = "rgba(255, 255, 255, 0.3)";
    context.beginPath();
    context.moveTo(canvasWidth * 0.1, canvasHeight * 0.6);
    context.lineTo(canvasWidth * 0.17, canvasHeight * 0.52);
    context.lineTo(canvasWidth * 0.24, canvasHeight * 0.62);
    context.closePath();
    context.fill();
};

const drawGrass = () => {
    const groundY = canvasHeight * 0.79;
    const gradient = context.createLinearGradient(0, groundY, 0, canvasHeight);
    gradient.addColorStop(0, "rgba(152, 182, 89, 0.3)");
    gradient.addColorStop(1, "rgba(109, 145, 61, 0.72)");
    context.fillStyle = gradient;
    context.fillRect(0, groundY, canvasWidth, canvasHeight - groundY);
};

const drawScene = (time) => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    const sky = context.createLinearGradient(0, 0, 0, canvasHeight);
    sky.addColorStop(0, "#9ad8ff");
    sky.addColorStop(0.6, "#dff3ff");
    sky.addColorStop(1, "#d6eec6");
    context.fillStyle = sky;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle = "rgba(255, 255, 255, 0.2)";
    context.beginPath();
    context.ellipse(canvasWidth * 0.18, canvasHeight * 0.16, 170, 60, -0.06, 0, Math.PI * 2);
    context.ellipse(canvasWidth * 0.6, canvasHeight * 0.11, 230, 70, 0.12, 0, Math.PI * 2);
    context.fill();

    drawCloud(canvasWidth * 0.15, canvasHeight * 0.18, 1.15, 0.55, time);
    drawCloud(canvasWidth * 0.42, canvasHeight * 0.1, 1.5, 0.62, time);
    drawCloud(canvasWidth * 0.8, canvasHeight * 0.17, 1.05, 0.5, time);

    drawMountains();
    drawGrass();

    drawRope(-canvasWidth * 0.05, canvasHeight * 0.2, canvasWidth * 0.45, canvasHeight * 0.57, "#a54b43", 46, 10, 0.0016, time);
    drawRope(canvasWidth * 0.1, canvasHeight * 0.85, canvasWidth * 0.82, canvasHeight * 0.46, "#c3a675", 44, 8, 0.0014, time);
    drawRope(canvasWidth * 0.52, canvasHeight * 0.63, canvasWidth * 1.08, canvasHeight * 0.83, "#4d7ca8", 42, 7, 0.0018, time);
    drawRope(canvasWidth * 0.38, canvasHeight * 0.72, canvasWidth * 1.02, canvasHeight * 0.44, "#88a27f", 40, 8, 0.0015, time);

    drawKnot(canvasWidth * 0.84, canvasHeight * 0.72, time);
    drawKnot(canvasWidth * 0.93, canvasHeight * 0.59, time + 700);

    context.fillStyle = "rgba(78, 139, 73, 0.65)";
    for (let index = 0; index < 18; index += 1) {
        const x = canvasWidth * 0.5 + Math.sin(time * 0.0007 + index) * 120 + index * 6;
        const y = canvasHeight * 0.63 + Math.cos(time * 0.001 + index) * 26;
        context.beginPath();
        context.arc(x, y, 2 + (index % 3), 0, Math.PI * 2);
        context.fill();
    }

    const shimmerCount = 10;
    for (let index = 0; index < shimmerCount; index += 1) {
        const shimmerX = (canvasWidth / shimmerCount) * index + Math.sin(time * 0.0015 + index) * 18;
        const shimmerY = canvasHeight * 0.52 + Math.cos(time * 0.0012 + index) * 10;
        context.fillStyle = `rgba(255, 255, 255, ${0.12 + (index % 3) * 0.03})`;
        context.fillRect(shimmerX, shimmerY, 32, 2);
    }
};

const animate = (time) => {
    drawScene(time - startTime);
    animationFrameId = window.requestAnimationFrame(animate);
};

$(document).ready(function() {
    const landingIntro = document.getElementById("landingIntro");
    const card = $(".card");
    const siteHeader = $(".site-header");
    const playLandingExit = () => {
        window.setTimeout(() => {
            landingIntro.classList.add("is-hidden");
            window.setTimeout(() => {
                landingIntro.remove();
                card.fadeIn(300);
            }, 500);
        }, 900);
    };

    const updateHeaderState = () => {
        const isScrolled = window.scrollY > 12;
        siteHeader.toggleClass("is-compact", isScrolled);
        $("body").toggleClass("is-scrolled", isScrolled);
    };

    if (document.readyState === "complete") {
        playLandingExit();

    } else {
        window.addEventListener("load", playLandingExit, { once: true });
    }

    canvas = document.getElementById("bgCanvas");
    context = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    updateHeaderState();
    animationFrameId = window.requestAnimationFrame(animate);

    // --- Live Countdown & Game Status Timer ---
    
    const startTimeGame = new Date("2026-08-07T17:30:00").getTime();
    const endTimeGame = new Date("2026-08-07T21:00:00").getTime();


    const statusCard  = $(".status-card");
    const statusTitle = document.getElementById('statusTitle');
    const statusMsg   = document.getElementById('statusMsg');

    function pad(num) {
        return String(num).padStart(2, '0');
    }

    function updateGameCountdown() {
        const now = new Date().getTime();
        const statusTitle = document.getElementById("statusTitle");
        const statusMsg = document.getElementById("statusMessage");
        const statusCard = $(".status-card");
        
        let currentStateTitle = "";
        let currentStateText = "";

        if (now < startTimeGame) {
            // State 1: Before Start (Red Theme)
            targetTime = startTimeGame;
            currentStateTitle = "遊戲即將開始 (UPCOMING)";
            currentStateText = "請準備，任務即將解鎖！";
            statusCard.removeClass("state-pending state-live state-urgent state-return state-ended").addClass("state-pending");

            const diff = startTimeGame - now;
            updateDisplay(diff);

        } else if (now >= startTimeGame && now <= endTimeGame) {
            const timeLeft = endTimeGame - now;
            const minutesLeft = timeLeft / (1000 * 60);

            if (minutesLeft <= 15) {
                // State 4: Final 15 Minutes Return (Warning Red/Orange Theme)
                currentStateTitle = "請返回營地！ (RETURN SOON)";
                currentStateText = "比賽即將結束，請立即回程！";
                statusCard.removeClass("state-pending state-live state-urgent state-return state-ended").addClass("state-return");
            } else if (minutesLeft <= 30) {
                // State 3: Final 30 Minutes Urgent (Amber Theme)
                currentStateTitle = "最後衝刺階段！ (URGENT)";
                currentStateText = "剩餘時間不多，加緊完成任務！";
                statusCard.removeClass("state-pending state-live state-urgent state-return state-ended").addClass("state-urgent");
            } else {
                // State 2: Live / In-Progress (Green Theme)
                currentStateTitle = "遊戲進行中 (LIVE)";
                currentStateText = "全力以赴，群體合一！";
                statusCard.removeClass("state-pending state-live state-urgent state-return state-ended").addClass("state-live");
            }
            updateDisplay(timeLeft);

        } else {
            // State 5: Game Ended (Muted Neutral Theme)
            $("#hours").text("00");
            $("#minutes").text("00");
            $("#seconds").text("00");
            if (statusTitle) statusTitle.innerText = "遊戲已結束！多謝參與！";
            if (statusMsg) statusMsg.innerText = "感謝您的熱烈支持與參與！";
            statusCard.removeClass("state-pending state-live state-urgent state-return").addClass("state-ended");
            return;
        }
        
        if (statusTitle) statusTitle.innerText = currentStateTitle;
        if (statusMsg) statusMsg.innerText = currentStateText;
        
    }
    function updateDisplay(ms) {
        const totalSecs = Math.floor(ms / 1000);
        const hours = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;

        $("#hours").text(pad(hours));
        $("#minutes").text(pad(mins));
        $("#seconds").text(pad(secs));
        
    }
    updateGameCountdown();
    setInterval(updateGameCountdown, 1000);

    $(".tab-btn").on("click", function() {
        const tabName = $(this).data("tab");

        $(".tab-btn").removeClass("is-active").attr("aria-selected", "false");
        $(this).addClass("is-active").attr("aria-selected", "true");

        $(".tab-panel").removeClass("is-active").attr("hidden", true);
        if (tabName === "mission") {
            $("#missionPanel").addClass("is-active").removeAttr("hidden");
        } else if (tabName === "rules") {
            $("#rulesPanel").addClass("is-active").removeAttr("hidden");
        }
    });

    $(".mission-enter-btn").on("click", function() {
        window.location.href = missionBoardUrl;
    });

    // 1. Extract 'id' parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = urlParams.get('id');

    // 2. Validate if the ID exists in pageData
    if (!currentId || !pageData.hasOwnProperty(currentId)) {
    // Show error page view
    $("#formView").hide();
    $("#notFoundView").show();
    } else {
    $("#imgId").attr('src', pageData[currentId].img);
    $("#contextId").text(pageData[currentId].context);
    }
    // 3. Handle Form Submission
    $("#passwordForm").on("submit", function(e) {
    e.preventDefault();

    const enteredPassword = $("#passwordInput").val().trim();
    
    if (pageData[currentId] && pageData[currentId][enteredPassword] && enteredPassword !== "img" && enteredPassword !== "context") {
        $("#errorMessage").hide();
        const targetUrl = pageData[currentId][enteredPassword];
        window.location.href = targetUrl;
    } else {
        $("#errorMessage").fadeIn();
        $("#passwordInput").val("").focus();
    }
    });

    // 4. Handle Back button clicks (works for both normal view and error view)
    $(".backBtn").on("click", function() {
    window.location.href = missionBoardUrl;
    });
});