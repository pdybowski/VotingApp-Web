import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean): 'yes' | 'no' {
    return !!value ? 'yes' : 'no';
  }
}
