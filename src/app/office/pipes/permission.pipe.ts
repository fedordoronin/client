import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'permission'
})
export class PermissionPipe implements PipeTransform {

  constructor (
    private authService: AuthService
  ) {}

  transform(value: any, args?: any): any {

    let permission = true;

    const  user = this.authService.user;
    const position = user.position ? user.position.value : null;

    if (position == value || user._access.value == 'ROLE_ADMIN') {
      permission = false;
    }

    return permission;
  }

}
