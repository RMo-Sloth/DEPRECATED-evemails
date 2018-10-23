import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSelf'
})
export class IsSelfPipe implements PipeTransform {

  transform( characterIndex: number, accountIndex: number ): boolean{
    return characterIndex === accountIndex;
  }

}
