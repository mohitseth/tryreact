import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxWheelComponent } from 'ngx-wheel';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})


export class ReportComponent implements OnInit{
	
	 ngAfterViewInit() {
    

     // Call the spin function whenever and wherever you want after the AfterViewInit Event
    if([null,'null',"",'undefined',undefined].includes(sessionStorage.getItem('uid'))){
		 this.router.navigate(['/home'])
    }
    else
    {
      setTimeout(() =>{
         $('#exampleModal').modal('show');

      },300)
    }

  }
	
	 ngOnInit(): void {
    if([null,'null',"",'undefined',undefined].includes(sessionStorage.getItem('uid'))){
      this.router.navigate(['/home'])
  }
  else{
  }
  }
  public data = [];
  constructor(private http: HttpClient,public router:Router) {
	  
	  
	      var body = {
        user_id: sessionStorage.getItem('uid')
    }
    let formData = new FormData();
    for(var b in body){
      formData.append(b, body[b])

    }
	interface Thingy {
	qdata: any[];
}  
    this.http.post<Thingy>('https://save2rent.com/app2021/api/public/reportview',formData).subscribe(data => {
		
    this.data=data.qdata;
	
	//var qdata=data.qdata;
    console.log(data.qdata);
  
    
    }, error => console.error(error));
  }
}

