import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServieApiServiceService {

   // API path
   base_path = 'https://api.axelib.io/0.1/';
   // verify login user
   isLoggedIn = false;
   //response login user
   token:any;
   idUser:Number 
 
  
   constructor(private http: HttpClient,private storage: NativeStorage) { }
 
   //login user  for api axlib  
 public login(email, password) {
 
   //tramission des données
   const body= new HttpParams() 
   .set("email", email)
   .set("password", password)
   //headers 
   const headers = new HttpHeaders()
   .set("Content-Type", "x-www-form-urlencoded") // attention axelib attend les données de type de  x-www-form-urlencoded
   .set("ProjectID", "6lQwueo") 
 
 return this.http.post(this.base_path + 'login/user',body.toString(), {headers}
 ).pipe(
 tap(token => {
   console.log(token["user"])
  
   let donne={
     id:token["user"]["id"],
     nikname:token["user"]["nickname"]
   }
   console.log(donne)
   this.storage.setItem('myitem', {id: token["user"]["id"], nikname: token["user"]["nickname"]})
       .then(
         () => console.log('save item!'),
         error => console.error('Error storing item', error)
       );
       // pour sauvegarde l'utilisateur 
       this.storage.setItem('idUs',donne["id"])
 
       this.storage.setItem('LoggedIn', true)
   .then(
     () => {
       console.log('Token Stored');
     },
     error => console.error('stockage d’erreur', error)
   );
     this.token = token;
     this.isLoggedIn = true;
     return token;
   }),
   );
 }
 
 
 // inscription avec axelib 
 public register(email, password) {
 
   //tramission des données
   const body= new HttpParams() 
   .set("email", email)
   .set("password", password)
   //headers 
   const headers = new HttpHeaders()
   .set("Content-Type", "x-www-form-urlencoded") // attention axelib attend les données de type de  x-www-form-urlencoded
   .set("ProjectID", "6lQwueo") 
 
 return this.http.post(this.base_path + '/register/user',body.toString(), {headers}
 ).pipe(
 tap(token => {
   console.log(token["user_id"])
  
   let donne={
     id:token["user_id"]
   }
   console.log(donne)
   this.storage.setItem('myitem', {id: token["user_id"]})
       .then(
         () => console.log('save item!'),
         error => console.error('Error storing item', error)
       );
       // pour sauvegarde l'utilisateur 
       this.storage.setItem('idUs',donne["id"])
 
       this.storage.setItem('LoggedIn', true)
   .then(
     () => {
       console.log('Token Stored');
     },
     error => console.error('stockage d’erreur', error)
   );
     this.token = token;
     this.isLoggedIn = true;
     return token;
   }),
   );
 }
}
