import { randomUUID as uuid } from "crypto";

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export type PropsTransaction = {
  id?: string;
  value: number;
  date: number;
  description: string;
  type: TransactionType;
  userId: string;
  categoryId?: string;
  personId?: string;
  createdAt?: number;
  updatedAt?: number;
}

export class Transaction {
  private _id: string;
  private _value: number;
  private _date: number;
  private _description: string;
  private _type: string;
  private _userId: string;
  private _categoryId: string;
  private _personId: string;
  private _createdAt: number;
  private _updatedAt: number;

  private constructor(props: PropsTransaction) {
    this._id = props.id || uuid();
    this._value = props.value;
    this._date = props.date;
    this._description = props.description;
    this._type = props.type;
    this._userId = props.userId;
    this._categoryId = props.categoryId;
    this._createdAt = props.createdAt || Date.now();
    this._updatedAt = props.updatedAt || Date.now();
  }

  static create(props: PropsTransaction): Transaction {
    const transaction = new Transaction(props);
    return transaction
  }

  public update(props: Partial<PropsTransaction>): Transaction {
    Object.assign(this, props);

    this._updatedAt = Date.now();

    return this;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get value(): number {
    return this._value;
  }

  get date(): number {
    return this._date;
  }

  get description(): string {
    return this._description;
  }

  get type(): string {
    return this._type;
  }

  get userId(): string {
    return this._userId;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  get personId(): string {
    return this._personId;
  }

  get createdAt(): number {
    return this._createdAt;
  }

  get updatedAt(): number {
    return this._updatedAt;
  }

  set value(value: number) {
    this._value = value;
  }

  set date(date: number) {
    this._date = date;
  }

  set description(description: string) {
    this._description = description;
  }

  set type(type: string) {
    this._type = type;
  }

  set categoryId(categoryId: string) {
    this._categoryId = categoryId;
  }

  public toJSON(): any {
    return {
      id: this.id,
      userId: this.userId,
      categoryId: this.categoryId,
      value: this.value,
      type: this.type,
      description: this.description,
      date: new Date(this.date),
      personId: this.personId,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt)
    }
  }
}