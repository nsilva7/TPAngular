import { Component, OnInit,  ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart1Component } from '../chart1/chart1.component';
import { Chart2Component } from '../chart2/chart2.component';
import { Chart3Component } from '../chart3/chart3.component';
import { Chart4Component } from '../chart4/chart4.component';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  desde:string = "";
  hasta:string = "";
  @ViewChild(Chart1Component)
  chart1:Chart1Component;
  @ViewChild(Chart2Component)
  chart2:Chart2Component;
  @ViewChild(Chart3Component)
  chart3:Chart3Component;
  @ViewChild(Chart4Component)
  chart4:Chart4Component;
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  filtrar() {
    this.chart1.filtrar(this.desde,this.hasta);
    this.chart2.filtrar(this.desde,this.hasta);
    this.chart3.filtrar(this.desde,this.hasta);
    this.chart4.filtrar(this.desde,this.hasta);
  }

}
