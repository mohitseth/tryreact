import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
// service
import { ApiService } from '../../providers/api.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public qjson = []
  constructor(public api: ApiService,public router: Router,public spinner: NgxSpinnerService) { }
  public current = {}
  public grid = []
  public questionObject =[]
  public keys = []
  public i =1;
  public review = {}
  public answer = {}
  public time = 15*60;

  ngOnInit(): void {
    if([null,'null',"",'undefined',undefined].includes(localStorage.getItem('userId'))){
        this.router.navigate(['/home'])
    }
    else{
        this.fun();
        this.startTimer();
    }
   
  }
  startTimer = function(){
     var int =  setInterval(() => {
          this.time --;
          this.secToTime(this.time)
          if(this.time == 0 ){
              clearInterval(int)
              this.submit();
          }
      },1000)
  }
  secToTime = function(sec){
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var sh = hours.toString(),sm = minutes.toString(),ss = seconds.toString();

    if (hours   < 10) {sh   = "0"+hours;}
    if (minutes < 10) {sm = "0"+minutes;}
    if (seconds < 10) {ss = "0"+seconds;}

    this.clock = sm  + ":" + ss;
    return this.clock;
    
  }


  fun =  function(){
      this.qjson = JSON.parse(localStorage.getItem('quizArray'))
    for(var i=0;i<this.qjson.length;i++) {
      var element = this.qjson[i];
      var id = Object.keys(element);
      var value : Object = Object.values(element)
      this.answer[i+1] = []
      this.questionObject.push(value[0])
    };
    
    console.log(this.questionObject);
    this.renderQuestion();
    
  
  }
  public clock = "24:00"
  next = function(){
    this.i++;
    this.renderQuestion();
  }
  previous = function(){
      this.i--;
      this.renderQuestion();

  }
  jump = function(i){
    this.i = i;
    this.renderQuestion();
  }
  toogleReview = function(){
      var i = this.i-1
      if(this.review[i] == undefined){
        this.review[i]= true;
      }
      else{
        this.review[i]= !this.review[i];

      }
      console.log(this.review)
  }
  private gridAnswer = {}
  answerQuestion = function(i,option){
    console.log(i,option)
    if(this.answer[i].includes(option)){
        var index = this.answer[i].indexOf(option);
        this.answer[i].splice(index,1);
        if(this.answer[i].length == 0)
            this.gridAnswer[this.i] = false;
        else
            this.gridAnswer[this.i] = true;
    }
    else{
        this.answer[i].push(option)
        this.gridAnswer[this.i] = true;


    }
    console.log(this.answer)
  }

  GetAPI(){
    this.api.GetDataService('api_path').subscribe(res => {
      // response will be here
    })
  }
  getKey = function(){
    return Object.keys(this.questionObject)
  }

  renderQuestion = function(){
      console.log(this.i)
    this.current = this.questionObject[this.i-1];
    this.keys = Object.keys(this.current)
    var index = this.keys.indexOf('qq');
    this.keys.splice(index,1)
  }
  public submitted = false
  submit = function(){
    this.submitted = true;
     this.spinner.show();
      var arr = [];
      for(var a in this.answer){
          for(var an of this.answer[a])
            arr.push([a,an])
      }
      console.log(arr)
      var body = {
          user_id: localStorage.getItem('userId'),
          language:localStorage.getItem('language'),
          timeTaken:this.secToTime(15*60-this.time),
          answer :arr
      }
      console.log(body,JSON.stringify(arr))
      let formData = new FormData();
      for(var b in body){
      formData.append(b, body[b])
  
      }
      console.log(JSON.stringify(body))
      fetch('https://save2rent.com/app2021/api/public/submit',{
        method:'POST',
        body:formData,
  
      })
      .then(res => res.json())
      .then(re => {
        console.log(re);
        if(!re.error){
        this.spinner.hide();

            localStorage.setItem('result',JSON.stringify(re))
            this.router.navigate(['/result'])        

        }
      })

  }
  PostAPI(){
    const post_data = {
      key: 'value'
    }
    this.api.PostDataService('api_path', post_data).subscribe(res => {
      // response will be here
    })
  }

  FormPostApi(){
    var form = new FormData();
    form.append('field', 'value');

    this.api.FormPostApi('api_path', form).then(res => {
      // response will be here
    })
  }

}
