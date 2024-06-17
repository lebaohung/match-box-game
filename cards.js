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
    }, 1100);
}


var charList;
var board = [];

window.onload = function () {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    charList = Array(2).fill(data.components).reduce((a, b) => a.concat(b));
    //shuffle
    for (let i = 0; i < charList.length; i++) {
        let j = Math.floor(Math.random() * charList.length); //get random index
        //swap
        let temp = charList[i];
        charList[i] = charList[j];
        charList[j] = temp;
    }
}

function startGame() {
    //arrange the board 4x5
    for (let r = 0; r < 4; r++) {
        let row = [];
        for (let c = 0; c < 3; c++) {
            let character = charList.pop();
            row.push(character); //JS

            let box = document.createElement("button");
            box.setAttribute("id", "button2");
            box.setAttribute("class", "button");
            box.textContent = character;
            
            box.addEventListener("click", selectComponent);
            document.getElementById("board").append(box);

        }
        board.push(row);
    }
}

