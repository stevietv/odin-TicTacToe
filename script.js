const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMarker = (location, marker) => {

        if (location >= 0 && location <= board.length && board[location] === "") {
            board[location] = marker
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, placeMarker, resetBoard };

})();



function createPlayer(marker) {
    return { marker }
}

const Game = (() => {
    let playerOne = createPlayer("X");
    let playerTwo = createPlayer("O");
    let winner;

    let currentPlayer = playerOne;

    const takeTurn = (location) => {
        if (winner == null && Gameboard.placeMarker(location, currentPlayer.marker)) {
            console.log(Gameboard.getBoard())
            if (!checkWin()) {
                if (currentPlayer === playerOne)
                    currentPlayer = playerTwo;
                else
                    currentPlayer = playerOne;
            }
            Render();
        }
    }

    const getWinner = () => winner;
    const getCurrentPlayer = () => currentPlayer;

    const checkWin = () => {
        const board = Gameboard.getBoard();

        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [posA, posB, posC] = condition;

            if (board[posA] && board[posA] === board[posB] && board[posA] === board[posC]) {
                console.log(`we have a winner - ${currentPlayer.marker}`);
                winner = currentPlayer;
                return true;
            }
        };

        return false;
    }

    const resetGame = () => {
        winner = null;
        currentPlayer = playerOne;
        Gameboard.resetBoard();
        Render();
    }

    return { takeTurn, getWinner, getCurrentPlayer, resetGame };

})();


function Render() {

    let board = Gameboard.getBoard();
    
    for (let index = 0; index < 9; index++) {
        let id = `box-${index}`;
        let field = document.getElementById(id);

        switch (board[index]) {
            case "O":
                field.style.backgroundImage = "url('images/O.png')";
                break;
            case "X":
                field.style.backgroundImage = "url('images/X.png')";
                break;
            default:
                field.style.backgroundImage = "";
        }
    }

    let nextPlayerImage = document.getElementById('nextPlayer');
    nextPlayerImage.src = `images/${Game.getCurrentPlayer().marker}.png`;

    let winner = Game.getWinner();
    if (winner) {
        document.getElementById('winnerText').innerHTML = "The Winner Is:";
        document.getElementById('winnerImage').src = `images/${winner.marker}.png`;
    }
    else {
        document.getElementById('winnerText').innerHTML = "&nbsp;";
        document.getElementById('winnerImage').src = 'images/blank.png';
    }
}

function EnableClicks() {
    const fields = document.querySelectorAll('div.field');
    fields.forEach(field => {
        field.addEventListener('click', () => {
            let id = field.id.slice(-1);
            Game.takeTurn(id);
        })
    })

    const resetButton = document.getElementById('reset');
    
    resetButton.addEventListener('click', () => {
        Game.resetGame();
    })
}

EnableClicks();
