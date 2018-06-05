import { IUser } from "./user.interface";

export interface ICompany {
    _id?: string,
    user?: string | IUser,
    name?: string,
    email?: string,
    inn?: number,
    kpp?: number,
    _delete?: boolean
}