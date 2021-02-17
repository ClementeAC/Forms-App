import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  constructor(private menu: MenuController, private router: Router) { }

  openFirst(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  ngOnInit() {
  }

  goToProfile(){
    this.router.navigate(['./profile'])
  }


}
