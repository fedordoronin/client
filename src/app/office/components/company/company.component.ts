import { Component, OnInit } from '@angular/core';
import { ICompany } from '../../interfaces/company.interface';
import { CompanyService } from './company.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-company',
  templateUrl: 'company.component.html',
  styles: []
})
export class CompanyComponent implements OnInit {

  pageLoad: boolean = false;
  editMode: boolean = false;

  company: ICompany = {};
  allCompanyList: ICompany[]; //Весь список компаний
  companyList: ICompany[] = []; //Список компаний страницы
  
  i_search: string; //строка поиска
  res_search: ICompany[]; //результат поиска
  
  hasDisabled: boolean; //Существование компаний на удаление
  userRole: string; //Роль пользователя 
  userId: string = null; //Id пользователя
  companyOwner: IUser; //Владелец компании

  constructor(
    private service: CompanyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userRole = this.authService.user._access.value;
    this.route.params.subscribe(
      params => {
        if (Object.keys(params).length != 0) this.userId = params['userId'];
        else this.userId = null;
        
        this.updateList();
    });
  }

  //Обновление данных
  updateList () {

    this.pageLoad = true;

    if (this.userId) {

      this.userService.getUserById(this.userId)
        .subscribe(res => {
          this.companyOwner = res;
        });

      this.service.getAllByUser(this.userId)
        .subscribe(res => {

          if (this.userRole === 'ROLE_CLIENT') {
            res = res.filter( item => {
              return item._delete === false;
            });
          }

          this.companyList = res;
          this.allCompanyList = res;
          this.checkDisabled();
          this.pageLoad = false;
        });
    } else {
      this.service.getAll()
      .subscribe(res => {

        if (this.userRole === 'ROLE_CLIENT') {
          res = res.filter( item => {
            return item._delete === false;
          });
        }

        this.companyList = res;
        this.allCompanyList = res;
        this.checkDisabled();
        this.pageLoad = false;
      });
    }

  }

  //Помечаем (снимаем) на удаление
  markForDelete (e, el: ICompany, del: boolean) {
    e.preventDefault();
    this.pageLoad = true;

    this.service.mfd(el._id, { _delete: del })
      .subscribe(res => {
        this.updateList();
      });
  }

  //Поиск
  search () {
    if (this.i_search) {
      let res = this.allCompanyList.filter(val => {
        this.i_search.toLowerCase();
        let name = val.name.toLowerCase();

        return name.indexOf(this.i_search) + 1 || String(val.inn).indexOf(this.i_search) + 1;
      });

      this.companyList = res.slice(0, 10);
    } else {
      this.updateList();
    }
  }

  //Проверка есть ли помеченные на удаление компании
  checkDisabled () {
    let disabled = this.companyList.filter(el => {
      return el._delete;
    });

    this.hasDisabled = disabled.length > 0;
  }

  //Удаление компании
  delete () {
    this.pageLoad = true;
    let items: ICompany[] = this.companyList.filter(item => {
      return item._delete === true;
    });

    this.service.delete(items)
      .subscribe(res => {
        this.updateList();
      });
  }

  pageChange (list) {
    this.companyList = list;
  }

}
