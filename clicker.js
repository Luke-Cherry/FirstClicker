//Default values for the variables in gameData used for NEW game or RESET game.
var defaultValues = {
    autosave: 1,
    duckchosen: 0,
    duckName: "",
    eggs: 0,
    eggsSold: 0,
    storage: 10,
    currentStorage: 0,
    cost: 0.1,
    cost_increase_cost: 100,
    cost_increase_num: 1,
    cash: 0,
    eggcollectorNum: 0,
    eggcollectorCost: 10,
    click_increment: 1,
    click_increment_cost: 1
}

var gameData = {
//Autosaves
    autosave: 1,
//Stores data for which duck chosen [1-3], and the ducks name in String format.
    duckchosen: 0,
    duckName: "",

//Stores the no. of eggs and eggsSold = total eggs sold lifetime.
    eggs: 0,
    eggsSold: 0,

//Stores the current maximum storage, and currentStorage is which part of the array storageNums[] reads from.
    storage: 10,
    currentStorage: 0,

//Value of each egg, cost of next upgrade, current upgrades
    cost: 0.1,
    cost_increase_cost: 100,
    cost_increase_num: 1,

//Current total cash
    cash: 0,

//Shows no. of eggCollectors + the cost of each eggCollector (increases with each purchase).
    eggcollectorNum: 0,
    eggcollectorCost: 10,

    click_increment: 1,
    click_increment_cost: 1
}

var duckImages = ["pics\\duck1.jpg", "pics\\duck2.png", "pics\\duck3.jpg"];

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
];

//Loads GAME + Checks and updates any new variables
var savedGame = JSON.parse(localStorage.getItem("duckgameSave"));

