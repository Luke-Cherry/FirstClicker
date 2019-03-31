
var duckchosen = 0;
var duckName = "123";

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