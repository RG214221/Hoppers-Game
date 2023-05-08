function addH3() {
    let h3 = document.createElement('h3');
    h3.innerHTML = `You won the game with ${localStorage.getItem('points')} points!!!`
    document.getElementById("words").appendChild(h3);
}
function backToHomePage() {
    window.open("../HomePage/HomePage.html", "_self");
}
