function exitHomePage() {
    window.open('../HomePage/HomePage.html', '_self', '');
    window.close();
}
function showDiv(idToShow) {
    if (idToShow !== "pickLevel" && (document.getElementById('startGame').style.display == "block" || document.getElementById('instructions').style.display == "block"||document.getElementById('myPoints').style.display == "block" ))
        return;
    if (idToShow == "instructions" && (document.getElementById('pickLevel').style.display == "block"))
        return;
    if (idToShow == "myPoints" && (document.getElementById('pickLevel').style.display == "block" || document.getElementById('instructions').style.display == "block"))
        return;
    if (idToShow == 'startGame' && localStorage.getItem('currentCard') == null) {
        localStorage.setItem("lastLevel", "Level1");
        localStorage.setItem("currentCard", 0);
        localStorage.setItem("points", 0);
        moveToGamePage();
    }
    if (idToShow == "myPoints") {
        let h2 = document.getElementById('playerPoints');
        h2.innerHTML = `You currently have ${localStorage.getItem('points')} points.`;
    }
    document.getElementById(idToShow).style.display = "block";
}
function moveToGamePage() {
    window.close();
    window.open("../Game/GB.html", "_blank");
}
function closeDiv(idToClose) {
    document.getElementById(idToClose).style.display = "none";
}
function continueOldGame() {
   moveToGamePage();
}
function updateLevel(level) {
    localStorage.setItem("lastLevel", level);
    localStorage.setItem("currentCard", 0);
    moveToGamePage();
}
function warning(event) {
    let pointsNeeded;
    if (event.target.id == "intermediate")
        pointsNeeded = 1000;
    else
        pointsNeeded = 3000;
    let points = eval(localStorage.getItem("points")); 
    if (document.getElementById('p') != null)
        return;
    let p = document.createElement('p');
    p.id = "p";
    p.innerHTML = `You need  ${pointsNeeded - points}  more points to unlock this level.`;
    document.getElementById('pickLevel').appendChild(p);
    setTimeout(() => { document.getElementById('pickLevel').removeChild(document.getElementById('p')) }, 3000);
}

//change points to get from local storage
function enableLevel() {
    let points = localStorage.getItem("points");
    if (points >= 1000) {
        let intermediate = document.getElementById('intermediate');
        intermediate.onclick = () => { updateLevel('Level2') };
        document.getElementById('lock1').style.display = 'none';
        intermediate.style.opacity = '1';
        intermediate.addEventListener('mouseover', () => { intermediate.style.backgroundColor = 'lightgray' });
        intermediate.addEventListener('mouseout', () => { intermediate.style.backgroundColor = 'rgb(239, 239, 239)' });
    }
    if (points >= 3000) {
        let expert = document.getElementById('expert');
        expert.onclick = () => { updateLevel('Level3') };
        document.getElementById('lock2').style.display = 'none';
        expert.style.opacity = '1';
        expert.addEventListener('mouseover', () => { expert.style.backgroundColor = 'lightgray' });
        expert.addEventListener('mouseout', () => { expert.style.backgroundColor = 'rgb(239, 239, 239)' });
    }
}
// reset 
function reset() {
    localStorage.clear();
    localStorage.setItem("points", 0);
    updateLevel('Level1');
}
