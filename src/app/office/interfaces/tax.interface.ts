import { ICompany } from "./company.interface";
import { IUser } from "./user.interface";

export interface ITax {
    _id?: string,
    company?: ICompany | string,
    _month?: number,
    _year?: number,
    _fss?: number,
    _fss_ns?: number,
    _foms?: number,
    _pfr?: number,
    _ndfl?: number,
    _envd?: number,
    _usn?: number,
    _nds?: number,
    _profit_fb?: number,
    _profit_rf?: number,
    comment?: string,
    date_create?: Date,
    _delete?: boolean,
    leader?: {
        user: IUser,
        date_change: Date
    }
    accountant?: {
        user: IUser,
        date_change: Date
    },
    accountant_z?: {
        user: IUser,
        date_change: Date
    }
}