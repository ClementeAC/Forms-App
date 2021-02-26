import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { MenusService } from "../services/menus.service";
import { FormsService } from "../services/forms.service";

@Component({
  selector: "app-main-menu",
  templateUrl: "./main-menu.page.html",
  styleUrls: ["./main-menu.page.scss"],
})
export class MainMenuPage implements OnInit {
  menus = [];

  constructor(
    private menu: MenuController,
    private router: Router,
    private menusService: MenusService
  ) {}

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  ngOnInit() {
    this.menusService.getMenus().subscribe((data) => {
      this.menus = data;
      this.menusService.menus = data;
    });
  }

  ionViewWillEnter() {
    this.menusService.getMenus().subscribe((data) => {
      this.menus = data;
    });
  }

  goToProfile() {
    this.router.navigate(["./profile"]);
  }

  addNewMenu() {
    console.log("pressed");
  }
}
