
/*
gameData.duckchosen = 0; //1-3 of the 3 ducks which can be chosen
gameData.duckName = "";
gameData.eggs = 0; //Total number of eggs
gameData.eggsSold = 0; //Total number of eggs sold
gameData.storage = 10; //Total number of eggs that can be stored
gameData.cost = 0.1; //Cost each egg sells for
gameData.click_increment = 1; //How many eggs per click
gameData.cash = 0; //How much cash
*/

var defaultValues = {
    duckchosen: 0,
    duckName: "",
    eggs: 0,
    eggsSold: 0,
    storage: 10,
    currentStorage: 0,
    cost: 0.1,
    click_increment: 1,
    cash: 0
}

var gameData = {
    duckchosen: 0,
    duckName: "",
    eggs: 0,
    eggsSold: 0,
    storage: 10,
    currentStorage: 0,
    cost: 0.1,
    click_increment: 1,
    cash: 0
}

var duckImages = ["pics\\duck1.jpg", "pics\\duck2.png", "pics\\duck3.jpg"]

var storageNums = [
    { cost: 1, amount: 20 },
    { cost: 2, amount: 30 },
    { cost: 3, amount: 45 },
    { cost: 4.5, amount: 65 },
    { cost: 10, amount: 100 },
    { cost: 15, amount: 150 },
    { cost: 18, amount: 230 },
    { cost: 32, amount: 340 },
    { cost: 60, amount: 500 },
    { cost: 104, amount: 770 },
    { cost: 190, amount: 1150 },
    { cost: 340, amount: 1700 },
    { cost: 610, amount: 2500 }
]

var EggCollector = {
    eggcollectorNum: 0,
    eggcollectorCost: 10
}

var savedGame = JSON.parse(localStorage.getItem("duckgameSave"))

if (savedGame !== null) {
  gameData = savedGame;
  duckChoose(gameData.duckchosen);
  duckNamed(gameData.duckName);
  duckUpdate();
  console.log("Game LOADED from Save");

} else {
    gameData = defaultValues;
    console.log("NO SAVE FOUND, default values.")
}


// Hides the chooseDuck element and shows the duckNaming elements and chosen duck
function duckChoose (num) {
    document.getElementById("chooseDuck").style.display = "none";
    document.getElementById("mainDuck").style.display = "block";
    document.getElementById("nameDuck").style.display = "block";
    document.getElementById("mainDuckImg").src=duckImages[num];
    gameData.duckchosen = num;
}

//Gets ducks NAME from the input, changes the ducks NAME to NAME, hides the 
function duckNamed (dName2) {
    if (dName2 == null) {
        gameData.duckName = document.getElementById("dName").value;
    } else {
        gameData.duckName = dName2;
    }
    document.getElementById("dName2").innerHTML = gameData.duckName;
    document.getElementById("dName2").style.display = "block";
    document.getElementById("nameDuck").style.display = "none";
    document.getElementById("mainDuckImg").setAttribute("onClick", "duckClicked()");
    document.getElementById("buttons").style.display = "block";
    duckUpdate();
}

//Function RUNS when mainDuck is clicked and adds click_increment eggs each click, also sets the progress bar for the storage
function duckClicked () {
    if (gameData.eggs + gameData.click_increment <= gameData.storage) {
        gameData.eggs += gameData.click_increment;
        document.getElementById("totalEggsProg").value = 100 * (gameData.eggs/gameData.storage);
    } else if (gameData.eggs + gameData.click_increment > gameData.storage) {
        gameData.eggs = gameData.storage;
        document.getElementById("totalEggsProg").value = 100 * (gameData.eggs/gameData.storage);
    }
    duckUpdate();
}

//Updates all BUTTONS and TEXT in the HTML, this is run every click and everytime a upgrade/autoclick event happens.
function duckUpdate () {
    document.getElementById("totalEggs").innerHTML = "Total eggs: " + gameData.eggs + "/" + gameData.storage;
    document.getElementById("totalCash").innerHTML = "Cash: £" + gameData.cash.toFixed(2);
    document.getElementById("totalEggsProg").value = 100 * (gameData.eggs/gameData.storage);
    document.getElementById("sellEggs").innerHTML = "Sell Eggs (£" + (gameData.eggs * gameData.cost).toFixed(2) + ")";
    document.getElementById("sellEggsl").innerHTML = "Total eggs sold: " + gameData.eggsSold; 
    document.getElementById("eggCollector").innerHTML = "Egg Collector (£" + EggCollector.eggcollectorCost.toFixed(2)+ ") (" + EggCollector.eggcollectorNum + ")";
    document.getElementById("eggCollectorl").innerHTML = "Eggs collected per second: " + EggCollector.eggcollectorNum; 
    duckstoragebUpdate();
    buttonUpdate();
}

