export class User {
  id = 0;
  name = '';
  emailAdress = '';
  isAdult = false;

  constructor(name = '', emailAdress = '', isAdult = false) {
    this.name = name;
    this.emailAdress = emailAdress;
    this.isAdult = isAdult;
  }
}
