// CAPTCHA SETUP
let captcha = Math.floor(Math.random() * 9000 + 1000);
const captchaTextElem = document.getElementById("captchaText");
if (captchaTextElem) {
    captchaTextElem.innerText = captcha;
}

function login() {
    let reg = document.getElementById("reg").value;
    let cap = document.getElementById("captchaInput").value;

    if (reg === "" || cap === "") {
        alert("Fill all fields");
        return;
    }

    if (cap != captcha) {
        alert("Wrong captcha code");
        return;
    }

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

function calculate() {
    // DOM Element Reference Cache
    let l = +document.getElementById("linkedin").value || 0;
    let c = +document.getElementById("coursera").value || 0;
    let u = +document.getElementById("udemy").value || 0;
    let i = +document.getElementById("iem").value || 0;
    let e = +document.getElementById("event").value || 0;
    let v = +document.getElementById("volunteer").value || 0;

    // Validation Guard
    if (l < 0 || c < 0 || u < 0 || i < 0 || e < 0 || v < 0) {
        alert("Inputs cannot contain negative values");
        return;
    }

    // Mathematical Matrix Metrics
    let ifc = l + c + u;
    let mar = (l * 2) + (c * 2) + (u * 2) + (i * 2) + (e * 1) + (v * 1);

    let weeks = +document.getElementById("weeks").value;
    let passed = document.getElementById("passed").value;

    let moocs = 0;
    if (passed === "yes") {
        if (weeks == 4) moocs = 1;
        else if (weeks == 8) moocs = 2;
        else if (weeks == 12) moocs = 3;
    }

    // Evaluation Metric Status Flags
    let marClass = mar >= 25 ? "pass" : "fail";
    let ifcClass = ifc >= 25 ? "pass" : "fail";
    let moocsClass = moocs >= 5 ? "pass" : "fail";

    let marStatus = mar >= 25 ? "✅ Clear" : "❌ Deficit";
    let ifcStatus = ifc >= 25 ? "✅ Clear" : "❌ Deficit";
    let moocsStatus = moocs >= 5 ? "✅ Clear" : "❌ Deficit";

    // Tier Badges
    let badge = "Beginner 🎯";
    if (mar > 60) badge = "Pro 🏆";
    else if (mar > 20) badge = "Intermediate ⚡";

    // Recommendations Processing Engine
    let suggestions = [];
    if (mar < 25) suggestions.push("Prioritize expanding activity metrics to increase absolute MAR distribution value.");
    if (ifc < 25) suggestions.push("Incorporate structured specialized credential systems (LinkedIn, Coursera, Udemy).");
    if (moocs < 5) suggestions.push("Register for and complete additional certified NPTEL tracks.");

    let suggestionsHTML = suggestions.length > 0 
        ? `<ul>${suggestions.map(s => `<li>${s}</li>`).join('')}</ul>`
        : "<p>🎉 Excellent structure! All minimum baseline criteria are met successfully.</p>";

    // Render Engineered View Panel Template
    document.getElementById("output").innerHTML = `
        <div class="panel-header">📊 Evaluation Dashboard</div>
        
        <div class="metric-card ${ifcClass}">
            <div><strong>IFC Score</strong></div>
            <div class="metric-val">${ifc} (${ifcStatus})</div>
        </div>
        <div class="metric-card ${marClass}">
            <div><strong>MAR Accumulated</strong></div>
            <div class="metric-val">${mar} (${marStatus})</div>
        </div>
        <div class="metric-card ${moocsClass}">
            <div><strong>NPTEL MOOCs Count</strong></div>
            <div class="metric-val">${moocs} (${moocsStatus})</div>
        </div>

        <div class="section-title">Point Multiplication Distribution</div>
        <div class="form-row" style="font-size:0.85rem; color:var(--text-muted); padding: 5px 0;">
            <div>LinkedIn: <strong>+${l * 2}</strong></div>
            <div>Coursera: <strong>+${c * 2}</strong></div>
            <div>Udemy: <strong>+${u * 2}</strong></div>
        </div>

        <div class="badge-display">
            Rank Profile: ${badge}
        </div>

        <div class="section-title">Strategic Action Items</div>
        <div class="suggestions-box">
            ${suggestionsHTML}
        </div>
    `;

    // Save Data Object Arrays to Storage
    let data = { ifc, mar, moocs, date: new Date().toLocaleString() };
    let history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push(data);
    localStorage.setItem("history", JSON.stringify(history));
}