import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {

  constructor (
    private authService: AuthService
  ) {}

  transform(value: any, args?: any): any {

    let position = this.authService.user.position.value;

    return value === position;
  }

}