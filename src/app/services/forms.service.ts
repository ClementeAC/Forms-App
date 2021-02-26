import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Forms } from "../main-menu/forms/forms.model";

@Injectable({
  providedIn: "root",
})
export class FormsService {
  forms: Forms[] = [];
  constructor(private http: HttpClient) {}

  getForms() {
    return this.http.get<any>(
      "https://api-rest-s.herokuapp.com/api/forms/menu"
    );
  }

  getForm(formId: string) {
    return this.http.get<any>(
      "https://api-rest-s.herokuapp.com/api/forms/submenu/" + formId
    );
  }
}
