
var calculateBestPossibleMove =function(game) {

    bestMove = null;
    bestValue = -100000;

    //generate all the moves for a given position
    var newGameMoves = game.ugly_moves();
    return newGameMoves[Math.floor(Math.random() * newGameMoves.length)];

    for(var move = 0; move < newGameMoves.length; move++) {
        newMove = newGameMoves[move]
        // simulate the next move 
        game.ugly_move(newMove)

        // Get the piece value ( relative to current position )
        var currentGameValue = calculateGameValue(game.board())
        // revert the simulated move 
        game.undo()

        if (currentGameValue > bestValue) {
            bestValue = currentGameValue; 
            bestMoveNow = newMove
        }

    return bestMoveNow
    }
}; 

var reverseArray = function(array) {
    return array.slice().reverse();
};

// **********************
// Piece Square Tables     
// Credits: http://www.chessbin.com/post/Piece-Square-Table
// **********************

// Pawns are encouraged to stay in the center and advance forward:
var pawnTableWhite= 
[
     [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
     [5,  5, 10, 27, 27, 10,  5,  5],
     [0,  0,  0, 25, 25,  0,  0,  0],
     [5, -5,-10,  0,  0,-10, -5,  5],
     [5, 10, 10,-25,-25, 10, 10,  5],
     [0,  0,  0,  0,  0,  0,  0,  0]
]

var pawnTableBlack = reverseArray(pawnTableWhite)

// Bishops are also encouraged to control the center and stay away from edges and corners:
var bishopTableWhite = 
[
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-40,-10,-10,-40,-10,-20],
]

var bishopTableBlack = reverseArray(bishopTableWhite)

// Kings have 2 piece square tables, one for the end game and one for the middle game.  During the middle game kings are encouraged to stay in the corners, while in the end game kings are encouraged to move towards the center.

var kingTableWhite = 
[
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10], 
  [20,  20,   0,   0,   0,   0,  20,  20],
   [20,  30,  10,   0,   0,  10,  30,  20]
]

var kingTableBlack = reverseArray(kingTableWhite)


var rookTableWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookTableBlack = reverseArray(rookTableWhite)

// Knights are encouraged to control the center and stay away from edges to increase mobility:
var knightTable
[
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-20,-30,-30,-20,-40,-50],
]

var queenTable = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var calculateGameValue = function(board) {
    var totalValue = 0 
    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 8; j++) {
            totalValue += getPieceValue(board[i, j], i, j)
        }
    }
    return totalValue
}

var getPieceValue = function(position, x, y) {}

var config = {
    showNotation: false,
    position: 'start',
    draggable: true,
    moveSpeed: 'slow',
    snapbackSpeed: 500,
    snapSpeed: 100
}

var board = ChessBoard('board', config);
// var game = new Chess()

$('#startBtn').on('click', board.start);


