/**
 * Created by wiekonek on 09.11.16.
 */
import {Component} from '@angular/core';
import {Card} from "../card/card";
import {ProjectsService} from "./projectsService/projects.service";

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: [ './test.component.css' ],
  providers: [ProjectsService]
})

export class TestComponent {
  cards:Card[] = [];

  constructor(projectsService: ProjectsService) {
    projectsService.getData()
       .subscribe(resp => this.cards = resp);
  }
}
