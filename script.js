// INITIALIZE CAPTCHA CONFIGURATION
let captcha = Math.floor(Math.random() * 9000 + 1000);
const captchaContainer = document.getElementById("captchaText");
if (captchaContainer) {
    captchaContainer.innerText = captcha;
}

// Global variable to keep track of previous session state
let historicalUserData = null;

function login() {
    let reg = document.getElementById("reg").value.trim();
    let cap = document.getElementById("captchaInput").value.trim();

    if (reg === "" || cap === "") {
        alert("Authentication parameters required.");
        return;
    }

    if (cap != captcha) {
        alert("Invalid security captcha code execution.");
        return;
    }

    // Grant access to application view
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    // EXTRACT PREVIOUS SESSION IF RE-AUTHENTICATING
    let history = JSON.parse(localStorage.getItem("iem_credit_user_data") || "{}");
    
    // Check if registration number already contains an active tracking ledger
    if (history[reg]) {
        historicalUserData = history[reg];
        
        // Auto-populate profile and primary inputs from previous session state
        document.getElementById("name").value = historicalUserData.profile.name || "";
        document.getElementById("roll").value = historicalUserData.profile.roll || "";
        
        document.getElementById("linkedin").value = historicalUserData.metrics.linkedin || 0;
        document.getElementById("coursera").value = historicalUserData.metrics.coursera || 0;
        document.getElementById("udemy").value = historicalUserData.metrics.udemy || 0;
        document.getElementById("iem").value = historicalUserData.metrics.iem || 0;
        document.getElementById("event").value = historicalUserData.metrics.event || 0;
        document.getElementById("volunteer").value = historicalUserData.metrics.volunteer || 0;
        
        document.getElementById("nptel4").value = historicalUserData.metrics.nptel4 || 0;
        document.getElementById("nptel8").value = historicalUserData.metrics.nptel8 || 0;
        document.getElementById("nptel12").value = historicalUserData.metrics.nptel12 || 0;

        // Display elegant Welcome Back notification banner in the output workspace
        document.getElementById("output").innerHTML = `
            <div class="action-items-container all-clear" style="margin-top: 0; margin-bottom: 20px; border-color: #868cff; background: rgba(134, 140, 255, 0.05);">
                <h4 style="color: #868cff;">🔐 Session Synchronized Successfully</h4>
                <p style="color: var(--text-main); font-weight: 500;">
                    Welcome back! Your previous progress metrics have been restored. 
                    Simply add your new certificates to the fields below and re-compute to stack your progress.
                </p>
            </div>
            <div class="empty-state" style="padding: 40px 20px;">
                <p>Click "Compute Analytics" to re-verify your standing matrix.</p>
            </div>
        `;
    }
}

