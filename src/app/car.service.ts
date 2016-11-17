/**
 * Created by JJax on 17.11.2016.
 */

import {Injectable} from '@angular/core';
import {Car} from "./Car";

@Injectable()
export class CarService {
  public getCars(): Car[] {
    return this.cars;
}
  private cars: Car[] = [
    { id: 1, name: "Bmw", speed: 20 },
    { id: 2, name: "Bmw", speed: 40 }
  ]
}
