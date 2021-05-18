import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Chart from 'chart.js';
import { AdminService } from '../adminService/admin.service';

@Component({
  selector: 'app-sales-as-product',
  templateUrl: './sales-as-product.component.html',
  styleUrls: ['./sales-as-product.component.scss']
})
export class SalesAsProductComponent implements OnInit {
  SalesProForm:FormGroup;
  totalAmount:number;
  data: any;
  chart1 = {
    data :{
      labels: [],
      datasets: [{
          label: 'Product Sales',
          data: [],
          backgroundColor: 'transparent',
          borderColor: '#5b6582',
          borderWidth: 2
      },
      {
        label: 'Product ID',
        data: [],
        backgroundColor: 'transparent',
        borderColor: '#36a2eb',
        borderWidth: 2
      }
    ]
    },
    options:{
      scales: {
          yAxes: [{
            ticks: {
                fontColor: 'rgba(0,0,0,.6)',
                fontStyle: 'bold',
                beginAtZero: true,
                maxTicksLimit: 8,
                padding: 10
            }          
        }]       
      },
      responsive: true,
      legend: {          
        display:false
      },
    }
  };
  constructor(private formBuilder:FormBuilder , private service:AdminService) { }

  ngOnInit(): void {
    this.SalesProForm = this.formBuilder.group({
      product_id:['' , Validators.required]
    });
    this.ViewSoldout();
  }
  Initializechart(){
    new Chart('chart-line',  {
      type: 'line',
      options:this.chart1.options,
      data: this.chart1.data
    });
  }
  saletable:any;
  onKey(event){
    if(event.target.value.length >= 4){
    this.service.GetSolds(event.target.value).subscribe(info =>{
    this.saletable = info.sold;
    var sarr = [];
    var larr = [];
      for( const [key , value] of Object.entries(this.saletable)){
        var json = JSON.parse(JSON.stringify(value));
        sarr.push(json.soldout_quantity);
        larr.push(json.product_id);
      }
      this.chart1.data.datasets[0].data.pop();
      this.chart1.data.datasets[1].data.pop();
      this.chart1.data.datasets[1].data = sarr;
      this.chart1.data.labels.pop();
      this.chart1.data.labels = larr;
      this.Initializechart();
    })
    }
    else if(event.target.value.length <=3){
      this.chart1.data.labels.pop();
      this.chart1.data.datasets[1].data.pop();
      this.ViewSoldout();
      this.Initializechart();
    }
  }
  ViewSoldout(){
    this.service.GetSold().subscribe(info => {
      var sarr = [];
      var larr = [];
      console.log(info);
      console.log(info.sold[0].product_id);
      this.data = info.sold;
      this.saletable = info.sold;
      for( const [key , value] of Object.entries(this.saletable)){
        var json = JSON.parse(JSON.stringify(value));
        sarr.push(json.soldout_quantity);
        larr.push(json.product_id);
      
      }
      this.chart1.data.datasets[0].data.pop();
      this.chart1.data.datasets[0].data= sarr;
      this.chart1.data.labels.pop();
      this.chart1.data.labels = larr;
      this.Initializechart();
    })
  }
  onSubmit(){

  }
}
