import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Chart from 'chart.js';
import { AdminService } from '../adminService/admin.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent implements OnInit {
  PaidForm:FormGroup;
  paidtable:any;
  totalAmount:number;
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
    this.PaidForm = this.formBuilder.group({
      date:['' , Validators.required]
    });
    this.Initializechart();
    this.GetAll();
  }
  Initializechart(){
    new Chart('chart-line',  {
      type: 'line',
      options:this.chart1.options,
      data: this.chart1.data
    });
  }
  GetAll(){
    this.service.GetPaidAll().subscribe(info =>{
      if(info.success){
        console.log(info);
        this.paidtable = info.paid;
        var larr = [];
        var sarr = [];
        for(const [key , value] of Object.entries(this.paidtable)){
          var json = JSON.parse(JSON.stringify(value));
          larr.push(json.bill_no);
          sarr.push(json.overall_amount);
        }
        this.chart1.data.labels.pop();
        this.chart1.data.labels = larr;
        this.chart1.data.datasets[1].data.pop();
        this.chart1.data.datasets[1].data = sarr;
        this.Initializechart();
      }
    })
  }
  onKey(event){
    console.log(event.target.value);
    var dates = new Date(event.target.value);
    var date = dates.toLocaleDateString().toString();
    console.log(date);
    this.service.GetPaid({"date":date}).subscribe(info => {
      console.log(info);
      this.paidtable = info.paid;
      var larr = [];
      var sarr = [];
      for(const [key , value] of Object.entries(this.paidtable)){
        var json = JSON.parse(JSON.stringify(value));
        larr.push(json.bill_no);
        sarr.push(json.overall_amount);
      }
      this.chart1.data.labels.pop();
      this.chart1.data.labels = larr;
      this.chart1.data.datasets[1].data.pop();
      this.chart1.data.datasets[1].data = sarr;
      this.Initializechart();
    })
  }
  onSubmit(){

  }
}
