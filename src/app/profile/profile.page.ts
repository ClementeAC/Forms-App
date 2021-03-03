import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  credentials: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) {}
  admin: string;
  isShowing = 2;
  statistics = [];
  formsAnswered: number;
  user: {
    user_id: "";
    username: "";
    email: "";
    password: "";
    avatar: "";
  };

  ngOnInit() {
    this.admin = JSON.parse(localStorage.getItem("user")).admin;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.credentials = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      oldPassword: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ["", [Validators.required, Validators.minLength(6)]],
    });
    if(!this.admin){
      this.getAnswersUser();
    }
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.isShowing = 2;
    this.admin = JSON.parse(localStorage.getItem("user")).admin;
  }

  updatePicture() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  goBack() {
    this.router.navigate(["./main-menu"]);
  }

  editInfo(index) {
    this.isShowing = index;
  }

  clearFields() {
    document.forms["updateform"].reset();
  }

  async update() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.user.username = this.credentials.value.username;
    this.user.password = this.credentials.value.password;

    this.authService.updateUserData(this.user, this.user.user_id).subscribe(
      async (res) => {
        await loading.dismiss();
        this.isShowing = 2;
        this.updatePicture();
        this.clearFields();
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: "Update failed",
          message: res.error.error,
          buttons: ["OK"],
        });
        await alert.present();
      }
    );
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  async getAnswersUser(){
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.authService.getAnswersUser(this.user.user_id).subscribe(
      async (res) => {
        await loading.dismiss();

        let forms = res.map(function (form) { return form.title_form; });
        let sorted = forms.sort();

        this.statistics = sorted.filter(function (value, index) {
          return value !== sorted[index + 1];
        });
        this.formsAnswered = this.statistics.length;

        console.log(this.statistics);

        this.updatePicture();
        this.clearFields();
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: "Failed to get statistics",
          message: res.error.error,
          buttons: ["OK"],
        });
        await alert.present();
      }
    );
  }

  get username() {
    return this.credentials.get("username");
  }
  get oldPassword() {
    return this.credentials.get("oldPassword");
  }
  get password() {
    return this.credentials.get("password");
  }

  get confirmNewPassword() {
    return this.credentials.get("confirmNewPassword");
  }

  SignOff() {
    localStorage.removeItem("user");
    this.router.navigate(["./log-in"]);
  }
}
