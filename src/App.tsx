import { useState } from 'react';
import './App.css';
import BoardPiece from './components/board-piece/piece.component';
import OpeningScreen, {Players} from './features/opening-screen/opening-screen.component';
import ClosingScreen from './features/closing-screen/closing-screen.component';
function App() {
  type coin = 0 | 1 | 2;
  const [gameBoard, setGameBoard] = useState<coin[][]>([[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]);
  const [curPlayer, setCurPlayer] = useState<'player 1' | 'player 2'>('player 1');
  const [winner, setWinner] = useState<'player 1' | 'player 2' | 'tie' | 'no one'>('no one');
  const [displayOverlay, setDisplayOverlay] = useState<boolean>(true);
  const [showOpeningScreen, setShowOpeningScreen] = useState<boolean>(true);
  const [chosenPlayerColors, setChosenPlayerColors] = useState<Players>({player1: "defaultBlue", player2: "defaultRed"});
  const [showClosingScreen, setShowClosingScreen] = useState<boolean>(false);
  
  function pieceClick(column: number) {
    for (let row = 7; row >= 0; row--) {
      if (gameBoard[row][column] === 0) {
        if (curPlayer === 'player 1') {
          gameBoard[row][column] = 1;
        } else {
          gameBoard[row][column] = 2;
        }
        setGameBoard(gameBoard);
        hasGameEnded();
        switchPlayer();
        break;
      }
    }
  }
  function hasGameEnded(): void {
    let horizontal = horizontalWin();
    let vertical = verticalWin();
    let diagonal = diagonalWin();
    if ((horizontal || vertical || diagonal) !== 0) {
      winWay(horizontal);
      winWay(vertical);
      winWay(diagonal);
    } else if (isTie()) {
      setWinner('tie');
    } else {
      return;
    }
    gameOver()
  }
  function winWay(way: number): void {
    if (way === 1) {
      setWinner('player 1');
    }
    if (way === 2) {
      setWinner('player 2');
    }
  }
  function horizontalWin(): coin {
    for (let row = 7; row >= 0; row--) {
      for (let column = 6; column >= 0; column--) {
        if(gameBoard[row][column] !== 0 ) {
          if((gameBoard[row][column] === gameBoard[row][column+1] && gameBoard[row][column] === gameBoard[row][column+2] &&  gameBoard[row][column] === gameBoard[row][column+3]) ||(gameBoard[row][column] === gameBoard[row][column-1] && gameBoard[row][column] === gameBoard[row][column-2] &&  gameBoard[row][column] === gameBoard[row][column-3]))  {
            return gameBoard[row][column];
          }
        }
      }
    }
    return 0
  }
  function verticalWin(): coin {
    for (let row = 7; row >= 3; row--) {
      for (let column = 6; column >= 0; column--) {
        if(gameBoard[row][column] !== 0 ) {
          if(gameBoard[row][column] === gameBoard[row-1][column] && gameBoard[row][column] === gameBoard[row-2][column] &&  gameBoard[row][column] === gameBoard[row-3][column]) {
            return gameBoard[row][column];
          }
        }
      }
    }
    return 0
  }
  function diagonalWin(): coin {
    for (let row = 7; row >= 3; row--) {
      for (let column = 6; column >= 0; column--) {
        if(gameBoard[row][column] !== 0 ) {
          if ( (gameBoard[row][column] === gameBoard[row-1][column+1] && gameBoard[row][column] === gameBoard[row-2][column+2] && gameBoard[row][column] === gameBoard[row-3][column+3]) || (gameBoard[row][column] === gameBoard[row-1][column-1] && gameBoard[row][column] === gameBoard[row-2][column-2] && gameBoard[row][column] === gameBoard[row-3][column-3])) {
            return gameBoard[row][column];
          }
        }
      }
    }
    return 0
  }
  function isTie(): boolean {
    return gameBoard.every((row: number[]) => {
     return row.every((val: number) => val !== 0)
    })
  }
  function gameOver() {
    console.log(winner);
    setDisplayOverlay(true);
    setShowClosingScreen(true);
  }
  function switchPlayer(): void {
    if (curPlayer === 'player 1') {
      setCurPlayer('player 2');
    } else {
      setCurPlayer('player 1');
    }
  }
  function handleOpeningScreenButton(chosenColors: Players): void {
    setDisplayOverlay(false);
    setShowOpeningScreen(false);
    if(chosenColors.player1 === "") {
      if(chosenColors.player2 === "blue") {
        chosenColors.player1 = "red";
      } else {
        chosenColors.player1 = "blue";
      }
    }
    if(chosenColors.player2 === "") {
      if(chosenColors.player1 === "red") {
        chosenColors.player2 = "blue";  
      } else {
        chosenColors.player2 = "red";
      }
    }
    setChosenPlayerColors(chosenColors);
  }
  return (
    <>
      <div className='turn-display'>{curPlayer}</div>
      <div className='board'>{gameBoard.map((gameBoardRow: coin[], row: number) => (
        <div className='row' key={row}>{gameBoardRow.map((gameBoardPiece: coin, column: number) => (
          <BoardPiece coin={gameBoardPiece} key={row + column} sendClick={() => { pieceClick(column) }} chosenColors={chosenPlayerColors}></BoardPiece>
          ))}
        </div>
        ))}
      </div>
      {displayOverlay && <div className='overlay'></div>}
      {showOpeningScreen && <OpeningScreen sendChosen={(chosenColors) => {handleOpeningScreenButton(chosenColors)}}></OpeningScreen>}
      {showClosingScreen && <ClosingScreen winner={winner}></ClosingScreen>}
      
    </>
  );
}

export default App;