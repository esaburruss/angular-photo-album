export class Company {
  bs: string;
  catchPhrase: string;
  name: string;

  constructor(obj?: any) {
    this.bs            = obj && obj.bs               || null;
    this.catchPhrase   = obj && obj.catchPhrase      || null;
    this.name          = obj && obj.name             || null;
  }
}