if (savedGame !== null) {
  gameData = savedGame;
  
  if (typeof gameData.duckchosen === "undefined") gameData.duckchosen = defaultValues.duckchosen;
  if (typeof gameData.duckName === "undefined") gameData.duckName = defaultValues.duckName;
  if (typeof gameData.eggs === "undefined") gameData.eggs = defaultValues.eggs;
  if (typeof gameData.eggsSold === "undefined") gameData.eggsSold = defaultValues.eggsSold;
  if (typeof gameData.storage === "undefined") gameData.storage = defaultValues.storage;
  if (typeof gameData.currentStorage === "undefined") gameData.currentStorage = defaultValues.currentStorage;
  if (typeof gameData.cost === "undefined") gameData.cost = defaultValues.cost;
  if (typeof gameData.cost_increase_cost === "undefined") gameData.cost_increase_cost = defaultValues.cost_increase_cost;
  if (typeof gameData.cash === "undefined") gameData.cash = defaultValues.cash;
  if (typeof gameData.eggcollectorNum === "undefined") gameData.eggcollectorNum = defaultValues.eggcollectorNum;
  if (typeof gameData.eggcollectorCost === "undefined") gameData.eggcollectorCost = defaultValues.eggcollectorCost;
  if (typeof gameData.click_increment === "undefined") gameData.click_increment = defaultValues.click_increment;
  if (typeof gameData.click_increment_cost === "undefined") gameData.click_increment_cost = defaultValues.click_increment_cost;
  if (typeof gameData.cost_increase_num === "undefined") gameData.cost_increase_num = defaultValues.cost_increase_num;
  if (typeof gameData.autosave === "undefined") gameData.autosave = defaultValues.autosave;
  
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
    document.getElementById("upgrades").style.display = "block";
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
    document.getElementById("eggPrice").innerHTML = "Price per egg: £" + gameData.cost.toFixed(2);
    
    
    document.getElementById("sellEggs").innerHTML = "Sell Eggs (£" + (gameData.eggs * gameData.cost).toFixed(2) + ")";
    document.getElementById("sellEggsl").innerHTML = "Total eggs sold: " + gameData.eggsSold; 
    
    document.getElementById("eggCollector").innerHTML = "Egg Collector (£" + gameData.eggcollectorCost.toFixed(2)+ ") (" + gameData.eggcollectorNum + ")";
    document.getElementById("eggCollectorl").innerHTML = "Eggs collected per second: " + gameData.eggcollectorNum; 
    
    document.getElementById("eggClickers").innerHTML = "Clicks per Egg (£" + gameData.click_increment_cost.toFixed(2) + ") (" + gameData.click_increment + ")";
    document.getElementById("eggClickersl").innerHTML = "Eggs per click: "+ gameData.click_increment; 
    
    document.getElementById("upgradeEgg").innerHTML = "Improve Egg Value (£" + gameData.cost_increase_cost.toFixed(2) + ")";
    
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
    let y = gameData.eggcollectorCost;
    if (gameData.cash >= y) {
        document.getElementById("eggCollector").style.backgroundColor = "#4CAF50";
    } else if (gameData.cash < y) {
        document.getElementById("eggCollector").style.backgroundColor = "#af4c4c";
    }

    //eggClickers Updater
    if (gameData.cash >= gameData.click_increment_cost) {
        document.getElementById("eggClickers").style.backgroundColor = "#4CAF50";
    } else if (gameData.cash < gameData.click_increment_cost) {
        document.getElementById("eggClickers").style.backgroundColor = "#af4c4c";
    }

    //eggCost Updator
    if (gameData.cash >= gameData.cost_increase_cost) {
        document.getElementById("upgradeEgg").style.backgroundColor = "#4CAF50";
    } else if (gameData.cash < gameData.cost_increase_cost) {
        document.getElementById("upgradeEgg").style.backgroundColor = "#af4c4c";
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
    

//Main game loop that happens every 1 second
var mainGameLoop = window.setInterval(function() {
    if (gameData.eggcollectorNum > 0) {
    collectEggs()
    } 
    }, 1000)

//Function that turns egg collector on and handles buying new egg collectors, price increases by 10 x 1.1^(no. owned)
function eggCollectorOn () {
    let x = gameData.eggcollectorNum;
    let y = gameData.eggcollectorCost;
    if (x == 0 && gameData.cash >= y) {
        gameData.eggcollectorNum = 1;
        gameData.cash -= 10;
        gameData.eggcollectorCost = 10 * Math.pow(1.1, x+1); 
        duckUpdate();
    } else if (x > 0 && gameData.cash >= y) {
        gameData.eggcollectorNum++;
        gameData.cash -= y;
        gameData.eggcollectorCost = 10 * Math.pow(1.1, x+1); 
        duckUpdate();
    }
    console.log(gameData.eggcollectorNum);
}

//Increases amount of eggs on click
function eggClickers() {
    let x = gameData.click_increment_cost;
    let y = gameData.click_increment;
    if (x <= gameData.cash && y < 100) {
        gameData.click_increment++;
        gameData.cash -= x;
        gameData.click_increment_cost = 1 * Math.pow(1.4, y);
        duckUpdate();
    }
}

//Upgrades the value of the egg
function upgradeEgg() {
    let x = gameData.cost_increase_cost;
    let y = gameData.cost;
    let z = gameData.cost_increase_num;
    if (x <= gameData.cash) {
        gameData.cost += 0.05;
        gameData.cash -= x;
        gameData.cost_increase_cost = 100 * Math.pow(1.4, z);
        gameData.cost_increase_num++;
        duckUpdate();
    }

}

//Collects eggs based on how many eggCollectors you have
function collectEggs () {
    let x = gameData.eggcollectorNum;
    if (gameData.eggs + x <= gameData.storage) {
        gameData.eggs += x;
        duckUpdate();
    } else if (gameData.eggs + x > gameData.storage) {
        gameData.eggs = gameData.storage;
        duckUpdate();
    }
}


//Dev Options
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

function devautoSave() {
    if (gameData.autosave == 1) {
        gameData.autosave = 0;
        document.getElementById("devautosaveGame").innerHTML = "Autosave (OFF)";
    } else if (gameData.autosave == 0) {
        gameData.autosave = 1;
        document.getElementById("devautosaveGame").innerHTML = "Autosave (ON)";
    }
}

var saveGameLoop = window.setInterval(function() {
    if (gameData.autosave == 1) {
    localStorage.setItem('duckgameSave', JSON.stringify(gameData));
    console.log("Autosaved")    
    }
  }, 15000)

