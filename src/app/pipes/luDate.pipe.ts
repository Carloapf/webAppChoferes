import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'luDate'
})
export class LuDatePipe implements PipeTransform {
    public meridian: string | undefined;
    public hr: number | any;
    public mes: string | undefined;
    public dia: number | undefined;
    public anio: number | undefined;
  transform(date: any, get: string): any {
    date = (date instanceof Date) ? this.convertDate(date, 'full') : date;
    if (!(/^[0-9]{4}-(0[0-9]||1[0-2])-([0-2][0-9]||3[0-1]) ([0-2][0-9]):[0-5][0-9]:[0-5][0-9]$/).exec(date)) {
      return date;
    } else {
      if (get) {
        switch (get) {
          case 'Day':
            return parseInt(date.substr(8, 2));
          case 'Month':
            return parseInt(date.substr(5, 2));
          case 'MonthName':
            switch (parseInt(date.substr(5, 2))) {
              case 1:
                return "Enero";
              case 2:
                return "Febrero";
              case 3:
                return "Marzo";
              case 4:
                return "Abril";
              case 5:
                return "Mayo";
              case 6:
                return "Junio";
              case 7:
                return "Julio";
              case 8:
                return "Agosto";
              case 9:
                return "Septiembre";
              case 10:
                return "Octubre";
              case 11:
                return "Noviembre";
              case 12:
                return "Diciembre";
              default:
                return "-";
                break;
            }
            break;
            case 'MonthYear':
                switch (parseInt(date.substr(5, 2))) {
                    case 1:
                        return "Enero " + parseInt(date.substr(0, 4));
                        break;
                    case 2:
                        return "Febrero " + parseInt(date.substr(0, 4));
                        break;
                    case 3:
                        return "Marzo " + parseInt(date.substr(0, 4));
                        break;
                    case 4:
                        return "Abril " + parseInt(date.substr(0, 4));
                        break;
                    case 5:
                        return "Mayo " + parseInt(date.substr(0, 4));
                        break;
                    case 6:
                        return "Junio " + parseInt(date.substr(0, 4));
                        break;
                    case 7:
                        return "Julio " + parseInt(date.substr(0, 4));
                        break;
                    case 8:
                        return "Agosto " + parseInt(date.substr(0, 4));
                        break;
                    case 9:
                        return "Septiembre " + parseInt(date.substr(0, 4));
                        break;
                    case 10:
                        return "Octubre " + parseInt(date.substr(0, 4));
                        break;
                    case 11:
                        return "Noviembre " + parseInt(date.substr(0, 4));
                        break;
                    case 12:
                        return "Diciembre " + parseInt(date.substr(0, 4));
                        break;
                    default:
                        return "-";
                }
                break;
            case 'Year':
                return parseInt(date.substr(0, 4));
                break;
            case 'Hours':
                return parseInt(date.substr(11, 2));
                break;
            case 'Minutes':
                return parseInt(date.substr(14, 2));
                break;
            case 'Seconds':
                return parseInt(date.substr(17, 2));
                break;
            case 'Meridian':
                this.meridian = "AM";
                if (parseInt(date.substr(11, 2)) > 12) {
                    this.meridian = "PM";
                }
                return this.meridian;
                break;
            case 'hora':
                this.meridian = "AM";
                this.hr = parseInt(date.substr(11, 2));
                if (this.hr >= 12) {
                    if(this.hr != 12)
                        this.hr = this.hr - 12;
                    this.meridian = "PM";
                }
                return (this.hr < 10 ? "0" + this.hr : this.hr) + ":" + date.substr(14, 2) + " " + this.meridian;
                break;
            case 'large': //DIA de MES del AÑO
                switch (parseInt(date.substr(5, 2))) {
                    case 1:
                        this.mes = "Enero";
                        break;
                    case 2:
                        this.mes = "Febrero";
                        break;
                    case 3:
                        this.mes = "Marzo";
                        break;
                    case 4:
                        this.mes = "Abril";
                        break;
                    case 5:
                        this.mes = "Mayo";
                        break;
                    case 6:
                        this.mes = "Junio";
                        break;
                    case 7:
                        this.mes = "Julio";
                        break;
                    case 8:
                        this.mes = "Agosto";
                        break;
                    case 9:
                        this.mes = "Septiembre";
                        break;
                    case 10:
                        this.mes = "Octubre";
                        break;
                    case 11:
                        this.mes = "Noviembre";
                        break;
                    case 12:
                        this.mes = "Diciembre";
                        break;
                    default:
                        this.mes = "-";
                }
                this.dia = parseInt(date.substr(8, 2));
                this.anio = parseInt(date.substr(0, 4));
                return this.dia + " de " + this.mes + " del " + this.anio;
                break;
            case 'small': //DIA de MES del AÑO
                switch (parseInt(date.substr(5, 2))) {
                    case 1:
                        this.mes = "Ene";
                        break;
                    case 2:
                        this.mes = "Feb";
                        break;
                    case 3:
                        this.mes = "Mar";
                        break;
                    case 4:
                        this.mes = "Abr";
                        break;
                    case 5:
                        this.mes = "May";
                        break;
                    case 6:
                        this.mes = "Jun";
                        break;
                    case 7:
                        this.mes = "Jul";
                        break;
                    case 8:
                        this.mes = "Ago";
                        break;
                    case 9:
                        this.mes = "Sep";
                        break;
                    case 10:
                        this.mes = "Oct";
                        break;
                    case 11:
                        this.mes = "Nov";
                        break;
                    case 12:
                        this.mes = "Dic";
                        break;
                    default:
                        this.mes = "-";
                        break;
                }
                this.dia = parseInt(date.substr(8, 2));
                this.anio = parseInt(date.substr(0, 4));
                return this.dia + " - " + this.mes + " - " + this.anio;
            break;
            case 'mini': //DIA de MES
                switch (parseInt(date.substr(5, 2))) {
                    case 1:
                        this.mes = "Ene";
                        break;
                    case 2:
                        this.mes = "Feb";
                        break;
                    case 3:
                        this.mes = "Mar";
                        break;
                    case 4:
                        this.mes = "Abr";
                        break;
                    case 5:
                        this.mes = "May";
                        break;
                    case 6:
                        this.mes = "Jun";
                        break;
                    case 7:
                        this.mes = "Jul";
                        break;
                    case 8:
                        this.mes = "Ago";
                        break;
                    case 9:
                        this.mes = "Sep";
                        break;
                    case 10:
                        this.mes = "Oct";
                        break;
                    case 11:
                        this.mes = "Nov";
                        break;
                    case 12:
                        this.mes = "Dic";
                        break;
                    default:
                        this.mes = "-";
                }
                this.dia = parseInt(date.substr(8, 2));
                return this.dia + "-" + this.mes;
            break;
            case 'Day Num':
                sj = new Date(date.substr(0, 4), date.substr(5, 2) - 1, date.substr(8, 2));
                day = "";
                switch (sj.getDay()) {
                    case 0:
                        day = "Domingo";
                        break;
                    case 1:
                        day = "Lunes";
                        break;
                    case 2:
                        day = "Martes";
                        break;
                    case 3:
                        day = "Miercoles";
                        break;
                    case 4:
                        day = "Jueves";
                        break;
                    case 5:
                        day = "Viernes";
                        break;
                    case 6:
                        day = "Sabado";
                        break;
                }
                return day + " - " + sj.getDate();
                break;
            case 'Dia':
                var sj = new Date(date.substr(0, 4), date.substr(5, 2) - 1, date.substr(8, 2));
                var day = "";
                switch (sj.getDay()) {
                    case 0:
                        day = "D";
                        break;
                    case 1:
                        day = "L";
                        break;
                    case 2:
                        day = "M";
                        break;
                    case 3:
                        day = "M";
                        break;
                    case 4:
                        day = "J";
                        break;
                    case 5:
                        day = "V";
                        break;
                    case 6:
                        day = "S";
                        break;
                }
                return day;
                break;

            case 'full': //DIA de MES del AÑO
                switch (parseInt(date.substr(5, 2))) {
                    case 1:
                        this.mes = "Enero";
                        break;
                    case 2:
                        this.mes = "Febrero";
                        break;
                    case 3:
                        this.mes = "Marzo";
                        break;
                    case 4:
                        this.mes = "Abril";
                        break;
                    case 5:
                        this.mes = "Mayo";
                        break;
                    case 6:
                        this.mes = "Junio";
                        break;
                    case 7:
                        this.mes = "Julio";
                        break;
                    case 8:
                        this.mes = "Agosto";
                        break;
                    case 9:
                        this.mes = "Septiembre";
                        break;
                    case 10:
                        this.mes = "Octubre";
                        break;
                    case 11:
                        this.mes = "Noviembre";
                        break;
                    case 12:
                        this.mes = "Diciembre";
                        break;
                    default:
                        this.mes = "-";
                        break;
                }
                break;
                console.log("");
                
                this.dia = parseInt(date.substr(8, 2));
                this.anio = parseInt(date.substr(0, 4));

                this.meridian = "AM";
                this.hr = parseInt(date.substr(11, 2));
                if (this.hr > 12) {
                    this.hr = this.hr - 12;
                    this.meridian = "PM";
                }



          default:
            return date;
        }
      } else {
        return date;
      }
    }
  }

  private convertDate(date: Date, format: string): string {
    // Implementa la lógica para convertir un objeto Date a un string con el formato deseado (format)
    // Puedes utilizar librerías como 'date-fns', 'moment.js' o implementar tu propia lógica aquí.
    // Por ejemplo:
    // return formatDate(date, format); // Suponiendo que tienes una función llamada formatDate para el formateo de fechas.
    return ""; // Reemplaza esto con la lógica real de formateo.
  }
}
