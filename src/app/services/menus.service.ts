import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MenusService {
  constructor(private http: HttpClient) {}

  getMenus() {
    return this.http.get<any>(
      "https://api-rest-s.herokuapp.com/api/forms/menu"
    );
  }
}
