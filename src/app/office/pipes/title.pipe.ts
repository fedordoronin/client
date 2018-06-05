import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'title'
})
export class TitlePipe implements PipeTransform {

	transform(value: string, args?: any): any {

		let end = 30;

		if (value && value.length > end) {
			value = value.slice(0, end) + '...';
		}

		return value;
	}

}