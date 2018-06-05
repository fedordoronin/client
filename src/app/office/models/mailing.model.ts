import { ICompany } from "../interfaces/company.interface";
import { ConfigService } from "../services/config.service";

export class MailingModel {

    title: string = '';
    description: string = '';
    sent_to: ICompany[] = [];
    options = {
        from : '',
        subject : '',
        html : '',
        attachments: []
    };
}