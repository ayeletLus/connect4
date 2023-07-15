import { FC, useState } from "react";
import './opening-screen.component.scss';
import ColorPicker from '../../components/color-picker/color-picker.component';
export interface Players {player1: string, player2: string};
export type OpeningScreenProps = {
    sendChosen: (chosenColors: Players) => void;
};
const OpeningScreen: FC<OpeningScreenProps> = ({sendChosen}) => {
    const [chosenColors, setChosenColors] = useState<Players>({player1: '', player2: ''});
    const [isError, setIsError] = useState<boolean>(false);
    enum PageText {
        title = 'Connect 4',
        subTitle = 'How To play',
        gameRules = `this is a two player game where players choose a color and then
        start to place their coins from the bottom up, one each turn. the winner is the one who has four consecutive coins of his color,
        either vertically, horizonatally or diagonally. `, 
        buttonLabel = "Let's Play", 
        player1 = 'player 1', 
        player2 = 'player 2',
        error = "*you can't both choose the same color dummies!"
    };
    function saveChosenColor(color: string, player: string): void {
        chosenColors[player as keyof Players] = color;
        setChosenColors(chosenColors);
        if(chosenColors.player1 === chosenColors.player2 && chosenColors.player1 !== "") {
            setIsError(true); 
        } else {
            setIsError(false);
        };
    }

    function enterGame(): void {
       if(!isError) {
            sendChosen(chosenColors)
       }
    }

    return (
        <div className="opening-screen">
            <div className="title">{PageText.title}</div>
            <div className="rules-container">
                <div className="subTitle">{PageText.subTitle}</div>
                <div className="game-rules">{PageText.gameRules}</div>
            </div>
            <span className="player1">{PageText.player1}</span>
            <ColorPicker sendChosen={(color: string) =>  saveChosenColor(color, 'player1')} className="color-picker-1" ></ColorPicker>
            <span className="player2">{PageText.player2}</span>
            <ColorPicker  sendChosen={(color: string) =>  saveChosenColor(color, 'player2')}  className="color-picker-2"></ColorPicker>
            <div className="button" onClick={() => {enterGame()}}> 
                <p>{PageText.buttonLabel}</p>
            </div>
            {isError && <div className="error">{PageText.error}</div>}
        </div>

    )
};

export default OpeningScreen;