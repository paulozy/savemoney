import { randomUUID as uuid } from "crypto";

export type CategoryProps = {
  id?: string;
  name: string;
  description: string;
  userId?: string;
  createdAt?: number;
  updatedAt?: number;
}

export class Category {
  private _id: string;
  private _name: string;
  private _description: string;
  private _userId: string | undefined;
  private _createdAt: number;
  private _updatedAt: number;

  private constructor(props: CategoryProps) {
    this._id = props.id || uuid();
    this._name = props.name;
    this._description = props.description;
    this._userId = props.userId;
    this._createdAt = props.createdAt || Date.now();
    this._updatedAt = props.updatedAt || Date.now();
  }

  static create(props: CategoryProps): Category {
    const category = new Category(props);
    return category
  }

  public update(props: Partial<CategoryProps>): Category {
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

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get userId(): string {
    return this._userId;
  }

  get createdAt(): number {
    return this._createdAt;
  }

  get updatedAt(): number {
    return this._updatedAt;
  }

  set name(name: string) {
    this._name = name;
  }

  set description(description: string) {
    this._description = description;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      userId: this.userId,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt)
    }
  }
}