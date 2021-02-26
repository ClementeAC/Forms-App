import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AuthenticationService } from "../../services/authentication.service";
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-avatar-modal",
  templateUrl: "./avatar-modal.page.html",
  styleUrls: ["./avatar-modal.page.scss"],
})
export class AvatarModalPage implements OnInit {
  constructor(
    private modalController: ModalController, 
    private authService: AuthenticationService,
    private alertController: AlertController,
    private loadingController: LoadingController
    ) {}

  user: {
    user_id: '',
    username: '',
    email: '',
    password: '',
    avatar: ''
  };

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  setImage(imageId) {
    this.closeModal();
    this.user.avatar = imageId;
    localStorage.setItem("user", JSON.stringify(this.user));
    this.update();
  }

  async update() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.updateUserData(this.user, this.user.user_id).subscribe(
      async (res) => {
        await loading.dismiss();
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
}
