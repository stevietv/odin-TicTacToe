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



function createPlayer (marker) {
    return { marker }
}

const Game = (() => {
    let playerOne = createPlayer("X");
    let playerTwo = createPlayer("O");
    let winner;

    let currentPlayer = playerOne;

    const takeTurn = (location) => {
        if(Gameboard.placeMarker(location, currentPlayer.marker)){
            console.log(Gameboard.getBoard())
            if (currentPlayer === playerOne)
                currentPlayer = playerTwo;
            else
                currentPlayer = playerOne;
        }

        checkWin();
    }

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

        for(let condition of winConditions) {
            const [posA, posB, posC] = condition;
            
            if(board[posA] && board[posA] === board[posB] && board[posA] === board[posC]) {
                console.log("we have a winner");
                winner = currentPlayer;
                return true;
            }
        };

        return false;
    }


    return { takeTurn };

})();


