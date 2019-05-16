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
    lifetimeCash: 0,
    eggcollectorNum: 0,
    eggcollectorCost: 10,
    click_increment: 1,
    click_increment_cost: 1,
    unlockStorage: false,
    unlockClick: false,
    unlockCollector: false,
    unlockEggcost: false
};

//Creates a NodeList with DOM of all elements on website that has a ID tag.
var element = {};
for (var el of document.querySelectorAll("*").values()){
  if (!!(el.getAttribute("id"))){
    element[el.id] = el;
  }
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

//Current total cash + lifetimeCash
    cash: 0,
    lifetimeCash: 0,

//Shows no. of eggCollectors + the cost of each eggCollector (increases with each purchase).
    eggcollectorNum: 0,
    eggcollectorCost: 10,

    click_increment: 1,
    click_increment_cost: 1,

//Upgrades Unlocked
    unlockStorage: false,
    unlockClick: false,
    unlockCollector: false,
    unlockEggcost: false
};

var duckImages = ["pics\\duck1.png", "pics\\duck2.png", "pics\\duck3.png"];

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
  if (typeof gameData.lifetimeCash === "undefined") gameData.lifetimeCash = defaultValues.lifetimeCash;
  if (typeof gameData.eggcollectorNum === "undefined") gameData.eggcollectorNum = defaultValues.eggcollectorNum;
  if (typeof gameData.eggcollectorCost === "undefined") gameData.eggcollectorCost = defaultValues.eggcollectorCost;
  if (typeof gameData.click_increment === "undefined") gameData.click_increment = defaultValues.click_increment;
  if (typeof gameData.click_increment_cost === "undefined") gameData.click_increment_cost = defaultValues.click_increment_cost;
  if (typeof gameData.cost_increase_num === "undefined") gameData.cost_increase_num = defaultValues.cost_increase_num;
  if (typeof gameData.autosave === "undefined") gameData.autosave = defaultValues.autosave;
  if (typeof gameData.unlockStorage === "undefined") gameData.unlockStorage = defaultValues.unlockStorage;
  if (typeof gameData.unlockClick === "undefined") gameData.unlockClick = defaultValues.unlockClick;
  if (typeof gameData.unlockCollector === "undefined") gameData.unlockCollector = defaultValues.unlockCollector;
  if (typeof gameData.unlockEggcost === "undefined") gameData.unlockEggcost = defaultValues.unlockEggcost;
  
  duckChoose(gameData.duckchosen);
  duckNamed(gameData.duckName);
  duckUpdate();
  console.log("Game LOADED from Save");

} else {
    gameData = defaultValues;
    console.log("NO SAVE FOUND, default values.");
}


// Hides the chooseDuck element and shows the duckNaming elements and chosen duck
function duckChoose (num) {
    element["chooseDuck"].style.display = "none";
    element["mainDuck"].style.display = "block";
    element["nameDuck"].style.display = "block";
    element["mainDuckImg"].src=duckImages[num];
    gameData.duckchosen = num;
}

//Gets ducks NAME from the input, changes the ducks NAME to NAME, hides the 
function duckNamed (dName2) {
    if (dName2 == null) {
        gameData.duckName = element["dName"].value;
    } else {
        gameData.duckName = dName2;
    }
    element["dName2"].innerHTML = gameData.duckName;
    element["dName2"].style.display = "block";
    element["nameDuck"].style.display = "none";
    element["mainDuckImg"].setAttribute("onClick", "duckClicked()");
    element["buttons"].style.display = "block";
    element["upgrades"].style.display = "block";
    element["eggInfo"].style.display = "block";
    duckUpdate();
}

//Function RUNS when mainDuck is clicked and adds click_increment eggs each click, also sets the progress bar for the storage
function duckClicked () {
    if (gameData.eggs + gameData.click_increment <= gameData.storage) {
        gameData.eggs += gameData.click_increment;
        element["totalEggsProg"].value = 100 * (gameData.eggs/gameData.storage);
    } else if (gameData.eggs + gameData.click_increment > gameData.storage) {
        gameData.eggs = gameData.storage;
        element["totalEggsProg"].value = 100 * (gameData.eggs/gameData.storage);
    }
    duckUpdate();
}

