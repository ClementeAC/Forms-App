import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthenticationService } from "../services/authentication.service";
import { ModalController } from "@ionic/angular";
import { AvatarModalPage } from "./avatar-modal/avatar-modal.page";

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
    private modalController: ModalController,
  ) { }

  isShowing = 2;
  user: string;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.credentials = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewWillEnter() {
    this.isShowing = 2;
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

    this.authService.updateUserData(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.isShowing = 2;
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
  }

  get username() {
    return this.credentials.get("username");
  }
  get oldPassword() {
    return this.credentials.get("oldPassword");
  }
  get newPassword() {
    return this.credentials.get("newPassword");
  }

  get confirmNewPassword() {
    return this.credentials.get("confirmNewPassword");
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalController,
    });
    return await modal.present();
  }
}
