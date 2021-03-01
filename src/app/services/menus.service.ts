import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, from, Observable } from "rxjs";

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

  getMenu(menuId: string) {
    return this.http.get<any>(
      "https://api-rest-s.herokuapp.com/api/forms/submenu/" + menuId
    );
  }

  addMenu(data: string): Observable<any> {
    return this.http.post(
      "https://api-rest-s.herokuapp.com/api/forms/menu",
      data
    );
  }

  deleteMenu(menuId: string){
    return this.http.delete<any>(
      "https://api-rest-s.herokuapp.com/api/forms/menu/" + menuId
    );
  }
////////////////////////////////////////////////////
  updateMenu(menuId: string, data: string){
    return this.http.put(
      "https://api-rest-s.herokuapp.com/api/forms/menu/" + menuId,
      data
    );
  }

}
