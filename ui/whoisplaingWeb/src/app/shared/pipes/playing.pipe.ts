import { Pipe, PipeTransform } from '@angular/core';
import { Playing } from '../models/responses';

@Pipe({
  name: 'playing'
})
export class PlayingPipe implements PipeTransform {

  transform(value: Playing, args?: any): string {
    switch(value) {
      case Playing.yes: return 'Juega';
      case Playing.no: return 'No juega';
      default: return 'Pendiente'
    }   
  }

}
