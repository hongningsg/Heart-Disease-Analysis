import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
import * as CanvasJS from '../../assets/canvasjs.min';
import { all } from 'q';
@Component({
  selector: 'app-showgraph',
  templateUrl: './showgraph.component.html',
  styleUrls: ['./showgraph.component.css']
})
export class ShowgraphComponent implements OnInit {
  d: object;
  totaldatanumber: number;

  constructor(
    private getdataservice:GetdataService,

  ) { }

  getRandomColor(n:number) {
    var palette = ['#003366', '#cc0000', '#9966ff', '#009900', '#cc99ff', '#00ccff', '#663300', '#993333', '#ffccff', '#6699ff', '#003300', '#666699','#ff9900'];
    return palette[n];
}

  ngOnInit() {
    let dataPoints = [];
    this.getdataservice.getdata(3).subscribe(
      data => {
        //console.log(data.Info);
        //console.log(data);
        this.totaldatanumber = data.Info.data_length;
        let max = 0
        for (let d of data.data) {
          if (d.age > max) {
            max = d.age
          }
        }
        
        let group = Math.ceil(max / 10);
        
        for (let i = 0; i < group; i++) {
          dataPoints.push({
            type: "bar",
		        showInLegend: true,
		        name: `${i*10} to ${(i+1)*10} years old`,
            color: this.getRandomColor(i),
		        dataPoints: [
                  { y: 0, label: "typical angin" },
                  { y: 0, label: "atypical angina" },
                  { y: 0, label: "non-anginal pain" },
                  { y: 0, label: "asymptomatic" }]
          });
        }
        //console.log(dataPoints[5]);


        for (let d of data.data) {
          //console.log(dataPoints[Math.floor(d.age / 10)].dataPoints[(Math.floor(d.value - 1))]);
          dataPoints[Math.floor(d.age / 10)].dataPoints[(Math.floor(d.value - 1))].y++;
        }
        console.log(dataPoints);
        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          title: {
            text: "Pain Type vs. Age"
          },
          axisY: {
            title: "Population"
          },
          data: dataPoints
        });

        chart.render();
      });
    



  }
}