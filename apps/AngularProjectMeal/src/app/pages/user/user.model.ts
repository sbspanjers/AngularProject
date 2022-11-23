export class User {
  id: number = 0;
  name: string = '';
  emailAdress: string = '';
  isAdult: boolean = false;

  constructor(name = '', emailAdress = '', isAdult = false) {
    this.name = name;
    this.emailAdress = emailAdress;
    this.isAdult = isAdult;
  }
}
