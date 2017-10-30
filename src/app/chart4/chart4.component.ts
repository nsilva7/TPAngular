import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chart4',
  templateUrl: './chart4.component.html',
  styleUrls: ['./chart4.component.css']
})
export class Chart4Component implements OnInit {

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
              name: detalle.producto,
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [0,0,0,0,0,0,0,0,0,0,0,0]
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
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: this.chartNombres
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: this.meses
    },
    series: [

    ]
};
}
