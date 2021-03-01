import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FormsService {
  constructor(private http: HttpClient) {}

  getForm(formId: string) {
    return this.http.get<any>(
      "https://api-rest-s.herokuapp.com/api/forms/question/" + formId
    );
  }
////////////////////////////////////////////////////
  getAnswers(questionId: string) {
    return this.http.get<any>(
      "https://api-rest-s.herokuapp.com/api/forms/answer/" + questionId
    );
  }
////////////////////////////////////////////////////
  submitAnswer(formId: string, answers: object) {
    console.log(formId + "\n" + answers);
    /*return this.http.post(
      "https://api-rest-s.herokuapp.com/api/forms/answer/" + formId,
      answers
    );*/
  }
////////////////////////////////////////////////////
  createQuestion(form: string){
    //{ title_q, description_q, value, response_size, required, selection, text, numeric, checklist }
    return this.http.post(
      "https://api-rest-s.herokuapp.com/api/forms/form/",
      form
    );
  }
////////////////////////////////////////////////////
  createForm(form: string){
    //{ menu_id, title_form, description_form, locked }
    return this.http.post(
      "https://api-rest-s.herokuapp.com/api/forms/form/",
      form
    );
  }
////////////////////////////////////////////////////
  updateForm(formId: string, form: string){
    return this.http.put(
      "https://api-rest-s.herokuapp.com/api/forms/form/" + formId,
      form
    );
  }
////////////////////////////////////////////////////
  updateQuestion(questionId: string, question: string){
    return this.http.put(
      "https://api-rest-s.herokuapp.com/api/forms/question/" + questionId,
      question
    );
  }

  deleteForm(formId: string){
    return this.http.delete<any>(
      "https://api-rest-s.herokuapp.com/api/forms/form/" + formId
    );
  }
////////////////////////////////////////////////////
  deleteQuestion(questionId: string){
    return this.http.delete<any>(
      "https://api-rest-s.herokuapp.com/api/forms/question/" + questionId
    );
  }
}
