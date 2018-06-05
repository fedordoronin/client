import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../services/error.service';

@Injectable()
export class CheckErrorGuard implements CanActivate {

  constructor (
    private router: Router,
    private errorService: ErrorService
  ){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.errorService.getError() || this.errorService.getError().length == 0) {
        this.router.navigate(['/']);
        return false;
    }

    return true;
  }
}