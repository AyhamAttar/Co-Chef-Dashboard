import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
    standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(time: number) {

    let minutes = Math.round(time / (1000 * 60)) ;

    if (minutes < 60)
      return minutes + " min";
    else {
      const hours = Math.round(minutes /60);
      minutes = minutes % 60;
      if (minutes > 0) 
        return hours + " hrs : " + minutes + " min";
      else
        return hours + " hrs"
    }      
  }
}
