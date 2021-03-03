import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, switchMap } from "rxjs/operators";
import { BehaviorSubject, from, Observable } from "rxjs";

import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );

  constructor(private http: HttpClient) {
  }

  register(credentials: { username; email; password }): Observable<any> {
    return this.http
      .post(`https://api-rest-s.herokuapp.com/api/users/`, credentials)
  }

  login(credentials: { username; password }): Observable<any> {
    return this.http.post(
      `https://api-rest-s.herokuapp.com/api/users/login`,
      credentials
    );
  }

  updateUserData(
    credentials: {
      username;
      avatar;
      email;
      password;
    },
    user: string
  ): Observable<any> {
    console.log(credentials);
    return this.http.put(
      "https://api-rest-s.herokuapp.com/api/users/" + user,
      credentials
    );
  }
  
  getAnswersUser(userId: string) {
    return this.http.get<any>(
      "https://api-rest-s.herokuapp.com/api/forms/answerUser/" + userId
    );
  }
}
