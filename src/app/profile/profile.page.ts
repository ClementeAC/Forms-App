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
    private authService: AuthenticationService,
  ) {}

  admin: string;
  isShowing = 2; 
  user: {
    user_id: "";
    username: "";
    email: "";
    password: "";
    avatar: "";
  };

  ngOnInit() {
    this.admin = (JSON.parse(localStorage.getItem('user'))).admin;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.credentials = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      oldPassword: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.isShowing = 2;
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
    localStorage.removeItem('user');
    this.router.navigate(["./log-in"]);
  }

}
