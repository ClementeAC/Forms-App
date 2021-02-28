import { Component, OnInit } from "@angular/core";
import { FormsService } from "../../services/forms.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.page.html",
  styleUrls: ["./forms.page.scss"],
})
export class FormsPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  questions = [];
  answers = [];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const recipeId = paramMap.get("formId");
      this.formsService.getForm(recipeId).subscribe((data) => {
        this.questions = data;
        this.formsService.forms = data;
        console.log(this.questions);
      });
    });
  }

  async submitAnswer() {
    this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      const recipeId = paramMap.get("formId");

      const loading = await this.loadingController.create();
      await loading.present();

      this.formsService.submitAnswer(recipeId, ["si, Si"]).subscribe(
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
    });
  }
}
