import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenusService } from "../../services/menus.service";

@Component({
  selector: "app-menu-details",
  templateUrl: "./menu-details.page.html",
  styleUrls: ["./menu-details.page.scss"],
})
export class MenuDetailsPage implements OnInit {
  admin: string;
  menus: [];
  recipeId: string; 
  title = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private menusService: MenusService
  ) {}

  ngOnInit() {
    this.admin = (JSON.parse(localStorage.getItem('user'))).admin;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("menuId");
      this.menusService.getMenu(this.recipeId).subscribe((data) => {
        this.menus = data;
        console.log(data);
        this.title = data[0].title_menu;
      });
    });
  }
}
