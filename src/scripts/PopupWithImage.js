import { Popup } from "./Popup.js";
import { popupBigImage, popupText } from "./utils.js";

export class PopupWithImage extends Popup {
   constructor (popupSelector, link, name) {
    super(popupSelector);
    this._link = link;
    this._name = name;
}
  
  open() {
   super.open();
   popupBigImage.src = this._link; 
   popupBigImage.alt = this._name; 
   popupText.textContent = this._name;
   }

}
