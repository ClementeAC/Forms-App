import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenusService } from "../../services/menus.service";
import { Menus } from "../menus.model";

@Component({
  selector: "app-menu-details",
  templateUrl: "./menu-details.page.html",
  styleUrls: ["./menu-details.page.scss"],
})
export class MenuDetailsPage implements OnInit {
  menus: Menus;
  menu_id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private menusService: MenusService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const recipeId = paramMap.get("menuId");
      this.menu_id = paramMap.get("menuId");
      this.menusService.getMenu(recipeId).subscribe((data) => {
        this.menus = data;
        console.log(data);
      });
    });
  }
}
