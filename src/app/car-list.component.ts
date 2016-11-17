import {Component} from "@angular/core";
import {CarService} from "./car.service";
import {Car} from "./Car";
/**
 * Created by JJax on 17.11.2016.
 */

@Component({
  selector: "car-list",
  template:`<table>
    <tr>
      <th>row1</th>
      <th>row2</th>
    </tr>
    <tr *ngFor='let car of cars'>
      <td>{{car.name}}</td>
      <td>{{car.speed}}</td>
      <button (click)="changeData(car.id)">change</button>
    </tr>
  </table>`,
  providers: [CarService]
})

export class CarListComponent {
  public cars : Car[];
  constructor(private carService: CarService){
    this.cars = this.carService.getCars();
  };

  changeData(id: number) {
    this.cars = [
      { id: 3, name: "Merc", speed: 100}
    ]
    console.log(id)
  }
}
