import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxWheelComponent } from 'ngx-wheel';
import * as bootstrap from 'bootstrap';





@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel;
 
  ngAfterViewInit() {
     console.log('only after THIS EVENT "wheel" is usable!!');

     // Call the spin function whenever and wherever you want after the AfterViewInit Event
    if([null,'null',"",'undefined',undefined].includes(sessionStorage.getItem('userId'))){
    }
    else
    {
      setTimeout(() =>{
         $('#exampleModal').modal('show');

      },300)
    }

  }

  reset(){
     // Reset allows you to redraw the wheel
     // Use it after any change to wheel configurations or to allow re-spinning
     this.wheel.reset();
  }

  constructor(private httpClient: HttpClient,public router:Router,public spinner: NgxSpinnerService) { }
  public data;
  public fileUrl;
  ngOnInit(): void {
    if([null,'null',"",'undefined',undefined].includes(sessionStorage.getItem('userId'))){
      this.router.navigate(['/home'])
  }
  else{

    this.data = JSON.parse(sessionStorage.getItem('result'))
    this.data.score = parseInt(this.data.score.toString());
  }

  }

    public items = [
      {'fillStyle' : '#6F40F7',               "textFillStyle":'#FFF' ,'textFontSize' : 15, 'text' : 'Subject 1' ,id:0},
      {'fillStyle' : '#FF9F2E',        "textFillStyle":'#FFF' ,'textFontSize' : 15, 'text' : 'Subject 2' ,id:1},
      {'fillStyle' : '#FF2E2E',   "textFillStyle":'#FFF' ,'textFontSize' : 15,'text' : 'Subject 3',id:2},
      {'fillStyle' : '#FF9F2E',        "textFillStyle":'#FFF' ,'textFontSize' : 15,'text' : 'Subject 4',id:3},
      {'fillStyle' : '#6F40F7',  "textFillStyle":'#FFF' ,'textFontSize' : 15,'text' : 'Subject 5',id:4},
      {'fillStyle' : '#FF2E2E',                     "textFillStyle":'#FFF' ,'textFontSize' : 15,'text' : 'Subject 6',id:5}
    ]
    public spinQuestion;
    public option = ''
    public popHeading = "Spin the wheel"

    public idToLandOn;
    public wheelShow:boolean = true;
    before (){

    }
    after(e){
      this.wheelShow = false;
      this.popHeading = "Choose the correct option";

    }
    start = function(){
      this.idToLandOn   = Math.floor(Math.random() * (6 + 1))
      console.log(this.idToLandOn)
      this.wheel.spin();

    }
    getSpinQuestion = function(id){
      var body = {
        user_id: sessionStorage.getItem('userId'),
        subject : this.items[id].text
    }
    let formData = new FormData();
    for(var b in body){
      formData.append(b, body[b])

    }
      fetch('https://save2rent.com/app2021/api/public/spin',{
        method:'POST',
        body:formData,
      })
      .then(res => res.json())
      .then(res =>  {
        this.spinQuestion = res.qdata;
        console.log(res)})
    }
    async spin() {
      this.idToLandOn   = Math.floor(Math.random() * (6))
      console.log(this.idToLandOn)
      this.getSpinQuestion(this.idToLandOn)
      await new Promise(resolve => setTimeout(resolve, 0)); // Wait here for one tick
      this.wheel.spin()
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
    sessionStorage.clear();
    this.router.navigate(['/home'])

  }
  submit(){
    var body = {
      user_id: sessionStorage.getItem('userId'),
      answer:this.option,
      subject:this.items[this.idToLandOn].text
      }
      let formData = new FormData();
      for(var b in body){
        formData.append(b, body[b])

      }
        fetch('https://save2rent.com/app2021/api/public/submitspin',{
          method:'POST',
          body:formData,
        })
        .then(res => res.json())
        .then(res =>  {
          console.log(res)})
          sessionStorage.clear();
  }

}
