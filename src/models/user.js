import AuthService from "../services/auth";

export default class User {
  name = "";
  eMail = "";
  imagePath = "";

  constructor(name, eMail, image) {
    this.name = name;
    this.eMail = eMail;
    this.imagePath = image;
  }

  logout() {
    this.name = "";
    this.eMail = "";
    this.imagePath = "";
    AuthService.logout();
  }
}
