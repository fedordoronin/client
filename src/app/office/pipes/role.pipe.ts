import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  constructor (
    private authService: AuthService
  ) {}

  transform(value: any, user?: any): any {

    let access = false;

    if (!user) user = this.authService.user;
    
    const role = user._access? user._access.value : null;

    return role === value;
  }

}