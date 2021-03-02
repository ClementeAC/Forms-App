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

  recipeId: string;
  questions = [];
  title: "";
  answers = [];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("formId");

      this.formsService.getForm(this.recipeId).subscribe((data) => {
        this.questions = data;
        this.title = data[0].title_form;
        console.log(this.questions);
      });

      this.formsService.getAnswers(this.recipeId).subscribe((data) => {
        this.answers = data;
        console.log(this.answers);
      });
    });
  }
}
