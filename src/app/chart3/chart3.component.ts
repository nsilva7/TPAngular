import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.css']
})
export class Chart3Component implements OnInit {
  ventas = [];
  chartNombres = [];
  series = [];
  meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];
  public chartInstance;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://tarea-fe.firebaseio.com/api/ventas.json').subscribe(data => {
      for(let key in data){
        this.ventas.push(data[key]);
      }
      this.calcularChart();
      this.options = Object.assign({}, this.options);
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
            type:'bar',
            name: detalle.producto,
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            markPoint : {
                data : [
                    {type : 'max', name: 'Maximo'},
                    {type : 'min', name: 'Minimo'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: 'Promedio'}
                ]
            }
          }
          for(let k=0;k < this.chartNombres.length;k++){
            if(this.chartNombres[k] == data.name) {
              this.series[k].data[indice] += detalle.cantidad;
              flag = false;
              break;
            }
          }
          if(flag){
            this.chartNombres.push(data.name);
            data.data[indice] = detalle.cantidad;
            this.series.push(data);
          }

      }
    }
  }

  options = {
    title : {
        text: 'Grafico de Barras Multiples'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:this.chartNombres
    },
    toolbox: {
        show : false,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : this.meses
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
    ]
};


}
