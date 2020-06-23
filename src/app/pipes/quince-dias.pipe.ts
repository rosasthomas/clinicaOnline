import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quinceDias'
})
export class QuinceDiasPipe implements PipeTransform {

  aux = [];

  transform(value: any, ...args: unknown[]): unknown {
    let now = this.getDateNow();

    for(let item of value)
    {
      if(item.fecha < now)
      {
        this.aux.push(item);
      }
    }
    this.ordenarLista()
    return this.aux;
  }

  ordenarLista()
  {
    this.aux.sort((a,b) => {
      if(a.fecha> b.fecha)
        return 1
      else
        return -1;
    })
  }

  getDateNow()
  {
    let fecha = new Date()
    let d :string,m :string,y:string;

    d = (fecha.getDate()).toString();
    m = (fecha.getMonth()+1).toString();
    y = fecha.getFullYear().toString();

    if((parseInt(d) + 15) > 31)
      m = (parseInt(m) + 1).toString();
      if(parseInt(m) == 12)
        m = '1';

    d = (parseInt(d) + 15) <= 31 ? d : ((parseInt(d)+15) - 31).toString();

    d = d.length == 1 ? '0'+d : d;
    m = m.length == 1 ? '0'+m : m;

    return `${y}-${m}-${d}`
  }

}
