var errors = 0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
];

var data = {
    components: ['子', '女', '亻', '户', '氵', '火'],
    correctCombinations: {
        '女子': '好',
        '亻子': '仔',
        '氵户': '沪',
        '火户': '炉'
    },
    selectedComponents: [],
    result: ''
}


function selectComponent(event) { 
    const selected = event.target.innerHTML;
    const selectedComponents = data.selectedComponents;
    const correctCombinations = data.correctCombinations;

    if (selectedComponents.length < 2) {
        selectedComponents.push(selected);
        data.selectedComponents = selectedComponents;
    }

    if (selectedComponents.length === 2) {
        const combined = selectedComponents.join('');
        const result = correctCombinations[combined] || '错误组合';
        data.result = result;
        document.getElementById("result").innerHTML  = result;
        
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);

        resetSelection();
    }
}

function resetSelection() {
    setTimeout(() => {
        data.selectedComponents = [];
        data.result = '';
        document.getElementById("result").innerHTML  = data.result;
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.disabled = false);
    }, 1000);
}


var charList;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;

window.onload = function () {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    charList = Array(16).fill(data.components).reduce((a, b) => a.concat(b));
    console.log(charList);
    //shuffle
    for (let i = 0; i < charList.length; i++) {
        let j = Math.floor(Math.random() * charList.length); //get random index
        //swap
        let temp = charList[i];
        charList[i] = charList[j];
        charList[j] = temp;
    }
    console.log(charList);
}

function startGame() {
    //arrange the board 4x5
    for (let r = 0; r < 6; r++) {
        let row = [];
        for (let c = 0; c < 16; c++) {
            let character = charList.pop();
            row.push(character); //JS

            // <img id="0-0" class="card" src="water.jpg">
            let box = document.createElement("button");
            box.setAttribute("id", "button2");
            box.setAttribute("class", "button");
            box.textContent = character;
            
            // box.id = r.toString() + "-" + c.toString();
            // box.src = character + ".jpg";
            // box.classList.add("card");
            box.addEventListener("click", selectComponent);
            document.getElementById("board").append(box);

        }
        board.push(row);
    }

    console.log(board);
    // setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard() {

    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}