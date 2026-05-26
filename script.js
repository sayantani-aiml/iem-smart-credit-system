// INITIALIZE CAPTCHA CONFIGURATION
let captcha = Math.floor(Math.random() * 9000 + 1000);
const captchaContainer = document.getElementById("captchaText");
if (captchaContainer) {
    captchaContainer.innerText = captcha;
}

function login() {
    let reg = document.getElementById("reg").value;
    let cap = document.getElementById("captchaInput").value;

    if (reg === "" || cap === "") {
        alert("Authentication parameters required.");
        return;
    }

    if (cap != captcha) {
        alert("Invalid security captcha code execution.");
        return;
    }

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

function calculate() {
    // Collect Component Values
    let l = +document.getElementById("linkedin").value || 0;
    let c = +document.getElementById("coursera").value || 0;
    let u = +document.getElementById("udemy").value || 0;
    let i = +document.getElementById("iem").value || 0;
    let e = +document.getElementById("event").value || 0;
    let v = +document.getElementById("volunteer").value || 0;
    
    // NPTEL Multi-Certificate Tracker variables
    let nptelCertCount = +document.getElementById("nptelCount").value || 0;
    let weeks = +document.getElementById("weeks").value;
    let passed = document.getElementById("passed").value;

    if (l < 0 || c < 0 || u < 0 || i < 0 || e < 0 || v < 0 || nptelCertCount < 0) {
        alert("Metric inputs cannot contain sub-zero variations.");
        return;
    }

    // Process Computational Formulas
    let ifc = l + c + u;
    let mar = (l * 2) + (c * 2) + (u * 2) + (i * 2) + (e * 1) + (v * 1);

    // Calculate Dynamic Multiple NPTEL Credits Array
    let moocsBasePointsPerCert = 0;
    if (passed === "yes") {
        if (weeks === 4) moocsBasePointsPerCert = 1;
        else if (weeks === 8) moocsBasePointsPerCert = 2;
        else if (weeks === 12) moocsBasePointsPerCert = 3;
    }
    let moocs = moocsBasePointsPerCert * nptelCertCount;

    // Evaluate Pass States
    let ifcClass = ifc >= 25 ? "clear" : "deficit";
    let marClass = mar >= 25 ? "clear" : "deficit";
    let moocsClass = moocs >= 5 ? "clear" : "deficit";

    let ifcLabel = ifc >= 25 ? "Cleared" : "Deficit";
    let marLabel = mar >= 25 ? "Cleared" : "Deficit";
    let moocsLabel = moocs >= 5 ? "Cleared" : "Deficit";

    // Set Experience Rank Profile
    let badge = "Beginner Track 🎯";
    if (mar > 60) badge = "Pro Architecture 🏆";
    else if (mar > 20) badge = "Intermediate Level ⚡";

    // Construct Recommendation Engine Logs
    let actionItems = [];
    if (mar < 25) actionItems.push("Increase absolute MAR score density via technical events or institutional platforms.");
    if (ifc < 25) actionItems.push("Acquire targeted global certification units (LinkedIn, Coursera, Udemy formats).");
    if (moocs < 5) actionItems.push("Scale NPTEL certificate volume or clear higher-duration configurations.");

    let actionsHTML = "";
    if (actionItems.length > 0) {
        actionsHTML = `
            <div class="action-items-container">
                <h4>System Optimization Requirements</h4>
                <ul>${actionItems.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>`;
    } else {
        actionsHTML = `
            <div class="action-items-container all-clear">
                <h4>System Optimization Requirements</h4>
                <p>All core verification profiles cleared successfully. Matrix optimal.</p>
            </div>`;
    }

    // Populate Re-Engineered Dashboard
    document.getElementById("output").innerHTML = `
        <div class="panel-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
            System Metrics Engine
        </div>

        <div class="bento-card-metric ${ifcClass}">
            <div class="metric-meta">
                <div class="title">IFC Core Status</div>
                <span class="status-badge">${ifcLabel}</span>
            </div>
            <div class="metric-numeric-display">${ifc}</div>
        </div>

        <div class="bento-card-metric ${marClass}">
            <div class="metric-meta">
                <div class="title">MAR Total Score</div>
                <span class="status-badge">${marLabel}</span>
            </div>
            <div class="metric-numeric-display">${mar}</div>
        </div>

        <div class="bento-card-metric ${moocsClass}">
            <div class="metric-meta">
                <div class="title">MOOC Tracks Finished</div>
                <span class="status-badge">${moocsLabel}</span>
            </div>
            <div class="metric-numeric-display">${moocs}</div>
        </div>

        <div class="distribution-summary">
            <div class="form-section-header" style="margin:0;">IFC Distribution Matrix</div>
            <div class="distribution-grid">
                <div><span>LinkedIn</span><div>+${l * 2}</div></div>
                <div><span>Coursera</span><div>+${c * 2}</div></div>
                <div><span>Udemy</span><div>+${u * 2}</div></div>
            </div>
        </div>

        <div class="premium-pill-rank">
            Profile Status: ${badge}
        </div>

        ${actionsHTML}
    `;

    // Local Storage Archival Record Cache
    let data = { ifc, mar, moocs, totalNptelCerts: nptelCertCount, date: new Date().toLocaleString() };
    let history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push(data);
    localStorage.setItem("history", JSON.stringify(history));
}