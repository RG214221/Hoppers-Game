//exit game
function exit() {
    if (confirm("Are you sure you want to exit? Your progress will be saved! ")) {
        window.open('../Game/GB.html', '_self', '');
        window.close();
    }
    else {
        return;
    }
}
//board array- 1 means in this leaf there is a frog, 0 means in this leaf there is not.
let board_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//
let currentCard = localStorage.getItem("currentCard"); //represent the card currently being played
let numOfCards = 14;
let startNewGame = 0;//0 means start new game,1 means continue old game.
//The cards ordered by levels
let Level1 = {
    "card0": [0, 1, 5, 7, 11], "card1": [6, 7, 10], "card2": [0, 6, 9], "card3": [2, 4, 7],
    "card4": [1, 6, 8, 9], "card5": [0, 3, 6, 8], "card6": [2, 3,8, 11],
    "card7": [4, 7, 10, 11], "card8": [1, 3, 4, 8, 9], "card9": [1, 3, 4, 6, 7, 9],
    "card10": [1, 4, 5, 8, 9, 12], "card11": [0, 6, 7, 8, 11], "card12": [0, 2, 3, 4, 5],
    "card13": [1, 6, 8, 9, 11]
};
let Level2 = {
    "card0": [0, 3, 5, 6, 7, 8], "card1": [2, 3, 4, 6, 8, 9],
    "card2": [0, 3, 4, 6, 7, 8, 9, 11], "card3": [0, 1, 4, 5, 7, 8, 11, 12],
    "card4": [0, 1, 3, 4, 5, 7, 8, 9, 11], "card5": [5, 7, 8, 9, 10, 12],
    "card6": [1, 5, 6, 7, 8, 9, 11], "card7": [0, 1, 4, 5, 8, 9, 11],
    "card8": [1, 2, 3, 4, 7, 8, 9], "card9": [3, 4, 6, 10, 11, 12],
    "card10": [2, 3, 4, 6, 8, 10, 12], "card11": [1, 3, 4, 5, 6, 8, 12],
    "card12": [3, 4, 7, 8, 10, 12], "card13": [0, 1, 3, 5, 6, 9]
};
let Level3 = {
    "card0": [1, 3, 4, 5, 7, 10, 12], "card1": [1, 6, 8, 9, 10, 12],
    "card2": [0, 1, 3, 4, 5, 8, 12], "card3": [5, 6, 7, 8, 9, 11],
    "card4": [1, 8, 9, 10, 11, 12], "card5": [0, 2, 3, 4, 8, 9, 12],
    "card6": [2, 3, 4, 8, 9, 10, 12], "card7": [2, 3, 5, 6, 9, 10, 11],
    "card8": [3, 4, 5, 6, 8, 9, 11], "card9": [0, 1, 3, 6, 7, 9, 12], "card10":
        [0, 1, 3, 5, 6, 7, 9, 10, 12],
    "card11": [0, 1, 2, 3, 6, 7, 9, 12], "card12": [0, 1, 2, 3, 4, 5, 6, 8, 9, 10,
        11, 12],
    "card13": [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12]
};
//create cards to screen.
function createOneCard(level, cardId) {
    PrintCurrentLocation();
    //keep level and card in local storage.
    localStorage.setItem("lastLevel", level);
    localStorage.setItem("currentCard", currentCard);
    level = eval(level);
    for (let i = 0; i < level[`card${cardId}`].length; i++) {
        let frog = document.createElement('div');
        frog.className = "frogOnBoard";
        frog.addEventListener("dragstart", () => {
            drag(event);
        });
        frog.draggable = true;
        frog.id = "f" + level[`card${cardId}`][i];
        document.getElementById(level[`card${cardId}`][i]).appendChild(frog);
        board_array[level[`card${cardId}`][i]] = 1;
    }
}
//The moves
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    let data = ev.dataTransfer.getData("text");
    let fId = document.getElementById(data).id;
    if (ev.target.id[0] != 'f' && checkValidJump(fId, ev.target.id, "drop")) { // so, it won't let to drag more than one frog on each leaf
        ev.preventDefault();
        //play ribbit frog sound
        const ribbit = new Audio('../audio/ribbit.mp3');
        ribbit.play();
        //append
        ev.target.appendChild(document.getElementById(data));
        //update board array
        board_array[ev.target.id] = 1;
        board_array[fId.substr(1)] = 0;
        //change the frog's id
        document.getElementById(data).id = 'f' + ev.target.id;
        //check win and lose
        endOfChallenge();
    }

}
//validation jumps
function checkValidJump(idFromF, idToL, funcSource) {
    if (board_array[idToL] == 1)
        return false;
    if (idFromF.substr(1) == idToL)
        return false;
    if (idFromF == 'f0' && (idToL != 2 && idToL != 6 && idToL != 10))
        return false;
    if (idFromF == 'f1' && (idToL != 5 && idToL != 11 && idToL != 7))
        return false;
    if (idFromF == 'f2' && (idToL != 0 && idToL != 6 && idToL != 12))
        return false;
    if (idFromF == 'f3' && (idToL != 9))
        return false;
    if (idFromF == 'f4' && (idToL != 8))
        return false;
    if (idFromF == 'f5' && (idToL != 1 && idToL != 11 && idToL != 7))
        return false;
    if (idFromF == 'f6' && (idToL != 0 && idToL != 2 && idToL != 10 && idToL != 12))
        return false;
    if (idFromF == 'f7' && (idToL != 1 && idToL != 5 && idToL != 11))
        return false;
    if (idFromF == 'f8' && (idToL != 4))
        return false;
    if (idFromF == 'f9' && (idToL != 3))
        return false;
    if (idFromF == 'f10' && (idToL != 0 && idToL != 6 && idToL != 12))
        return false;
    if (idFromF == 'f11' && (idToL != 5 && idToL != 1 && idToL != 7))
        return false;
    if (idFromF == 'f12' && (idToL != 10 && idToL != 6 && idToL != 2))
        return false;

    return (checkJumpOverfrog(idFromF.substr(1), idToL, funcSource));

}