function calculate() {
    let reg = document.getElementById("reg").value.trim() || "default_user";

    // Collect Input Component Metrics from active interface fields
    let l = +document.getElementById("linkedin").value || 0;
    let c = +document.getElementById("coursera").value || 0;
    let u = +document.getElementById("udemy").value || 0;
    let i = +document.getElementById("iem").value || 0;
    let e = +document.getElementById("event").value || 0;
    let v = +document.getElementById("volunteer").value || 0;
    
    let n4 = +document.getElementById("nptel4").value || 0;
    let n8 = +document.getElementById("nptel8").value || 0;
    let n12 = +document.getElementById("nptel12").value || 0;

    if (l < 0 || c < 0 || u < 0 || i < 0 || e < 0 || v < 0 || n4 < 0 || n8 < 0 || n12 < 0) {
        alert("Metric inputs cannot contain sub-zero variations.");
        return;
    }

    // Mathematical Matrix Calculations
    let ifc = l + c + u;
    let mar = (l * 2) + (c * 2) + (u * 2) + (i * 2) + (e * 1) + (v * 1);
    let moocs = (n4 * 1) + (n8 * 2) + (n12 * 3);

    // Baseline Milestone Target Values
    const MAR_TARGET = 25;
    const IFC_TARGET = 25;
    const MOOC_TARGET = 5;

    // Compute System Deficits
    let marLeft = Math.max(0, MAR_TARGET - mar);
    let ifcLeft = Math.max(0, IFC_TARGET - ifc);
    let moocsLeft = Math.max(0, MOOC_TARGET - moocs);

    // Pass/Fail Visual Status Configurations
    let ifcClass = ifc >= IFC_TARGET ? "clear" : "deficit";
    let marClass = mar >= MAR_TARGET ? "clear" : "deficit";
    let moocsClass = moocs >= MOOC_TARGET ? "clear" : "deficit";

    let ifcLabel = ifc >= IFC_TARGET ? "Cleared" : "Deficit";
    let marLabel = mar >= MAR_TARGET ? "Cleared" : "Deficit";
    let moocsLabel = moocs >= MOOC_TARGET ? "Cleared" : "Deficit";

    // Determine Rank Profiles
    let badge = "Beginner Track 🎯";
    if (mar > 60) badge = "Pro Architecture 🏆";
    else if (mar > 20) badge = "Intermediate Level ⚡";

    // Build Action Items Output Text Array
    let actionItems = [];
    if (ifcLeft > 0) actionItems.push(`Add <strong>${ifcLeft}</strong> more certificates to satisfy global IFC criteria.`);
    if (marLeft > 0) actionItems.push(`Accumulate <strong>${marLeft}</strong> more points to clear institutional MAR limits.`);
    if (moocsLeft > 0) actionItems.push(`Earn <strong>${moocsLeft}</strong> more credits via NPTEL architectures.`);

    let actionsHTML = "";
    if (actionItems.length > 0) {
        actionsHTML = `
            <div class="action-items-container">
                <h4>System Deficit Optimization Requirements</h4>
                <ul>${actionItems.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>`;
    } else {
        actionsHTML = `
            <div class="action-items-container all-clear">
                <h4>System Optimization Requirements</h4>
                <p>🎉 Excellent! All baseline threshold variations cleared successfully. Matrix optimal.</p>
            </div>`;
    }

    // Inject New Live State Into Result Dashboard Panel
    document.getElementById("output").innerHTML = `
        <div class="panel-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
            System Metrics Engine
        </div>

        <div class="bento-card-metric ${ifcClass}">
            <div class="metric-meta">
                <div class="title">IFC Core Status (Target: ${IFC_TARGET})</div>
                <span class="status-badge">${ifcLabel}</span>
            </div>
            <div class="metric-numeric-display">${ifc}</div>
        </div>

        <div class="bento-card-metric ${marClass}">
            <div class="metric-meta">
                <div class="title">MAR Total Score (Target: ${MAR_TARGET})</div>
                <span class="status-badge">${marLabel}</span>
            </div>
            <div class="metric-numeric-display">${mar}</div>
        </div>

        <div class="bento-card-metric ${moocsClass}">
            <div class="metric-meta">
                <div class="title">MOOC Credits Earned (Target: ${MOOC_TARGET})</div>
                <span class="status-badge">${moocsLabel}</span>
            </div>
            <div class="metric-numeric-display">${moocs}</div>
        </div>

        <div class="distribution-summary">
            <div class="form-section-header" style="margin:0;">Target Deficit Tracking Summary</div>
            <div class="distribution-grid" style="grid-template-columns: repeat(3, 1fr); padding-top:8px;">
                <div><span>IFC Left</span><div style="color: ${ifcLeft > 0 ? 'var(--error)' : 'var(--success)'}">${ifcLeft === 0 ? '✓' : ifcLeft}</div></div>
                <div><span>MAR Left</span><div style="color: ${marLeft > 0 ? 'var(--error)' : 'var(--success)'}">${marLeft === 0 ? '✓' : marLeft}</div></div>
                <div><span>MOOCs Left</span><div style="color: ${moocsLeft > 0 ? 'var(--error)' : 'var(--success)'}">${moocsLeft === 0 ? '✓' : moocsLeft}</div></div>
            </div>
        </div>

        <div class="premium-pill-rank">
            Profile Status: ${badge}
        </div>

        ${actionsHTML}
    `;

    // COMPILE AND PRESERVE PERSISTENT USER RECORD ARRAY 
    let allUsersLedger = JSON.parse(localStorage.getItem("iem_credit_user_data") || "{}");
    
    allUsersLedger[reg] = {
        profile: {
            name: document.getElementById("name").value,
            roll: document.getElementById("roll").value
        },
        metrics: { linkedin: l, coursera: c, udemy: u, iem: i, event: e, volunteer: v, nptel4: n4, nptel8: n8, nptel12: n12 },
        calculated: { ifc, mar, moocs },
        timestamp: new Date().toLocaleString()
    };

    localStorage.setItem("iem_credit_user_data", JSON.stringify(allUsersLedger));
}