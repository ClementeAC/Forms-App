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

  admin: string;
  recipeId: string;
  title: '';
  questions = [];
  answers: [];
  answer = {
    user_id: '',
    question_id: '',
    answers: []
  };

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("formId");

      this.admin = (JSON.parse(localStorage.getItem('user'))).admin;
      this.answer.user_id = (JSON.parse(localStorage.getItem('user'))).user_id;
      
      this.formsService.getForm(this.recipeId).subscribe((data) => {
        this.questions = data;
        this.title = data[0].title_form;
        console.log(this.questions);
      });
    });
  }

  getAnswer (question_id , answer){
   


    /* for(const i = 0; i < length; i++){
      if(this.answer.question_id ){

      }
      this.answer.question_id = question_id
    }*/

    console.log(question_id +"\n"+ answer);

    /*
      const loading = await this.loadingController.create();
      await loading.present();

      this.formsService.submitAnswer(recipeId, ["si", "Si"]).subscribe(
        async (res) => {
          await loading.dismiss();
        },
        async (res) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: "There was an error submitting your answer",
            message: res.error.error,
            buttons: ["OK"],
          });
          await alert.present();
        }
      );
    });*/

  }

  submitAnswer(){
    this.formsService.submitAnswer(this.recipeId, this.answer);
  }
}