//Updates all BUTTONS and TEXT in the HTML, this is run every click and everytime a upgrade/autoclick event happens.
function duckUpdate () {
    element["totalEggs"].innerHTML = "Total eggs: " + gameData.eggs + "/" + gameData.storage;
    element["totalCash"].innerHTML = "Cash: £" + gameData.cash.toFixed(2);
    element["totalEggsProg"].value = 100 * (gameData.eggs/gameData.storage);
    element["eggPrice"].innerHTML = "Price per egg: £" + gameData.cost.toFixed(2);
    
    
    element["sellEggs"].innerHTML = "Sell Eggs (£" + (gameData.eggs * gameData.cost).toFixed(2) + ")";
    element["sellEggsl"].innerHTML = "Total eggs sold: " + gameData.eggsSold; 
    element["eggCounter"].innerHTML = gameData.eggsSold; 
    
    element["eggCollector"].innerHTML = "Egg Collector (£" + gameData.eggcollectorCost.toFixed(2)+ ") (" + gameData.eggcollectorNum + ")";
    element["eggCollectorl"].innerHTML = "Eggs collected per second: " + gameData.eggcollectorNum; 
    
    element["eggClickers"].innerHTML = "Eggs per click (£" + gameData.click_increment_cost.toFixed(2) + ") (" + gameData.click_increment + ")";
    element["eggClickersl"].innerHTML = "Eggs per click: "+ gameData.click_increment; 
    
    element["upgradeEgg"].innerHTML = "Improve Egg Value (£" + gameData.cost_increase_cost.toFixed(2) + ")";

    element["lifetimeCash"].innerHTML = "Lifetime cash: £" + gameData.lifetimeCash.toFixed(2); 
    
    duckstoragebUpdate();
    buttonUpdate();
    unlockUpdate();
}

//Updates colour of buttons if you can purchase the next upgrade
function buttonUpdate() {
    //Storage button updater
    if (gameData.currentStorage != storageNums.length) {
        setBackgroundIf("upgradeStorage", gameData.cash >= storageNums[gameData.currentStorage].cost, "#05D36B", "#af4c4c");
    }
    setBackgroundIf("eggCollector", gameData.cash >= gameData.eggcollectorCost, "#05D36B", "#af4c4c");
    setBackgroundIf("eggClickers", gameData.cash >= gameData.click_increment_cost, "#05D36B", "#af4c4c");
    setBackgroundIf("upgradeEgg", gameData.cash >= gameData.cost_increase_cost, "#05D36B", "#af4c4c");
}

//Function that takes element, condition and colours and sets the element to that colour
function setBackgroundIf(elementName, condition, trueColour, falseColour){
    element[elementName].style.backgroundColor = condition ? trueColour : falseColour; 
  }

//Checks if upgrade has been unlocked, if so it shows the upgrade element.
function unlockUpdate() {
    if (gameData.unlockStorage === true) {
        element["upgradeStorage"].style.display = "inline-block";
        element["upgradeStorageU"].classList.add("disabled");
    }
    if (gameData.unlockClick === true) {
        element["eggClickers"].style.display = "inline-block";
        element["eggClickersU"].classList.add("disabled");
    }
    if (gameData.unlockCollector === true) {
        element["eggCollector"].style.display = "inline-block";
        element["eggCollectorU"].classList.add("disabled");
    }
    if (gameData.unlockEggcost === true) {
        element["upgradeEgg"].style.display = "inline-block";
        element["upgradeEggU"].classList.add("disabled");
    }
}

function upgradeStorageU() {
    if (gameData.cash >= 0.5) {
      gameData.unlockStorage = true;
      gameData.cash -= 0.5;
      duckUpdate();
    }
}

function eggClickersU() {
    if (gameData.cash >= 1) {
      gameData.unlockClick = true;
      gameData.cash -= 1;
      duckUpdate();
    }
}

function eggCollectorU() {
    if (gameData.cash >= 5) {
      gameData.unlockCollector = true;
      gameData.cash -= 5;
      duckUpdate();
    }
}

function upgradeEggU() {
    if (gameData.cash >= 50) {
      gameData.unlockEggcost = true;
      gameData.cash -= 50;
      duckUpdate();
    }
}

