import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { MenusService } from "../services/menus.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-main-menu",
  templateUrl: "./main-menu.page.html",
  styleUrls: ["./main-menu.page.scss"],
})
export class MainMenuPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private menu: MenuController,
    private router: Router,
    private menusService: MenusService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}
  menuData: FormGroup;
  admin: string;
  menus = [];

  openFirst() {
    /* this.menu.enable(true, "first");
    this.menu.open("first");*/
  }

  ngOnInit() {
    this.menuData = this.fb.group({
      title_menu: "",
      user_id: JSON.parse(localStorage.getItem("user")).user_id,
      submenu: null,
    });
  }

  ionViewWillEnter() {
    this.menusService.getMenus().subscribe((data) => {
      this.menus = data;
    });
    this.admin = JSON.parse(localStorage.getItem("user")).admin;
  }

  goToProfile() {
    this.router.navigate(["./profile"]);
  }

  async addMenu() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.menusService.addMenu(this.menuData.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.menus.push(res[0]);
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

  async addNewMenu() {
    const alert = await this.alertController.create({
      header: "Create New Menu",
      inputs: [
        {
          name: "newMenuName",
          type: "text",
          placeholder: "Menu Name",
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
          text: "Create",
          handler: (alertData) => {
            console.log("Confirm Ok");
            this.menuData.value.title_menu = alertData.newMenuName;
            console.log(this.menuData.value);
            this.addMenu();
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmDeleteMenu(menu_id) {
    const alert = await this.alertController.create({
      header: "Delete Menu",
      message: "Are you sure you want to delete this menu?",
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
            this.deleteMenu(menu_id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteMenu(menu_id) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.menusService.deleteMenu(menu_id).subscribe(
      async (res) => {
        this.router.navigate(["./main-menu"]);
        await loading.dismiss();
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: "Menu failed to delete",
          message: res.error.error,
          buttons: ["OK"],
        });
        await alert.present();
      }
    );
  }
}
