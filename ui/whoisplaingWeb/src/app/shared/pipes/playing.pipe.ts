import { Pipe, PipeTransform } from '@angular/core';
import { Playing } from '../models/responses';

@Pipe({
  name: 'playing'
})
export class PlayingPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    switch(value) {
      case 'yes': return 'Juega';
      case 'no': return 'No juega';
      default: return 'Pendiente'
    }   
  }

}
