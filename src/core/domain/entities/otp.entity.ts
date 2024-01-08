
export type OtpProps = {
  userId: string;
  code: string;
  expiresAt: number;
  createdAt?: number;
  updatedAt?: number;
}

export class Otp {
  private _userId: string;
  private _code: string;
  private _expiresAt: number;
  private _createdAt?: number;
  private _updatedAt?: number;

  private constructor(props: OtpProps) {
    this._userId = props.userId;
    this._code = props.code;
    this._expiresAt = props.expiresAt;
    this._createdAt = props.createdAt || Date.now();
    this._updatedAt = props.updatedAt || Date.now();
  }

  get userId(): string {
    return this._userId;
  }

  get code(): string {
    return this._code;
  }

  get expiresAt(): number {
    return this._expiresAt;
  }

  get createdAt(): number | undefined {
    return this._createdAt;
  }

  get updatedAt(): number | undefined {
    return this._updatedAt;
  }

  public static create(props: OtpProps): Otp {
    const otp = new Otp(props);

    return otp;
  }

  toJSON() {
    return {
      userId: this.userId,
      code: this.code,
      expiresAt: this.expiresAt,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}