function checkJumpOverfrog(idFromF, idToL, funcSource) {
    switch (idFromF) {
        case '0':
            switch (idToL) {
                case '2':
                    return removeFrog(1, funcSource);
                    break;
                case '6':
                    return removeFrog(3, funcSource);
                    break;
                case '10':
                    return removeFrog(5, funcSource);
                    break;
            }
            break;
        case '1':
            switch (idToL) {
                case '5':
                    return removeFrog(3, funcSource);
                    break;
                case '7':
                    return removeFrog(4, funcSource);
                    break;
                case '11':
                    return removeFrog(6, funcSource);
                    break;
            }
            break;
        case '2':
            switch (idToL) {
                case '0':
                    return removeFrog(1, funcSource);
                    break;
                case '6':
                    return removeFrog(4, funcSource);
                    break;
                case '12':
                    return removeFrog(7, funcSource);
                    break;
            }
            break;
        case '3':
            return removeFrog(6, funcSource);
            break;
        case '4':
            return removeFrog(6, funcSource);
            break;
        case '5':
            switch (idToL) {
                case '1':
                    return removeFrog(3, funcSource);
                    break;
                case '7':
                    return removeFrog(6, funcSource);
                    break;
                case '11':
                    return removeFrog(8, funcSource);
                    break;
            }
            break;
        case '6':
            switch (idToL) {
                case '0':
                    return removeFrog(3, funcSource);
                    break;
                case '2':
                    return removeFrog(4, funcSource);
                    break;
                case '10':
                    return removeFrog(8, funcSource);
                    break;
                case '12':
                    return removeFrog(9, funcSource);
                    break;
            }
            break;
        case '7':
            switch (idToL) {
                case '1':
                    return removeFrog(4, funcSource);
                    break;
                case '5':
                    return removeFrog(6, funcSource);
                    break;
                case '11':
                    return removeFrog(9, funcSource);
                    break;
            }
            break;
        case '8':
            return removeFrog(6, funcSource);
            break;
        case '9':
            return removeFrog(6, funcSource);
            break;
        default: return false;
        case '10':
            switch (idToL) {
                case '0':
                    return removeFrog(5, funcSource);
                    break;
                case '6':
                    return removeFrog(8, funcSource);
                    break;
                case '12':
                    return removeFrog(11, funcSource);
                    break;
            }
            break;
        case '11':
            switch (idToL) {
                case '1':
                    return removeFrog(6, funcSource);
                    break;
                case '5':
                    return removeFrog(8, funcSource);
                    break;
                case '7':
                    return removeFrog(9, funcSource);
                    break;
            }
            break;
        case '12':
            switch (idToL) {
                case '2':
                    return removeFrog(7, funcSource);
                    break;
                case '6':
                    return removeFrog(9, funcSource);
                    break;
                case '10':
                    return removeFrog(11, funcSource);
                    break;
            }
            break;
    }
}
function removeFrog(fid, funcSource) {
    if (board_array[fid] == 0) {
        return false;
    }
    if (funcSource == "drop") {
        document.getElementById(fid).removeChild(document.getElementById('f' + fid));
        board_array[fid] = 0;
    }
    return true;
}
//end of challenge
//win
function endOfChallenge() {
    if (checkWin()) {
        win();
        return;
    }
    if (checkLose())
        lose();
}
function checkWin() {
    let count = 0;
    for (let i = 0; i < board_array.length; i++) {
        if (board_array[i] == 1)
            count++;
    }
    return count == 1;
}
function win() {
    //adds points
    let pointsToAdd;
    switch (localStorage.getItem("lastLevel")) {
        case 'Level1': pointsToAdd = 100;
            break;
        case 'Level2': pointsToAdd = 200;
            break;
        case 'Level3': pointsToAdd = 300;
            break;
    }
    let screenPoints = document.createElement('p')
    screenPoints.innerHTML = `${pointsToAdd}`;
    screenPoints.id = "screenPoints";
    screenPoints.style.animationName = "grow";
    screenPoints.style.animationDuration = "3s";
    screenPoints.style.animationTimingFunction = "ease-in-out";
    screenPoints.style.paddingLeft = "50%";
    screenPoints.style.paddingTop = "11%";
    screenPoints.style.position = "relative";
    screenPoints.style.zIndex = "5";
    document.getElementById('body').appendChild(screenPoints);
    setTimeout(() => { document.getElementById('body').removeChild(screenPoints); }, 2000)
    //play win music
    const win = new Audio('../audio/win.wav');
    win.play();
    //update points
    setTimeout(() => {
        localStorage.setItem("points", eval(localStorage.getItem("points")) + pointsToAdd);
        document.getElementById("points").innerHTML = `Points: ${localStorage.getItem("points")}`
    },2000)
    //frog jumps
    let remainingFrog;
    for (let i = 0; i < board_array.length; i++) {
        if (board_array[i] == 1) {
            remainingFrog = i;
        }
    }
    let jumpingFrog = document.getElementById('f' + remainingFrog);
    jumpingFrog.style.animationName = "jump";
    jumpingFrog.style.animationDuration = "0.5s";
    jumpingFrog.style.animationIterationCount = "3";
    jumpingFrog.style.animationTimingFunction = "ease-in-out";
    //if level is not finished yet goes on to the next card
    if (currentCard < numOfCards - 1) {
        setTimeout(() => {
            currentCard++;
            goThroughLevel();
        }, 2400);
    }
    if (currentCard == numOfCards - 1)
        setTimeout(() => {
        endLevel();
        },3000)
}
//lose
function checkLose() {
    for (let i = 0; i < board_array.length; i++) {
        if (board_array[i] == 1) {
            for (let j = 0; j < board_array.length; j++) {
                if (checkValidJump('f' + i, '' + j, "lose"))
                    return false;
            }
        }
    }
    return true;
}
function lose() {
    //play lose music
    const lose = new Audio('../audio/lose.wav');
    lose.play();
    let screenPoints2 = document.createElement('p')
    screenPoints2.innerHTML = "-100"
    screenPoints2.id = "screenPoints";
    screenPoints2.style.animationName = "shrink";
    screenPoints2.style.animationDuration = "3s";
    screenPoints2.style.animationTimingFunction = "ease-in-out";
    screenPoints2.style.paddingLeft = "50%";
    screenPoints2.style.paddingTop = "11%";
    screenPoints2.style.position = "relative";
    screenPoints2.style.zIndex = "5";
    document.getElementById('body').appendChild(screenPoints2);
    setTimeout(() => { document.getElementById('body').removeChild(screenPoints2); }, 2000)
    setTimeout(() => {
        document.getElementById("loseChoice").style.display = "block";
    },2500)
    //subtracts points
    if (localStorage.getItem("points") - 100 > 0)
        localStorage.setItem("points", eval(localStorage.getItem("points")) - 100);
    else
        localStorage.setItem("points", 0);
    document.getElementById("points").innerHTML = `Points: ${localStorage.getItem("points")}`;
}

