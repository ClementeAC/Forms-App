import { Component, OnInit } from "@angular/core";
import { FormsService } from "../../services/forms.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.page.html",
  styleUrls: ["./forms.page.scss"],
})
export class FormsPage implements OnInit {
  constructor(
    private formsService: FormsService,
    private activatedRoute: ActivatedRoute
  ) {}

  recipeId: string;
  questions = [];
  answer= {
    user_id: '',
    question_id: '2',
    answers: []
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("formId");

      this.answer.user_id = (JSON.parse(localStorage.getItem('user'))).user_id;
      console.log(this.answer)
      
      this.formsService.getForm(this.recipeId).subscribe((data) => {
        this.questions = data;
        console.log(this.questions);
      });
    });
  }

  getAnswer (question_id, answer){
   /* for(const i = 0; i < length; i++){
      if(this.answer.question_id ){

      }
      this.answer.question_id = question_id
    }*/
    this.answer.question_id = question_id;
    this.answer.answers = answer;
    this.formsService.submitAnswer(this.recipeId, this.answer);
  }
}
