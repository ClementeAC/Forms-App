import { Component, OnInit } from "@angular/core";
import { FormsService } from "../../services/forms.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { Form, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.page.html",
  styleUrls: ["./forms.page.scss"],
})
export class FormsPage implements OnInit {
  questionData: FormGroup;
  constructor(
    private formsService: FormsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private fb: FormBuilder
  ) {}

  admin: string;
  recipeId: string;
  title: "";
  form = {
    question_title: "",
    question_type: "",
  };
  questions = [];
  answers: [];
  answer = {
    user_id: JSON.parse(localStorage.getItem("user")).user_id,
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
    this.questionData = this.fb.group({
      form_id: "",
      title_q: "Pregunta",
      description_q: "",
      value: "",
      response_size: null,
      required: false,
      selection: false,
      text: false,
      numeric: false,
      checklist: false,
    });
  }

  getAnswer() {
    /* for(const i = 0; i < length; i++){
      if(this.answer.question_id ){

      }
      this.answer.question_id = question_id 
    }*/

    console.log();

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

  async addQuestion(form) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.formsService.createQuestion(form).subscribe(
      async (res) => {
        await loading.dismiss();
        this.questions.push(res[0]);
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: "Menu failed to create",
          message: res.error.error,
          buttons: ["OK"],
        });
        await alert.present();
      }
    );
  }

  async addNewQuestion() {
    const alert = await this.alertController.create({
      header: "Add New Question",
      inputs: [
        {
          name: "newQuestionName",
          type: "text",
          placeholder: "Question title",
        },
        {
          name: "newQuestionDescription",
          type: "text",
          placeholder: "Question description",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Next",
          handler: (alertData) => {
            console.log("Confirm Ok");
            this.questionData.value.title_q = alertData.newQuestionName;
            this.questionData.value.description_q =
              alertData.newQuestionDescription;
            console.log(this.questionData.value);
            this.questionType();
          },
        },
      ],
    });

    await alert.present();
  }

  async questionType() {
    const alert = await this.alertController.create({
      header: "Select question type:",
      inputs: [
        {
          name: "questionType",
          type: "radio",
          label: "Text",
          value: 1,
        },
        {
          name: "questionType",
          type: "radio",
          label: "Numeric",
          value: 2,
        },
        {
          name: "questionType",
          type: "radio",
          label: "Simple selection",
          value: 3,
        },
        {
          name: "questionType",
          type: "radio",
          label: "Multiple selection",
          value: 4,
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Next",
          handler: (alertData) => {
            console.log(alertData);
            this.questionData.value.form_id = this.recipeId;
            if (alertData == 1) {
              console.log("Es texto");
              this.questionData.value.text = true;
              console.log(this.questionData.value);
              this.newText();
            } else {
              if (alertData == 2) {
                console.log("Es Numeric");
                this.questionData.value.numeric = true;
                console.log(this.questionData.value);
                this.newNumeric();
              } else {
                if (alertData == 3) {
                  console.log("Es Simple selection");
                  this.questionData.value.selection = true;
                  console.log(this.questionData.value);
                  this.newSimple();
                } else {
                  if (alertData == 4) {
                    console.log("Es multiple selection");
                    this.questionData.value.checklist = true;
                    console.log(this.questionData.value);
                  }
                }
              }
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async newText() {
    const alert = await this.alertController.create({
      header: "Maximum response size",
      inputs: [
        {
          name: "textSize",
          type: "number",
          placeholder: "",
          label: "Response size",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Create question",
          handler: (alertData) => {
            console.log(alertData);
            this.questionData.value.response_size = alertData.textSize;
            console.log(this.questionData.value);
            console.log("questionfinished");
            this.addForm();
          },
        },
      ],
    });

    await alert.present();
  }

  async newNumeric() {
    const alert = await this.alertController.create({
      header: "Maximum response size",
      inputs: [
        {
          name: "textSize",
          type: "number",
          placeholder: "",
          label: "Response size",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Create question",
          handler: (alertData) => {
            console.log(alertData);
            this.questionData.value.response_size = alertData.textSize;
            console.log(this.questionData.value);
            console.log("questionfinished");
            this.addForm();
          },
        },
      ],
    });

    await alert.present();
  }

  async newSimple() {
    const alert = await this.alertController.create({
      header: "What are the options?",
      inputs: [
        {
          name: "option1",
          type: "text",
          placeholder: "Option 1",
        },
        {
          name: "option2",
          type: "text",
          placeholder: "Option 2",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Add another option",
          handler: (alertData) => {
            this.questionData.value.value =
              alertData.option1 + "|" + alertData.option2;
            this.Options();
          },
        },
        {
          text: "Create question",
          handler: (alertData) => {
            console.log(alertData);
            this.questionData.value.value =
              alertData.option1 + "|" + alertData.option2;
            console.log(this.questionData.value.value);
            console.log("question done");
            this.addForm();
          },
        },
      ],
    });

    await alert.present();
  }

  async Options() {
    const alert = await this.alertController.create({
      header: "Add new option",
      inputs: [
        {
          name: "option",
          type: "text",
          placeholder: "New option",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Add another option",
          handler: (alertData) => {
            console.log(alertData);
            this.questionData.value.value =
              this.questionData.value.value + "|" + alertData.option;
            this.Options();
          },
        },
        {
          text: "Create question",
          handler: (alertData) => {
            console.log(alertData);
            this.questionData.value.value =
              this.questionData.value.value + "|" + alertData.option;
            this.addForm();
          },
        },
      ],
    });

    await alert.present();
  }

  async newMultiple() {
    const alert = await this.alertController.create({
      header: "What are the options?",
      inputs: [
        {
          name: "option1",
          type: "text",
          placeholder: "Option 1",
        },
        {
          name: "option2",
          type: "text",
          placeholder: "Option 2",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Add another option",
          handler: (alertData) => {
            this.questionData.value.value =
              alertData.option1 + "|" + alertData.option2;
            this.Options();
          },
        },
        {
          text: "Create question",
          handler: (alertData) => {
            console.log(alertData);
            this.questionData.value.value =
              alertData.option1 + "|" + alertData.option2;
            console.log(this.questionData.value.value);
            console.log("question done");
            this.addForm();
          },
        },
      ],
    });

    await alert.present();
  }

  async addForm() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.formsService
      .createQuestion(this.questionData.value)
      .subscribe(async (res) => {
        await loading.dismiss();
      });
    this.router.navigate(["./main-menu/forms/" + this.recipeId]);

    async (res) => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: "Question failed to create",
        message: res.error.error,
        buttons: ["OK"],
      });
      await alert.present();
    };
  }
}
