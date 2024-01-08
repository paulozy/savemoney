import { randomUUID as uuid } from "crypto";

export type PersonProps = {
  id?: string;
  name: string;
  userId: string;
  avatar?: string;
  createdAt?: number;
  updatedAt?: number;
}

export class Person {
  private _id: string;
  private _name: string;
  private _userId: string;
  private _avatar: string;
  private _createdAt: number;
  private _updatedAt: number;

  private constructor(props: PersonProps) {
    this._id = props.id || uuid()
    this._name = props.name;
    this._userId = props.userId;
    this._avatar = props.avatar || null
    this._createdAt = props.createdAt || Date.now();
    this._updatedAt = props.updatedAt || Date.now();
  }

  static create(props: PersonProps): Person {
    const person = new Person(props);
    return person;
  }

  public update(props: Partial<PersonProps>): Person {
    Object.assign(this, props);

    this._updatedAt = Date.now();

    return this;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get userId(): string {
    return this._userId;
  }

  get avatar(): string {
    return this._avatar;
  }

  get createdAt(): number {
    return this._createdAt;
  }

  get updatedAt(): number {
    return this._updatedAt;
  }

  set avatar(avatar: string) {
    this._avatar = avatar;
  }

  set name(name: string) {
    this._name = name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      userId: this.userId,
      avatar: this.avatar,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt)
    }
  }
}