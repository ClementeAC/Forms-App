import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.page.html",
  styleUrls: ["./landing-page.page.scss"],
})
export class LandingPagePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  login() {
    this.router.navigate(["./log-in"]);
  }

  register() {
    this.router.navigate(["./sign-in"]);
  }
}
