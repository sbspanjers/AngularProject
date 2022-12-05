export class User {
  id = '';
  name = '';
  emailAddress = '';

  constructor(id = '', name = '', emailAddress = '') {
    this.id = id;
    this.name = name;
    this.emailAddress = emailAddress;
  }
}
