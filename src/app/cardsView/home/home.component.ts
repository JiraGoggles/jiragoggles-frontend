/**
 * Created by wiekonek on 09.11.16.
 */
import {Component} from '@angular/core';
import {Card} from "../../card/card";
import {ProjectService} from "../services/project/project.service";

@Component({
  selector: 'test',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ],
})

export class HomeComponent {
  cards:Card[] = [];

  constructor(private projectsService: ProjectService) {
  }

  ngOnInit() {
    this.projectsService.getAll()
      .subscribe(resp => this.cards = resp);
  }
}
