import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-avatar-modal",
  templateUrl: "./avatar-modal.page.html",
  styleUrls: ["./avatar-modal.page.scss"],
})
export class AvatarModalPage implements OnInit {
  constructor(private modalController: ModalController) {}

  img = 0;

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }

  setImage(imageId) {
    this.closeModal();
    this.img = imageId;
  }
}
