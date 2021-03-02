import { Component, OnInit } from "@angular/core";
import { FormsService } from "../../services/forms.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.page.html",
  styleUrls: ["./forms.page.scss"],
})
export class FormsPage implements OnInit {
  constructor(
    private formsService: FormsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  admin: string;
  recipeId: string;
  title: "";
  questions = [];
  answers: [];
  answer = {
    user_id: "",
    question_id: "",
    answers: [],
  };

  ngOnInit() {
    this.presentLoading();
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("formId");

      this.admin = JSON.parse(localStorage.getItem("user")).admin;
      this.answer.user_id = JSON.parse(localStorage.getItem("user")).user_id;

      this.formsService.getForm(this.recipeId).subscribe((data) => {
        this.questions = data;
        this.title = data[0].title_form;
        console.log(this.questions);
      });
    });
  }

  ionViewWillEnter() {
    this.presentLoading();
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("formId");

      this.admin = JSON.parse(localStorage.getItem("user")).admin;
      this.answer.user_id = JSON.parse(localStorage.getItem("user")).user_id;

      this.formsService.getForm(this.recipeId).subscribe((data) => {
        this.questions = data;
        this.title = data[0].title_form;
        console.log(this.questions);
      });
    });
  }

  getAnswer(question_id, answer) {
    /* for(const i = 0; i < length; i++){
      if(this.answer.question_id ){

      }
      this.answer.question_id = question_id
    }*/

    console.log(question_id + "\n" + answer);

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

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Please wait...",
      duration: 300,
    });
    await loading.present();
  }

  submitAnswer() {
    this.formsService.submitAnswer(this.recipeId, this.answer);
  }

  goToFormstats() {
    this.router.navigate(["./main-menu/forms/formstats", this.recipeId]);
    console.log("pressed");
  }

  async confirmDeleteQuestion(question_id) {
    const alert = await this.alertController.create({
      header: "Delete Question",
      message: "Are you sure you want to delete this question? ",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Delete",
          handler: (alertData) => {
            console.log("Confirm Ok");
            this.deleteQuestion(question_id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteQuestion(question_id) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.formsService.deleteQuestion(question_id).subscribe(
      async (res) => {
        this.router.navigate(["./main-menu"]);
        await loading.dismiss();
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: "Question failed to delete",
          message: res.error.error,
          buttons: ["OK"],
        });
        await alert.present();
      }
    );
  }
}
