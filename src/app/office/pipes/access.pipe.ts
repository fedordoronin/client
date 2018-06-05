import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'access'
})
export class AccessPipe implements PipeTransform {

  constructor (
    private authService: AuthService
  ) {}

  transform(value: any, args?: any): any {

    let access = false;

    const user = this.authService.user;
    const role = user._access.value;

    if (value === 'full') access = true;
    if (value === 'associate') {
        if (role === 'ROLE_ADMIN' || role === 'ROLE_ASSOCIATE') access = true;
    }
    if (value === 'client') {
      if (role === 'ROLE_ADMIN' || role === 'ROLE_ASSOCIATE' || role === 'ROLE_CLIENT')
        access = true;
    }
    if (value === 'admin') {
      if (role === 'ROLE_ADMIN') access = true;
    }

    return access;
  }

}
