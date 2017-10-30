import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component {
  ventas = [];
  chartNombres = [];
  series = [];
  meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];
  public chartInstance;
  constructor(private http: HttpClient) {
    this.chartInstance = null;
    this.http.get('https://tarea-fe.firebaseio.com/api/ventas.json').subscribe(data => {
      for(let key in data){
        this.ventas.push(data[key]);
      }
      this.calcularChart();
      this.options = Object.assign({}, this.options);
      this.options.series = [];
      this.options.series = this.series;
    });
  }

  onChartInit(ec) {
    this.chartInstance = ec
  }

  public filtrar(desde,hasta) {
    this.series = [];
    this.chartNombres = [];
    this.calcularChart(desde,hasta);
    let opciones = this.options;
    opciones.series = this.series;
    if(this.chartInstance!= null){
      this.chartInstance.setOption(opciones,true,false);
    }


  }

  private calcularChart(desde = "", hasta = "") {
    let flag = true;
    let fechaDesde = null;
    let fechaHasta = null;
    if(desde != "") {
      let aux = desde.split("-");
      fechaDesde = new Date(aux[1]+ "-" + aux[2] + "-" + aux[0]);
    }
    if(hasta != "") {
      let aux = hasta.split("-");
      fechaHasta = new Date(aux[1]+ "-" + aux[2] + "-" + aux[0]);
    }
    for(let venta of this.ventas) {
      let aux = venta.cabecera.fecha.split("/");
      let fecha = new Date(aux[1]+ "/" + aux[0] + "/" + aux[2]);
      if(desde != "" && hasta != "") {
        if(fecha < fechaDesde || fecha > fechaHasta) {
          continue;
        }
      }else if (desde != "" && hasta == "") {
        if(fecha < fechaDesde) {
          continue;
        }
      }else if (desde == "" && hasta != "") {
        if(fecha > fechaHasta) {
          continue;
        }
      }
      let indice = venta.cabecera.fecha.split("/")[1] - 1;
      for(let detalle of venta.detalles) {
          flag = true;
          let data = {
            type:'line',
            name: detalle.producto,
            data: [0,0,0,0,0,0,0,0,0,0,0,0]
          }
          for(let k=0;k < this.chartNombres.length;k++){
            if(this.chartNombres[k] == data.name) {
              let acumulado = 0;
              for(let q=0;q < data.data.length;q++){
                  if(q < indice) {
                    acumulado += this.series[k].data[q];
                  }else if (q == indice) {
                     acumulado += detalle.cantidad;
                     this.series[k].data[q]= acumulado;
                  }else {
                    this.series[k].data[q] = acumulado;
                  }
              }
              flag = false;
              break;
            }
          }
          if(flag){
            this.chartNombres.push(data.name);
            for(let q=indice;q < data.data.length;q++){
                data.data[q] = detalle.cantidad;
            }
            this.series.push(data);

          }


      }
  }
}
  options = {
      title: {
          text: 'Ventas acumuladas por meses',
          left: 'center'
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: this.chartNombres
      },
      xAxis: {
          type: 'category',
          name: 'x',
          splitLine: {show: false},
          data: this.meses
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      yAxis: {
          type: 'log',
          name: 'y'
      },
      series: [
        {
             name: '3的指数',
             type: 'line',
             data: []
         }
      ]
  };
}
