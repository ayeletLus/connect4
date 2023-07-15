import React, { FC, useState } from "react";
import './color-picker.component.scss';
import { ReactComponent as Coin } from '../../assets/coin.svg';
export type ColorPickerProps = {
    sendChosen: (color: string) => void;
    className: string;
};
  const ColorPicker: FC<ColorPickerProps> = (props) => {
   const colors: string[] = ["light-blue","green","turquoise","blue","purple","pink","red","orange","yellow"];
   const [chosen, setChosen] = useState<string>('');

   function handleClick(color: string): void {
      props.sendChosen(color);
      setChosen(color);
   }
    return (
 <div className={`color-container ${props.className}`}>
 {colors.map((color: string) => (
    <Coin className={`${color} ${chosen === color ? 'selected' : '' } coins`} key={color} onClick={() => {handleClick(color)}}/>
 ))}
 </div>
    
 ) };
  
  export default ColorPicker;