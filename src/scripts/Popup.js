export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
}

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
 }

  close = () => {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

_handleEscClose = (evt) => {
    if (evt.keyCode === "Escape") {
      this.close();
    };
  }

_handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("popup_opened") || 
    evt.target.classList.contains(".popup__close"))
    {
      this.close();
    };
  }

  setEventListeners(evt) {
    this._popupSelector.querySelector('.popup__close').addEventListener("click", (evt) => 
      this.close(evt));
  
     this._handleOverlayClose(evt);
  }
}