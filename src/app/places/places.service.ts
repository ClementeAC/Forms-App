import { Injectable } from '@angular/core';
import {Place} from './place.model'

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places: Place[] = [
    {
      id: '1',
      title: 'Eiffel Tower',
      imageURL: 'https://www.toureiffel.paris/sites/default/files/styles/1200x675/public/actualite/image_principale/IMG_20200526_123909.jpg?itok=DeDSW4xL',
      comments: ['Awesome place', 'wonderful experience']
    },
    {
      id: '2',
      title: 'Statue of Liberty',
      imageURL: 'https://i.guim.co.uk/img/media/4a29dde46c17e8a07f98e4e5947d49964d074923/0_348_6000_3600/master/6000.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88c75e6319ec9d3588bb6e17ae92ff68',
      comments: ['Awesome place', 'wonderful experience']
    }
  ]

  constructor() { }

  getPlaces() {

    return [...this.places]

  }

  getPlace(placeId: string) {

    return {
      ...this.places.find(place => {
        return place.id === placeId
      })
    }

  }

  addPlace(title: string, imageURL: string) {

    this.places.push({
      title,
      imageURL,
      comments: [],
      id: this.places.length + 1 + ""
    });

  }

  deletePlace(placeId: string){

    this.places = this.places.filter(place => {
      return place.id !== placeId
    })

  }
}
