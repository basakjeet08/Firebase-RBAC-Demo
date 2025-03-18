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
}
