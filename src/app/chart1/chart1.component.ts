import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component  {
  ventas=[];
  chartNombres =  [];
  data:{value:number,name:string};
  chart = [];
  dataset = [];

  constructor(private http: HttpClient) {
    this.http.get('https://tarea-fe.firebaseio.com/api/ventas.json').subscribe(data => {
      for(let key in data){
        this.ventas.push(data[key]);
      }

      this.calcularChart();
      this.chartOption = Object.assign({}, this.chartOption);
      this.chartOption.series[0].data = this.chart;
      this.dataset = [this.chart];
    });
  }

  public filtrar(desde,hasta) {
    this.chart = [];
    this.chartNombres = [];
    this.calcularChart(desde,hasta);
    this.chartOption = Object.assign({}, this.chartOption);
    this.chartOption.legend.data = this.chartNombres;
    this.chartOption.series[0].data = this.chart;

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
      for(let detalle of venta.detalles) {
          flag = true;
          this.data = {
            value:detalle.cantidad,
            name: detalle.producto
          }
          for(let k=0;k < this.chartNombres.length;k++){
            if(this.chartNombres[k] == this.data.name) {
              this.chart[k].value += this.data.value;
              flag = false;
              break;
            }
          }
          if(flag){
            this.chartNombres.push(this.data.name);
            this.chart.push(this.data);

          }

      }
    }
  }

  chartOption = {
    title : {
        text: 'Cantidad vendida por Producto',
        subtext: 'Cantidad vendida de los productos',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: this.chartNombres
    },
    series : [
        {
            name: 'Torta',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };
}
