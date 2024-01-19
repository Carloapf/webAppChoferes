import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(data: any[], search: string): any 
    {
        if (!data) 
            return data;
        if (data) 
        {
            const regexp = new RegExp(search, 'i');
            const properties = Object.keys(data[0]);
            return [
                ...data.filter((item) => 
                {
                    return properties.some((property) => regexp.test(item[property]));
                }),
            ];
        }
    }

}
