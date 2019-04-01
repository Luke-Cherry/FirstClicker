
var duckchosen = 0; //1-3 of the 3 ducks which can be chosen
var duckName = "";

var eggs = 0; //Total number of eggs
var storage = 10; //Total number of eggs that can be stored
var cost = 0.1; //Cost each egg sells for
var click_rate = 10000; //Time (ms) between each auto click for egg
var click_increment = 1; //How many eggs per click
var cash = 0; //How much cash 



function duckChoose (num) {
    switch(num) {
        case 1:
            document.getElementById("chooseDuck").style.display = "none";
            document.getElementById("newDuck").style.display = "block";
            document.getElementById("mainDuckImg").src="pics\\duck1.jpg";
            break;
        case 2:
            document.getElementById("chooseDuck").style.display = "none";
            document.getElementById("newDuck").style.display = "block";
            document.getElementById("mainDuckImg").src="pics\\duck2.png";
            break;
        case 3:
        document.getElementById("chooseDuck").style.display = "none";
        document.getElementById("newDuck").style.display = "block";
        document.getElementById("mainDuckImg").src="pics\\duck3.jpg";
            break;
    }

}

function duckNamed () {
    duckName = document.getElementById("dName").value;
    console.log(duckName);
    document.getElementById("dName2").innerHTML = duckName;
    document.getElementById("dName2").style.display = "block";
    document.getElementById("nameDuck").style.display = "none";
    document.getElementById("mainDuckImg").setAttribute("onClick", "duckClicked()");
}

function duckClicked () {
    if (eggs + click_increment <= storage) {
        eggs = eggs + click_increment;
    }
    duckUpdate();
    console.log(eggs);
}

function duckUpdate () {
    document.getElementById("totalEggs").innerHTML = "Total eggs: " + eggs + "/" + storage;
    document.getElementById("totalCash").innerHTML = "Cash: £" + cash.toFixed(2);
}

function sellEggs() {
    cash = cash + eggs * cost;
    eggs = 0;
    duckUpdate();
}





/*
var counter = 28;
var cash = 28;
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
*/