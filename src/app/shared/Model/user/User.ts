import { Type } from './Type';

export class User {
  constructor(
    readonly name: string,
    readonly id: string,
    readonly email: string,
    readonly type: Type,

    readonly token: string,
    readonly refreshToken: string
  ) {}

  static fromJson(json: any, token: string, refreshToken: string): User {
    return new User(
      json.name,
      json.id,
      json.email,
      json.type,
      token,
      refreshToken
    );
  }
}
