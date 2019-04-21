import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    value = value.toLowerCase();
    value = value[0][0].toUpperCase() + value.substr(1);
    return value;
  }

}
