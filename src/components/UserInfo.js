import { profileName, profileStatus } from "./utils.js";

export class UserInfo {
  constructor(name, profile) {
    this._name = name;
    this._profile = profile;
  }

  getUserInfo() {
    this._name.value = profileName.textContent;
    this._profile.value = profileStatus.textContent;
  }

  setUserInfo() {
    profileName.textContent = this._name.value;
    profileStatus.textContent = this._profile.value;
  }
}