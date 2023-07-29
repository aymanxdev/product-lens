import {Request} from "express";

type IUserPayload = Omit<IUser, "password">;
export interface IUserRequest extends Request {
  user: IUserPayload;
}
