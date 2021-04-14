import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private httpClient: HttpClient,public router:Router,public spinner: NgxSpinnerService) { }
  public data;
  public fileUrl;
  ngOnInit(): void {
    if([null,'null',"",'undefined',undefined].includes(localStorage.getItem('userId'))){
      this.router.navigate(['/home'])
  }
  else{
    this.data = JSON.parse(localStorage.getItem('result'))
    this.data.score = parseInt(this.data.score.toString());
    localStorage.clear();
  }
    
  }

    downloadImage() {
     this.spinner.show();
       const imgUrl = this.data.certificate_url;
       const imgName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);
       this.httpClient.get(imgUrl, {responseType: 'blob' as 'json'})
         .subscribe((res: any) => {
           const file = new Blob([res], {type: res.type});

           // IE
           if (window.navigator && window.navigator.msSaveOrOpenBlob) {
             window.navigator.msSaveOrOpenBlob(file);
             return;
           }

           const blob = window.URL.createObjectURL(file);
           const link = document.createElement('a');
           link.href = blob;
           link.download = 'Certificate.jpg';

           // Version link.click() to work at firefox
           link.dispatchEvent(new MouseEvent('click', {
             bubbles: true,
             cancelable: true,
             view: window
           }));

           setTimeout(() => { // firefox
             this.spinner.hide();

             window.URL.revokeObjectURL(blob);
             link.remove();
           }, 100);
         });
     }
  attempt =function(){
    localStorage.clear();
    this.router.navigate(['/home'])

  }

}
