import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';

@Injectable()
export class AccessAssociateGuard implements CanActivate {

  constructor (
    private router: Router,
    private auth: AuthService,
    private errorService: ErrorService
  ){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    let user = this.auth.user;

    if (user._access.value != "ROLE_ADMIN" && user._access.value != "ROLE_ASSOCIATE") {
        this.errorService.setError('У вас не достаточно прав для доступа к данному разделу');
        this.router.navigate(['error']);
    }

    return true;
  }
}