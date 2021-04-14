import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class ApiService
{
    API_URL: string = 'https://save2rent.com/app2021/api/public/';

    constructor(
        private http: HttpClient,
    ) {
        
    }

    public GetDataService(path: string){
        const url = this.API_URL+path;
        return this.http.get(url);
    }

    public PostDataService(path: string, data: object){
        const url = this.API_URL+path;
        return this.http.post(url, data);
    }

    public FormPostApi(path:string, data: any) {
        var myHeaders = new Headers();
        myHeaders.append("key", "value");
    
        var requestOptions: object = {
          method: 'POST',
          headers: myHeaders,
          body: data,
          redirect: 'follow'
        };
        const url = this.API_URL+path;
        return fetch(url, requestOptions);
      }

}