//lose choice
function tryAgain() {
    document.getElementById("loseChoice").style.display = "none";
    i = localStorage.getItem("currentCard");
    goThroughLevel();
}
//Home Page
function backToHomePage() {
    window.close();
    window.open("../HomePage/HomePage.html", "_blank");
}

//gets level and goes through cards of that level
function goThroughLevel() {
    //update points
    document.getElementById("points").innerHTML = `Points: ${localStorage.getItem("points")}`
    //restarts board and board_array (removes remaining frogs and updates array)
    for (let i = 0; i < board_array.length; i++) {
        if (board_array[i] == 1) {
            document.getElementById(i).removeChild(document.getElementById('f' + i));
            board_array[i] = 0;
        }
    }
    //gets chosen level from local storage and creates next card in level
    let level = localStorage.getItem("lastLevel");
    createOneCard(level, currentCard);
}
//hint
function hint() {
    let validHint = false;
    for (let i = 0; i < board_array.length; i++) {
        if (board_array[i] == 1) {
            for (let j = 0; j < board_array.length; j++) {
                if (checkValidJump('f' + i, '' + j, "lose")) {
                    setTimeout(() => { flash('f' + i); }, 500);
                    validHint = true;
                }
                   
            }
        }
    }
    //subtracts points
    if (validHint == true) {
        if (localStorage.getItem("points") - 20 > 0)
            localStorage.setItem("points", eval(localStorage.getItem("points")) - 20);
        else
            localStorage.setItem("points", 0);
        document.getElementById("points").innerHTML = `Points: ${localStorage.getItem("points")}`;
    }
}
function flash(frogId) {
    let flash = setInterval(() => { document.getElementById(frogId).style.backgroundImage = "url('../images/redBorderedFrog.png')" }, 500);
    let cancelFlash = setInterval(() => { document.getElementById(frogId).style.backgroundImage= "url('../images/frog.png')"  }, 1000);
    setTimeout(() => { clearInterval(flash); clearInterval(cancelFlash); }, 2000);
}
function endLevel() {
     let pointsNeeded;
    let currentLevel = localStorage.getItem("lastLevel")
    if (currentLevel == "Level3") {
        winGame();
        return;
    }
    if (currentLevel == "Level1")
        pointsNeeded = 1000;
    if (currentLevel == "Level2")
        pointsNeeded = 3000;
    if (localStorage.getItem("points") < pointsNeeded)
        notEnoughPoints();
    else
        enoughPoints();
}
function enoughPoints() {
    document.getElementById("enough").style.display = "block";
}
function nextLevel() {
    let nextLevel;
    let currentLevel = localStorage.getItem("lastLevel")
    if (currentLevel == "Level1")
        nextLevel = "Level2";
    if (currentLevel == "Level2")
        nextLevel = "Level3";
    localStorage.setItem("lastLevel", nextLevel);
    localStorage.setItem("currentCard", 0);
    currentCard = 0;
    document.getElementById("enough").style.display = "none";
    goThroughLevel();
}
function notEnoughPoints() {
    document.getElementById("notEnough").style.display = "block";
}
function repeatLevel() {
    document.getElementById("notEnough").style.display = "none";
    localStorage.setItem("currentCard", 0);
    currentCard = 0;
    goThroughLevel();
}
function winGame() {
    //play win music
    const bigWin = new Audio('../audio/win2.wav');
    bigWin.play();
    const img = document.createElement('img');
    img.id = "gif";
    img.src = "../images/winner.gif";
    document.getElementById('body').appendChild(img);
    setTimeout(() => { window.open("../Win/win.html", "_self");},3000)
}
function PrintCurrentLocation() {
    document.getElementById('body').removeChild(document.getElementById('printLoc'))
    let div = document.createElement('div')
    div.id = 'printLoc'
    let h2 = document.createElement('h2');
    if (currentCard < 9) {
        h2.innerHTML = '0'
        h2.innerHTML += `${parseInt(currentCard) + parseInt(1)}/14`
    }
    else
        h2.innerHTML = `${parseInt(currentCard) + parseInt(1)}/14`
    let h3 = document.createElement('h3');
    if (localStorage.getItem("lastLevel") == "Level1")
        h3.innerHTML = 'Begginer';
    if (localStorage.getItem("lastLevel") == "Level2")
        h3.innerHTML = 'Intermediate';
    else if (localStorage.getItem("lastLevel") == "Level3")
        h3.innerHTML = 'Expert';
    div.appendChild(h2);
    div.appendChild(h3);
    document.getElementById('body').appendChild(div)
}