import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summ'
})
export class SummPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) value = 0;

    if (typeof value != 'number') {
      value = parseFloat(value);
    }

    let summ: string = value.toFixed(2);
    let str: string = String(summ);
    let index = str.indexOf('.');
    let num: number = parseInt(summ);
    let fixed = str.slice(index);
    fixed = fixed.replace('.', ',');

    return num.toLocaleString() + fixed;
  }

}
