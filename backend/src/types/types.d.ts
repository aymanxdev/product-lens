import {Request} from "express";

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

export type IUserRequest = Omit<IUser, "password">;
// export interface IUserRequest extends Request {
//   user: IUserPayload;
// }

