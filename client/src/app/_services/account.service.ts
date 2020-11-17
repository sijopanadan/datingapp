import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReplaySubject} from 'rxjs';
import { JSDocCommentStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:5001/api/';
  private currentusersource = new ReplaySubject<User>(1);
  currentuser$ = this.currentusersource.asObservable()

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl+'account/login',model).pipe(
      map((respose:User)=>{
        const user = respose;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentusersource.next(user);
        }
      })
    );
  }

  register(model:any){
    return this.http.post(this.baseUrl+'account/register',model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentusersource.next(user);
        }
      })
    )
  }

  setcurrentuser(user : User){
    this.currentusersource.next(user);
  }
  logout(){
    localStorage.removeItem('user');
    this.currentusersource.next(null);
  }

}
