import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import csc from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


// service
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'quiz-app';
  name = new FormControl('');
  Countries:Object =csc.getAllCountries(); 
  City;
  Class:Array<String> = ["5th","6th","7th","8th","9th","10th","11th","12th",'Individual']
  State:IState;
  submit = false;
  profileForm = new FormGroup({
    fName: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    school:new FormControl('',Validators.required),
    country:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    state:new FormControl('',Validators.required),
    class:new FormControl('',Validators.required),
    city:new FormControl('',Validators.required),
    schoolCode:new FormControl('',Validators.required),
    reffer:new FormControl('',Validators.required),


  });
  get fName():FormControl{
    return this.profileForm.get('fName') as FormControl;
  }
  get phone():FormControl{
    return this.profileForm.get('phone') as FormControl;
  }
  get school():FormControl{
    return this.profileForm.get('school') as FormControl;
  }
  get country():FormControl{
    return this.profileForm.get('country') as FormControl;
  }
  get email():FormControl{
    return this.profileForm.get('email') as FormControl;
  }
  get state():FormControl{
    return this.profileForm.get('state') as FormControl;
  }
  get class():FormControl{
    return this.profileForm.get('class') as FormControl;
  }
  get city():FormControl{
    return this.profileForm.get('city') as FormControl;
  }
  get schoolCode():FormControl{
    return this.profileForm.get('schoolCode') as FormControl;
  }  get reffer():FormControl{
    return this.profileForm.get('reffer') as FormControl;
  }
  selectedTab:string = '';
  selectedLanguage:string=''
  tabs= ['ABOUT','LANGUAGE','INSTRUCTION']
  i=0;

  constructor(public api: ApiService,public route:Router,public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.fun();
  }

  GetAPI(){
    this.api.GetDataService('api_path').subscribe(res => {
      // response will be here
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

  fun = function(){
    setTimeout(() => {
      console.log(this.profileForm)
    })
  }

  public submitted = false
  submitData = function(){
    this.spinner.show();
    this.submitted = true;

    var body = {
      fname:this.fName.value,
      class:this.class.value,
      phone:this.phone.value,
      email:this.email.value,
      referrer:this.reffer.value,
      language:this.selectedLanguage,
      city:this.city.value,
      state:csc.getStateByCode(this.state.value).name,
      country:csc.getCountryByCode(this.country.value).name,




    }
    // Build formData object.
    let formData = new FormData();
    for(var b in body){
    formData.append(b, body[b])

    }
    console.log(body)
    fetch('https://save2rent.com/app2021/api/public/login',{
      method:'POST',
      body:formData,

    })
    .then(res => res.json())
    .then(re => {
      console.log(re);
      if(!re.error){
        localStorage.setItem('quizArray',JSON.stringify(re.qjson))
        localStorage.setItem('userId',re.user_id)
        localStorage.setItem('language',re.language)
        this.spinner.hide();
        this.route.navigate(['/quiz'])        
        
      }
    })
  }
  next = function(){
    if(this.i==2){
      this.submitData();
    }
    else{
      this.submit =true;
      this.i++;
      var t = this.i*document.querySelector('.tab').clientWidth
      $('.highlight').css('transform',`translate3d(${t}px,0,0)`)
      $('.highlight').text(this.tabs[this.i]);
      console.log(this.i)
      if(this.i==2){
        this.getInstruction();
      }
    }

  }
  previous = function(){
    this.i--;
    var t = this.i*document.querySelector('.tab').clientWidth
    $('.highlight').css('transform',`translate3d(${t}px,0,0)`)
    $('.highlight').text(this.tabs[this.i]);
  }
  change = function(e,t){
    var s = e.target.value
    var obj={}
    obj[t] = s;
    console.log(obj,e.target.value,s)
    this.profileForm.patchValue(obj)
    if(t == 'country'){

      this.State = csc.getStatesOfCountry(s)
      console.log(this.state)
    }
    if(t == 'state'){
      this.City = csc.getCitiesOfState(this.profileForm.get('country').value,s)
    }
  }
  Instruction;
  getInstruction = function(){
    if(this.selectedLanguage == 'English'){
      this.Instruction = [ '1. This test is based on MCQ pattern',

      '2. There can be more than one correct answers',
      
      '3. Time duration : 15 minutes',
      
      '4. Questions : 25',
      
      '5. Marking Scheme : +4 for every right answer & -1 for every wrong answer',
      
       "6. Passing percentage : 40%",
      
      "7. Once you complete the test, result and certificate will be available immediately"]
    }
    else if(this.selectedLanguage == 'Hindi'){
      this.Instruction = [
        "क) यह परीक्षा बाहुल्य चयन प्रश्नों (MCQ's) पर आधारित है।",
        'ख) दिए गए विकल्पों में से एक से अधिक विकल्प भी सही हो सकते हैं।',
        "ग) समय सीमा - 15 मिनट है।",
        "घ) कुल प्रश्न - 25 हैं।",
        "च) अंक आबंटन प्रक्रिया:- +4 अंक प्रत्येक सही उत्तर के लिये दिए जाएंगे तथा 1 अंक प्रत्येक गलत उत्तर के लिये काटा जाएगा।",
        "छ) पासिंग प्रतिशत - 40% है।",
        "ज) जैसे ही आप अपना टेस्ट पूर्ण कर लेंगे, परिणाम तथा प्रमाण-पत्र तुरन्त ही प्राप्त हो जायेगा।"      ]
    }
    else{
      this.Instruction = [
        "ਇਹ ਟੈਸਟ ਬਹੁ-ਚੋਣ ਪ੍ਰਸ਼ਨ ਪੈਟਰਨ ਤੇ ਅਧਾਰਤ ਹੈ",
        "ਇਕ ਤੋਂ ਵੱਧ ਸਹੀ ਉੱਤਰ ਹੋ ਸਕਦੇ ਹਨ25",
        "ਸਮਾਂ ਮਿਆਦ: 15 ਮਿੰਟ",
        "ਪ੍ਰਸ਼ਨ: 25",
        "ਮਾਰਕਿੰਗ ਸਕੀਮ: ਹਰੇਕ ਸਹੀ ਉੱਤਰ ਲਈ +4 ਅਤੇ ਹਰੇਕ ਗਲਤ ਜਵਾਬ ਲਈ -1",
      ]

    }
    console.log(this.Instruction)

  }

}
