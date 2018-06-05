import { IEmailVariables } from "./email_variables.interface";

export interface IEmail {
    email?: string,
    status?: number,
    status_explain?: string,
    variables?: {
        company_name?: string,
        company_id?: string
    }
}