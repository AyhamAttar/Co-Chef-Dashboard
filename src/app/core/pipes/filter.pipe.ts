import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[] , input: any) {
    if (input) {
      const filteredItems = [];
      for (let index = 0; index < items.length; index++) {
        if((items[index].name as string).toLocaleLowerCase().includes((input as string).trim().toLocaleLowerCase()))
          filteredItems.push(items[index])        
      }
      return filteredItems;
    } else {
      return items;
    }
  }
}
