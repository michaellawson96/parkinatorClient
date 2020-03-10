import { Injectable } from '@angular/core';
import { User } from './DTO/User';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private auth : AuthenticationService, private http: HttpClient) { }

  userUrl : string = this.auth.url + "user/";

  createUser(user : User) {
    let jsonstr = JSON.stringify(user);
    return this.http.post(this.userUrl,jsonstr,this.auth.httpOptions);
  }
  readUser(): Observable<User[]>{
    return this.http.get<User[]>(this.userUrl, this.auth.httpOptions);
  }
  updateUser(user:User){
    let jsonstr = JSON.stringify(user);
    return this.http.put(this.userUrl,jsonstr,this.auth.httpOptions);
  }
  deleteUser(user: User){
    let jsonstr = JSON.stringify(user);
    return this.http.post(this.userUrl+"delete/",jsonstr,this.auth.httpOptions);
  }
}
