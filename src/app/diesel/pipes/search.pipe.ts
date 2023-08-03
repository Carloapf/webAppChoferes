import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      if (typeof item.NoEconomico === 'number') {
        item.NoEconomico = item.NoEconomico.toString(); // Convertir a cadena si es un número
      }

      if (typeof item.NoEconomico === 'string') {
        return item.NoEconomico.toLowerCase().includes(searchTerm);
      } else {
        return false; // Si NoEconomico no es una cadena ni un número, no lo incluimos en los resultados
      }
    });
  }
}
