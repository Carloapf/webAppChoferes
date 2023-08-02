import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
  })
  export class FilterPipe implements PipeTransform {
    transform(value: any[], searchText: string): any[] {
      if (!value || !searchText) {
        return value;
      }
      searchText = searchText.toLowerCase();
      return value.filter(item => {
        // Implementa la lógica de filtrado según tus necesidades.
        // En este ejemplo, se filtra por la propiedad 'NoEconomico'.
        return item.NoEconomico.toString().toLowerCase().includes(searchText);
      });
    }
  }
  