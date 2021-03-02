import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenusService } from "../../services/menus.service";
import { FormsService } from "../../services/forms.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-menu-details",
  templateUrl: "./menu-details.page.html",
  styleUrls: ["./menu-details.page.scss"],
})
export class MenuDetailsPage implements OnInit {
  admin: string;
  menuData: FormGroup;
  formData: FormGroup;
  questionDefault: FormGroup;
  menus = [];
  recipeId: string;
  title = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private menusService: MenusService,
    private formService: FormsService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.admin = JSON.parse(localStorage.getItem("user")).admin;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("menuId");
      this.menusService.getMenu(this.recipeId).subscribe((data) => {
        this.menus = data;
        console.log(data);
        this.title = data[0].title_menu;
      });
    });
    this.menuData = this.fb.group({
      title_menu: "",
      user_id: JSON.parse(localStorage.getItem("user")).user_id,
      submenu: this.recipeId,
    });
    this.formData = this.fb.group({
      menu_id: this.recipeId,
      title_form: "",
      description_form: null,
      locked: false,
    });
    this.questionDefault = this.fb.group({
      form_id: "",
      title_q: "Pregunta",
      description_q: "Descripcion",
      value: "opcion 1|opcion 2",
      response_size: null,
      required: false,
      selection: true,
      text: false,
      numeric: false,
      checklist: false,
    });
  }

  ////////////////////////////////////////////////////////////////////////
  async addNewForm() {
    const alert = await this.alertController.create({
      header: "Create New From",
      inputs: [
        {
          name: "newFormName",
          type: "text",
          placeholder: "From Name",
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
            this.formData.value.title_form = alertData.newFormName;
            this.addForm();
          },
        },
      ],
    });

    await alert.present();
  }
  ////////////////////////////////////////////////////////////////////////

  async addForm() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.formService.createForm(this.formData.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.menus.push(res[0]);
        this.questionDefault.value.form_id = res[0].form_id;
        this.formService
          .createQuestion(this.questionDefault.value)
          .subscribe(async (res) => {
            await loading.dismiss();
          });
        this.router.navigate(["./main-menu/" + this.recipeId]);
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: "Form failed to create",
          message: res.error.error,
          buttons: ["OK"],
        });
        await alert.present();
      }
    );
  }

  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////

  async confirmDeleteForm(menu_id, form_id) {
    const alert = await this.alertController.create({
      header: "Delete from",
      message: "Are you sure you want to delete this form?",
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
            this.deleteForm(menu_id, form_id);
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteForm(menu_id, form_id) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.formService.deleteForm(form_id).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigate(["./main-menu/" + menu_id]);
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: "From failed to delete",
          message: res.error.error,
          buttons: ["OK"],
        });
        await alert.present();
      }
    );
  }

  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////////////////
  async confirmDeleteMenu(submenu, menu_id) {
    const alert = await this.alertController.create({
      header: "Delete Menu",
      message: "sure to delete this menu? ",
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
            this.deleteMenu(submenu, menu_id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteMenu(submenu, menu_id) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.menusService.deleteMenu(menu_id).subscribe(
      async (res) => {
        this.router.navigate(["./main-menu/" + submenu]);
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
  ////////////////////////////////////////////////////////////////////////
}
