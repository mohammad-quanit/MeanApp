import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchEvent: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchEvent) {
      return items;
    }
    searchEvent = searchEvent.toLocaleLowerCase();

    return items.filter((it) => {
      return it.name.toLocaleLowerCase().includes(searchEvent);
    });
  }
}
