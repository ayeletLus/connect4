import { FC} from "react";
import './closing-screen.component.scss';
export type ClosingScreenProps = {
    winner: string;
   };
const ClosingScreen: FC<ClosingScreenProps> = ({winner}) => {

    function refreshPage() {
        window.location.reload();
      }
 
    return (
        <div className="closing-screen">
            <div className="winner">
                {winner}
            </div>
            <div className="button" onClick={() => refreshPage()}>
                <p>{"Play Again"}</p>
            </div>
        </div>
    )
};

export default ClosingScreen;