//Separate function that checks to see if storage upgrade has reached its max - separate to not clutter the duckUpdate function
function duckstoragebUpdate () {
    if (gameData.currentStorage != storageNums.length) {
        element["upgradeStorage"].innerHTML = "Upgrade Storage to [" + storageNums[gameData.currentStorage].amount + "] " + "(£" + storageNums[gameData.currentStorage].cost + ")"; 
    } else {
        element["upgradeStorage"].innerHTML = "Storage MAX";
    }
}

//When sell eggs is clicked sells total eggs in storage for their egg cost
function sellEggs() {
    gameData.cash = gameData.cash + gameData.eggs * gameData.cost;
    gameData.lifetimeCash += gameData.eggs * gameData.cost;
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
        duckUpdate();
    }
}
    

//Main game loop that happens every 1 second
var mainGameLoop = window.setInterval(function() {
    if (gameData.eggcollectorNum > 0) {
    collectEggs();
    } 
    }, 1000);

//Function that turns egg collector on and handles buying new egg collectors, price increases by 10 x 1.1^(no. owned)
function eggCollectorOn () {
    if (gameData.eggcollectorNum >= 0 && gameData.cash >= gameData.eggcollectorCost) {
        gameData.eggcollectorNum++;
        gameData.cash -= gameData.eggcollectorCost;
        gameData.eggcollectorCost = 10 * Math.pow(1.1, gameData.eggcollectorNum + 1); 
        duckUpdate();
    }
    console.log(gameData.eggcollectorNum);
}

//Increases amount of eggs on click
function eggClickers() {
    if (gameData.click_increment_cost <= gameData.cash && gameData.click_increment < 100) {
        gameData.click_increment++;
        gameData.cash -= gameData.click_increment_cost;
        gameData.click_increment_cost = 1 * Math.pow(1.4, gameData.click_increment);
        duckUpdate();
    }
}

//Upgrades the value of the egg
function upgradeEgg() {
    if (gameData.cost_increase_cost <= gameData.cash) {
        gameData.cost += 0.05;
        gameData.cash -= gameData.cost_increase_cost;
        gameData.cost_increase_cost = 100 * Math.pow(1.4, gameData.cost_increase_num);
        gameData.cost_increase_num++;
        duckUpdate();
    }

}

//Collects eggs based on how many eggCollectors you have
function collectEggs () {
    if (gameData.eggs + gameData.eggcollectorNum <= gameData.storage) {
        gameData.eggs += gameData.eggcollectorNum;
        duckUpdate();
    } else if (gameData.eggs + gameData.eggcollectorNum > gameData.storage) {
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
    localStorage.clear('duckgameSave');
    duckUpdate();
}

function devautoSave() {
    if (gameData.autosave == 1) {
        gameData.autosave = 0;
        element["devautosaveGame"].innerHTML = "Autosave (OFF)";
    } else if (gameData.autosave == 0) {
        gameData.autosave = 1;
        element["devautosaveGame"].innerHTML = "Autosave (ON)";
    }
}

var saveGameLoop = window.setInterval(function() {
    if (gameData.autosave == 1) {
    localStorage.setItem('duckgameSave', JSON.stringify(gameData));
    console.log("Autosaved");  
    }
  }, 15000);


//NAVBAR - Shows and hides various elements based on button pressed
function goHome() {
    if (element["flexGrid"].style.display === "none") {
        element["flexGrid"].style.display = "grid";
        element["stats"].style.display = "none";
        element["developerOptions"].style.display = "none";
        if (gameData.duckchosen === 0) {
            element["chooseDuck"].style.display = "block";
        }
    } 
}

function goStats() {
    if (element["stats"].style.display === "none") {
        element["stats"].style.display = "block";
        element["flexGrid"].style.display = "none"   
        element["chooseDuck"].style.display = "none";
        element["developerOptions"].style.display = "none";
    }
}

function goOptions() {
    if (element["developerOptions"].style.display === "none") {
        element["developerOptions"].style.display = "block";
        element["flexGrid"].style.display = "none"
        element["chooseDuck"].style.display = "none";
        element["stats"].style.display = "none";
    }
}
