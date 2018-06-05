import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../services/config.service';
import { ICompany } from '../../interfaces/company.interface';

@Injectable()
export class CompanyService {

  private API_URL: string;

  constructor(
    private http: HttpClient,
    private conf: ConfigService
  ) {
    this.API_URL = this.conf.getKey('apiUrl');
  }

  create (data: ICompany): Observable<ICompany> {
    return this.http.put(this.API_URL + '/company', data)
      .map(result => result as ICompany);
  }

  update (id: string, data: ICompany): Observable<ICompany> {
    return this.http.post(this.API_URL + '/company/' + id, data)
      .map(result => result as ICompany);
  }

  getAll (): Observable<ICompany[]> {
    return this.http.get(this.API_URL + '/company')
      .map(result => result as ICompany[]);
  }

  getAllByUser (userId: string): Observable<ICompany[]> {
    return this.http.get(this.API_URL + '/company/user/' + userId)
      .map(result => result as ICompany[]);
  }

  getById (_id: string): Observable<ICompany> {
    return this.http.get(this.API_URL + '/company/' + _id)
      .map(res => res as ICompany);
  }

  search (searh): Observable<ICompany> {
    return this.http.get(this.API_URL + '/company/search/inn/' + searh);
  }

  delete (items: ICompany[]): Observable<any> {
    return this.http.post(this.API_URL + '/company/delete', items);
  }

  mfd (id:string, del: ICompany): Observable<any> {
    return this.http.post(this.API_URL + '/company/mfd/' + id, del);
  }

}
