import React, { FC } from "react";
import './piece.component.scss';
import { ReactComponent as Coin } from '../../assets/coin.svg';
import {Players} from '../../features/opening-screen/opening-screen.component';
export type PieceProps = {
    coin: 0 | 1 | 2;
    sendClick: () => void;
    chosenColors: Players;
  };
  const BoardPiece: FC<PieceProps> = ({coin, sendClick, chosenColors}) => {
    return (
     <div className="container" onClick={() => {sendClick()}}>
        {coin === 0 ? <div className="circle"></div> : <Coin className={`game-coin ${coin === 1 ? chosenColors.player1 : chosenColors.player2}`} /> }
     </div>
    );
  };
  
  export default BoardPiece;