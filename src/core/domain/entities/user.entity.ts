import { randomUUID as uuid } from "crypto";

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  createdAt?: number;
  updatedAt?: number;
}

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _createdAt: number;
  private _updatedAt: number;

  private constructor(props: UserProps) {
    this._id = props.id || uuid()
    this._name = props.name;
    this._email = props.email;
    this._createdAt = props.createdAt || Date.now();
    this._updatedAt = props.updatedAt || Date.now();
  }

  static create(props: UserProps): User {
    const isValidEmail = User.validateEmail(props.email);

    if (!isValidEmail) {
      throw new Error('Invalid email');
    }

    const user = new User(props);
    return user;
  }

  public update(props: Partial<UserProps>): User {
    Object.assign(this, props);

    this._updatedAt = Date.now();

    return this;
  }

  static validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  get createdAt(): number {
    return this._createdAt;
  }

  get updatedAt(): number {
    return this._updatedAt;
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}