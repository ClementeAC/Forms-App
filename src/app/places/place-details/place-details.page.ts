import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Place } from "../place.model";
import { PlacesService } from "../places.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-place-details",
  templateUrl: "./place-details.page.html",
  styleUrls: ["./place-details.page.scss"],
})
export class PlaceDetailsPage implements OnInit {
  place: Place;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      //redirect
      const recipeId = paramMap.get("placeId");
      this.place = this.placesService.getPlace(recipeId);
    });
  }

  async deletePlace() {
    const alertElement = await this.alertController.create({
      header: "Delete",
      message: "Are you sure you want to delete this place",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Delete",
          handler: () => {
            this.placesService.deletePlace(this.place.id);
            this.router.navigate(["/places"]);
          },
        },
      ],
    });
    await alertElement.present();
  }
}
