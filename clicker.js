
var duckchosen = 0; //1-3 of the 3 ducks which can be chosen
var duckName = "";

var eggs = 0; //Total number of eggs
var eggsSold = 0; //Total number of eggs sold
var storage = 10; //Total number of eggs that can be stored
var cost = 0.1; //Cost each egg sells for
var click_rate = 10000; //Time (ms) between each auto click for egg
var click_increment = 1; //How many eggs per click
var cash = 0; //How much cash

var duckImages = ["pics\\duck1.jpg", "pics\\duck2.png", "pics\\duck3.jpg"]

var storageNums = {
    storageStage: 0,
    storageCost: [1, 2, 3, 4.5, 10, 10, 18, 32, 60, 104, 190, 340, 610, 9999],
    storageAmount: [20, 30, 45, 65, 100, 150, 230, 340, 500, 770, 1150, 1700, 2500, 9999]
}

var EggCollector = {
    eggcollectorNum: 0,
    eggcollectorCost: 10
}


// Hides the chooseDuck element and shows the duckNaming elements and chosen duck
function duckChoose (num) {
    document.getElementById("chooseDuck").style.display = "none";
    document.getElementById("mainDuck").style.display = "block";
    document.getElementById("nameDuck").style.display = "block";
    document.getElementById("mainDuckImg").src=duckImages[num];
}

//Gets ducks NAME from the input, changes the ducks NAME to NAME, hides the 
function duckNamed () {
    duckName = document.getElementById("dName").value;
    console.log(duckName);
    document.getElementById("dName2").innerHTML = duckName;
    document.getElementById("dName2").style.display = "block";
    document.getElementById("nameDuck").style.display = "none";
    document.getElementById("mainDuckImg").setAttribute("onClick", "duckClicked()");
    document.getElementById("buttons").style.display = "block";
    duckUpdate();
}

//Function RUNS when mainDuck is clicked and adds click_increment eggs each click, also sets the progress bar for the storage
function duckClicked () {
    if (eggs + click_increment <= storage) {
        eggs += click_increment;
        document.getElementById("totalEggsProg").value = 100 * (eggs/storage);
    } else if (eggs + click_increment > storage) {
        eggs = storage;
        document.getElementById("totalEggsProg").value = 100 * (eggs/storage);
    }
    duckUpdate();
}

//Updates all BUTTONS and TEXT in the HTML, this is run every click and everytime a upgrade/autoclick event happens.
function duckUpdate () {
    let x = storageNums.storageStage;
    document.getElementById("totalEggs").innerHTML = "Total eggs: " + eggs + "/" + storage;
    document.getElementById("totalCash").innerHTML = "Cash: £" + cash.toFixed(2);
    document.getElementById("totalEggsProg").value = 100 * (eggs/storage);
    document.getElementById("sellEggs").innerHTML = "Sell Eggs (£" + (eggs * cost).toFixed(2) + ")";
    document.getElementById("sellEggsl").innerHTML = "Total eggs sold: " + eggsSold; 
    //document.getElementById("upgradeStorage").innerHTML = "Upgrade Storage to [" + storageNums.storageAmount[x] + "] " + "(£" + storageNums.storageCost[x] + ")";
    document.getElementById("eggCollector").innerHTML = "Egg Collector (£" + EggCollector.eggcollectorCost.toFixed(2)+ ") (" + EggCollector.eggcollectorNum + ")";
    document.getElementById("eggCollectorl").innerHTML = "Eggs collected per second: " + EggCollector.eggcollectorNum; 
    duckstoragebUpdate();
    buttonUpdate();
}

//Updates colour of buttons if you can purchase the next upgrade
function buttonUpdate () {
    //Storage button updater
    let x = storageNums.storageStage;
    if (cash >= storageNums.storageCost[x]) {
        document.getElementById("upgradeStorage").style.backgroundColor = "#4CAF50";
    } else if (cash < storageNums.storageCost[x] && storageNums.storageCost[x] != 9999) {
        document.getElementById("upgradeStorage").style.backgroundColor = "#af4c4c";
    } else { 
        document.getElementById("upgradeStorage").style.backgroundColor = "#4CAF50";
    }

    //eggCollector Updater
    let y = EggCollector.eggcollectorCost;
    if (cash >= y) {
        document.getElementById("eggCollector").style.backgroundColor = "#4CAF50";
    } else if (cash < y) {
        document.getElementById("eggCollector").style.backgroundColor = "#af4c4c";
    }
}

//Separate function that checks to see if storage upgrade has reached its max - separate to not clutter the duckUpdate function
function duckstoragebUpdate () {
    let x = storageNums.storageStage;
    if (storageNums.storageCost[x] != 9999) {
        document.getElementById("upgradeStorage").innerHTML = "Upgrade Storage to [" + storageNums.storageAmount[x] + "] " + "(£" + storageNums.storageCost[x] + ")"; 
    } else {
        document.getElementById("upgradeStorage").innerHTML = "Storage MAX";
    }
}

//When sell eggs is clicked sells total eggs in storage for their egg cost
function sellEggs() {
    cash = cash + eggs * cost;
    eggsSold += eggs;
    eggs = 0;
    duckUpdate();
}

//When upgrade storage clicked, checks there is enough CASH + storage is NOT at max, then updates storage, removes cash for cost, and increases storageStage 
function upgradeStorage() {
    let x = storageNums.storageStage;
    if (cash >= storageNums.storageCost[x] && storageNums.storageCost[x] != 9999) {
        storage = storageNums.storageAmount[x];
        cash -= storageNums.storageCost[x];
        storageNums.storageStage++;
        duckUpdate();
    }
}

//Main game loop that happens every 1 second
var mainGameLoop = window.setInterval(function() {
    if (EggCollector.eggcollectorNum > 0) {
    collectEggs()
    } 
    }, 1000)

//Function that turns egg collector on and handles buying new egg collectors, price increases by 10 x 1.1^(no. owned)
function eggCollectorOn () {
    let x = EggCollector.eggcollectorNum;
    let y = EggCollector.eggcollectorCost;
    if (x == 0 && cash >= y) {
        EggCollector.eggcollectorNum = 1;
        cash -= 10;
        EggCollector.eggcollectorCost = 10 * Math.pow(1.1, x+1); 
        duckUpdate();
    } else if (x > 0 && cash >= y) {
        EggCollector.eggcollectorNum++;
        cash -= y;
        EggCollector.eggcollectorCost = 10 * Math.pow(1.1, x+1); 
        duckUpdate();
    }
    console.log(EggCollector.eggcollectorNum);
}

//Collects eggs based on how many eggCollectors you have
function collectEggs () {
    let x = EggCollector.eggcollectorNum;
    if (eggs + x <= storage) {
        eggs += x;
        duckUpdate();
    } else if (eggs + x > storage) {
        eggs = storage;
        duckUpdate();
    }
}

function devGetCash() {
    cash += 100;
    duckUpdate();
}

