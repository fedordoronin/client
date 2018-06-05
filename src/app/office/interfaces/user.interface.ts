import { IRole } from "./role.interface";
import { IPosition } from "./position.interface";

export interface IUser {
    _id?: string,
    phone?: string,
    name?: string,
    email?: string,
    password?: string,
    position?: IPosition,
    _access?: IRole,
    _delete?: boolean
}