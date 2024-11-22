export class User {
  email: string;
  password: string;
  public roles: string[] = [];

  constructor(email: string, password: string, roles: string[] = []) {
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
