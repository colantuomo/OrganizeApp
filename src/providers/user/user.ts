import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  materias: any = [];
  pendencias: any = [];
  private apiUrl: string = 'http://localhost:3000/tarefas';
  headers = new Headers();

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello UserProvider Provider');
  }

  getData() {
    return this.pendencias;
    //return this.http.get(this.apiUrl).map(res => res.json())
  }

  insertData(pendencias: any) {
    this.pendencias.push(pendencias);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // return this.http.post(this.apiUrl, JSON.stringify(pendencias), {headers: headers})
    // .map(res => res.json())
    //   .subscribe(data => {
    //     console.log(data);
    //   }, error => {
    //     console.log(error);// Error getting the data
    //   });
  }

  deleteData(pendencias: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(this.apiUrl, JSON.stringify(pendencias))
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  //MATERIAS

  getMateriasData() {
    this.storage.ready().then(() => {
      // get value 
      this.storage.get('1').then((val) => {
        this.materias = JSON.parse(val);
        console.log('LOCAL STORAGE '+this.materias);
      })
    });
    
    //console.log('GET MATERIASSS');

    // return this.http.get(this.apiUrl+"/materias").map(res => res.json())
  }

  getStorageData(){
    console.log('this.materias '+this.materias);
    return this.materias;
  }


  insertMateriasData(materias: any) {
    this.materias.push(materias);
    this.storage.ready().then(() => {
      // set key   value
      this.storage.set('1', materias);

      // get value 
      //  this.storage.get('myKey').then((val) => {
      //    console.log(val);
      //  })
    });
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // return this.http.post(this.apiUrl+"/materias", JSON.stringify(materias), {headers: headers})
    // .map(res => res.json())
    //   .subscribe(data => {
    //     console.log(data);
    //   }, error => {
    //     console.log(error);// Error getting the data
    //   });
  }

  deleteMateriasData(pendencias: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(this.apiUrl + "/materias", JSON.stringify(pendencias))
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);// Error getting the data
      });
  }

}
