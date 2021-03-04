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
  answers = [{
    question: "",
    question_id: 0,
    title_form: "",
    title_q: "",
    user_id: 0,
    value: "",
  }];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("formId");
      this.formsService.getAnswers(this.recipeId).subscribe((data) => {

        this.answers = data;
        if(data[0].title_form != undefined){
          this.title = data[0].title_form;
        }
        console.log(this.answers);
      });
    });
  }
}
