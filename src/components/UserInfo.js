export class UserInfo {
  constructor(name, profile) {
    this._name = name;
    this._profile = profile;
    this._profileName = document.querySelector(".profile__title");
    this._profileStatus = document.querySelector(".profile__subtitle");
  }

  getUserInfo() {
    this._name.value = this._profileName.textContent;
    this._profile.value = this._profileStatus.textContent;
  }

  setUserInfo() {
    this._profileName.textContent = this._name.value;
    this._profileStatus.textContent = this._profile.value;
  }
}
