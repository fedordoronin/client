import { IUser } from "./user.interface";
import { ICompany } from "./company.interface";

export interface IMailing {
    _id?: string,
    title?: string,
    description?: string,
    date_create?: Date,
    create_who?: IUser,
    date_sent?: Date,
    sent?: boolean,
    sent_who?: IUser,
    sent_to?: ICompany[],
    sent_response?: Object,
    options?: {
        from?: string,
        to?: string,
        subject?: string,
        html?: string,
        attachments?: string[]
    },
    delete?: boolean
}