//Updates colour of buttons if you can purchase the next upgrade
function buttonUpdate () {
    //Storage button updater
    if (gameData.cash >= storageNums[gameData.currentStorage].cost) {
        document.getElementById("upgradeStorage").style.backgroundColor = "#4CAF50";
    } else if (gameData.cash < storageNums[gameData.currentStorage].cost && gameData.currentStorage != storageNums.length) {
        document.getElementById("upgradeStorage").style.backgroundColor = "#af4c4c";
    } else { 
        document.getElementById("upgradeStorage").style.backgroundColor = "#4CAF50";
    }

    //eggCollector Updater
    let y = EggCollector.eggcollectorCost;
    if (gameData.cash >= y) {
        document.getElementById("eggCollector").style.backgroundColor = "#4CAF50";
    } else if (gameData.cash < y) {
        document.getElementById("eggCollector").style.backgroundColor = "#af4c4c";
    }
}

//Separate function that checks to see if storage upgrade has reached its max - separate to not clutter the duckUpdate function
function duckstoragebUpdate () {
    if (gameData.currentStorage != storageNums.length) {
        document.getElementById("upgradeStorage").innerHTML = "Upgrade Storage to [" + storageNums[gameData.currentStorage].amount + "] " + "(£" + storageNums[gameData.currentStorage].cost + ")"; 
    } else {
        document.getElementById("upgradeStorage").innerHTML = "Storage MAX";
    }
}

//When sell eggs is clicked sells total eggs in storage for their egg cost
function sellEggs() {
    gameData.cash = gameData.cash + gameData.eggs * gameData.cost;
    gameData.eggsSold += gameData.eggs;
    gameData.eggs = 0;
    duckUpdate();
}

//When upgrade storage clicked, checks there is enough CASH + storage is NOT at max, then updates storage, removes cash for cost, and increases storageStage 
function upgradeStorage() {
    if (gameData.currentStorage == storageNums.length) {
      return;  
    } else if (gameData.cash >= storageNums[gameData.currentStorage].cost) {
        gameData.storage = storageNums[gameData.currentStorage].amount;
        gameData.cash -= storageNums[gameData.currentStorage].cost;
        gameData.currentStorage++;
        duckUpdate()
    }
}
    
    
    /*
    if (gameData.cash >= storageNums.storageCost[x] && storageNums.storageCost[x] != 9999) {
        gameData.storage = storageNums.storageAmount[x];
        gameData.cash -= storageNums.storageCost[x];
        storageNums.storageStage++;
        duckUpdate();
    }
} */

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
    if (x == 0 && gameData.cash >= y) {
        EggCollector.eggcollectorNum = 1;
        gameData.cash -= 10;
        EggCollector.eggcollectorCost = 10 * Math.pow(1.1, x+1); 
        duckUpdate();
    } else if (x > 0 && gameData.cash >= y) {
        EggCollector.eggcollectorNum++;
        gameData.cash -= y;
        EggCollector.eggcollectorCost = 10 * Math.pow(1.1, x+1); 
        duckUpdate();
    }
    console.log(EggCollector.eggcollectorNum);
}

//Collects eggs based on how many eggCollectors you have
function collectEggs () {
    let x = EggCollector.eggcollectorNum;
    if (gameData.eggs + x <= gameData.storage) {
        gameData.eggs += x;
        duckUpdate();
    } else if (gameData.eggs + x > gameData.storage) {
        gameData.eggs = gameData.storage;
        duckUpdate();
    }
}

function devGetCash() {
    gameData.cash += 100;
    duckUpdate();
}

function devSaveGame() {
    localStorage.setItem('duckgameSave', JSON.stringify(gameData));
}

function devReset() {
    gameData = defaultValues;
    localStorage.clear('duckgameSave')
    duckUpdate();
}



