import { ICompany } from "../interfaces/company.interface";

export class Company implements ICompany {
    user = null;
    name = null;
    email = null;
    inn = null;
    kpp = null;
    _delete = false;
}