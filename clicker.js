var counter = 38;
var cash = 38;
var u50 = false;


var button = document.getElementById("button");
var count = document.getElementById("count");
var cashtotal = document.getElementById("cash");


button.onclick = function() {
    buttonPressed(); 
} 

function buttonPressed() {
    counter++;
    cash++;
    updateNumbers();
    checkUpgrades();
    return;
};

function updateNumbers () {
    count.innerHTML = "Times clicked: " + counter;
    cashtotal.innerHTML = "Total cash: £" + cash;
}

function checkUpgrades() {
    if (cash >= 50 && u50 == false) {
        unlock50();

    }
}

function unlock50 () {
    document.getElementById("u50").style.display = "block";
    document.getElementById("upgradetxt").style.display = "block";  
}