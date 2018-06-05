import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { IUser } from "../interfaces/user.interface";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
    private router: Router,
    private auth: AuthService,
    private errorService: ErrorService
  ){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('token')) {

        let user: IUser = this.auth.user;
        let access = user._access.value;

        if (access != "ROLE_ADMIN" && access != "ROLE_ASSOCIATE" && access != "ROLE_CLIENT") {
          this.errorService.setError('У вас не достаточно прав для доступа к сервису');
          this.router.navigate(['error']);
        }

        return true;
      } else {
        this.router.navigate(['/office/login']);
        return false;
      }
  }
}
