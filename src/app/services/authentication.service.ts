import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, switchMap } from "rxjs/operators";
import { BehaviorSubject, from, Observable } from "rxjs";

import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const TOKEN_KEY = "my-token";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = "";

  constructor(private http: HttpClient) {
    this.loadToken();
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  user: string;

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log("set token: ", token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  register(credentials: { username; email; password }): Observable<any> {
    return this.http
      .post(`https://api-rest-s.herokuapp.com/api/users/`, credentials)
      .pipe(
        map((data: any) => data.token),
        switchMap((token) => {
          return from(Storage.set({ key: TOKEN_KEY, value: token }));
        }),
        tap((_) => {
          this.isAuthenticated.next(true);
        })
      );
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
