import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(private router: Router) {}

  isShowing = 2;

  ngOnInit() {}

  ionViewWillEnter() {
    this.isShowing = 2;
  }

  goBack() {
    this.router.navigate(["./main-menu"]);
  }

  editInfo(index) {
    this.isShowing = index;
    console.log("pressed");
  }
}
