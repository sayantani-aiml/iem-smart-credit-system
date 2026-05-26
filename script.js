// CAPTCHA
let captcha = Math.floor(Math.random()*9000+1000);
document.getElementById("captchaText").innerText = "Captcha: " + captcha;

function login(){
    let reg = document.getElementById("reg").value;
    let cap = document.getElementById("captchaInput").value;

    if(reg === "" || cap === ""){
        alert("Fill all fields");
        return;
    }

    if(cap != captcha){
        alert("Wrong captcha");
        return;
    }

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

function calculate(){

let l = +linkedin.value || 0;
let c = +coursera.value || 0;
let u = +udemy.value || 0;
let i = +iem.value || 0;
let e = +event.value || 0;
let v = +volunteer.value || 0;

// Validation
if(l<0 || c<0 || u<0 || i<0 || e<0 || v<0){
    alert("Invalid input");
    return;
}

// IFC
let ifc = l + c + u;

// MAR
let mar = (l*2)+(c*2)+(u*2)+(i*2)+(e*1)+(v*1);

// MOOCs
let weeks = +document.getElementById("weeks").value;
let passed = document.getElementById("passed").value;

let moocs = 0;
if(passed === "yes"){
    if(weeks==4) moocs=1;
    else if(weeks==8) moocs=2;
    else if(weeks==12) moocs=3;
}

// Status
let marStatus = mar>=25 ? "✅" : "❌";
let ifcStatus = ifc>=25 ? "✅" : "❌";
let moocsStatus = moocs>=5 ? "✅" : "❌";

// Badge
let badge = "Beginner";
if(mar>60) badge="Pro 🏆";
else if(mar>20) badge="Intermediate";

// Suggestions
let suggest = "";
if(mar<25) suggest += "Increase MAR. ";
if(ifc<25) suggest += "Add more certificates. ";
if(moocs<5) suggest += "Complete NPTEL course.";

// Output
document.getElementById("output").innerHTML = `
<h3>Results</h3>

<p>IFC: ${ifc} ${ifcStatus}</p>
<p>MAR: ${mar} ${marStatus}</p>
<p>MOOCs: ${moocs} ${moocsStatus}</p>

<h4>Breakdown</h4>
<p>LinkedIn: ${l*2}</p>
<p>Coursera: ${c*2}</p>
<p>Udemy: ${u*2}</p>

<h4>Badge: ${badge}</h4>

<h4>Suggestions:</h4>
<p>${suggest}</p>
`;

// Save history
let data = {ifc, mar, moocs, date: new Date().toLocaleString()};
let history = JSON.parse(localStorage.getItem("history") || "[]");
history.push(data);
localStorage.setItem("history", JSON.stringify(history));

}