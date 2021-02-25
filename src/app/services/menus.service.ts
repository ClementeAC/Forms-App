import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Menus } from "../main-menu/menus.model";

@Injectable({
  providedIn: "root",
})
export class MenusService {
  constructor(private http: HttpClient) {}

  a = [];

  getMenus() {
    return this.http.get<any>(
      "https://api-rest-s.herokuapp.com/api/forms/menu"
    );
  }

  getMenu(menuId: string) {
    return this.http.get<any>(
      "https://api-rest-s.herokuapp.com/api/forms/submenu/1"
    );
  }
}
