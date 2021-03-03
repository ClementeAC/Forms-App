import { Component, OnInit } from "@angular/core";
import { FormsService } from "../../../services/forms.service";
import { ActivatedRoute } from "@angular/router";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-formstats",
  templateUrl: "./formstats.page.html",
  styleUrls: ["./formstats.page.scss"],
})
export class FormstatsPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formsService: FormsService,
    private popoverController: PopoverController
  ) {}

  title = '|';
  recipeId: string;
  statistics = [];
  questions = [];
  answers = [];
  questionsTitle = [];
  index = -1;
  users = [];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("formId");
      this.formsService.getAnswers(this.recipeId).subscribe((data) => {

        this.answers = data;
        if(data[0].title_form != undefined){
          this.title = data[0].title_form;

          /*//obtengo la cantidad de preguntas y sus ids
          let questions = this.answers.map(function (res) { return res.question_id; });
          let sorted = questions.sort();
          
          let stats = sorted.filter(function (value, index) {
            return value !== sorted[index + 1];
          });

          //obtengo la cantidad de usuarios y sus ids
          let user = this.answers.map(function (res) { return res.user_id; });
          let sort = user.sort();
          
          this.users = sort.filter(function (value, index) {
            return value !== sort[index + 1];
          });
          //console.log(users);

         // obtengo las respuestas pero en una sola lista 
          for (let i = 0; i < stats.length; i++) {
            for (let j = 0; j < this.answers.length; j++) {
              if (this.answers[j].question_id == stats[i]) {
                this.statistics.push(this.answers[j].value);
              }
            }
          }
          console.log(this.statistics);

          //obtengo los valores las respuestas separadas
          for (let i = 0; i < stats.length; i++) {
            this.questions.push(this.answers[i].question);
          }
          console.log(this.questions);*/
        }
        console.log(this.answers);
      });
    });
  }
}
