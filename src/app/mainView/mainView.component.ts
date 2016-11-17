/**
 * Created by wiekonek on 09.11.16.
 */
import {Component} from '@angular/core';
import {Card} from "../card/card";
import {ProjectsService} from "./projectsService/projects.service";

@Component({
  selector: 'test',
  templateUrl: 'mainView.component.html',
  styleUrls: [ 'mainView.component.css' ],
  providers: [ProjectsService]
})

export class MainViewComponent {
  cards:Card[] = [];

  constructor(projectsService: ProjectsService) {
    projectsService.getData()
       .subscribe(resp => this.cards = resp);
  }
}
