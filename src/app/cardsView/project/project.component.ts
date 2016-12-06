/**
 * Created by wiekonek on 22.11.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../services/project/project.service";
import {Card} from "../../card/card";


@Component({
  selector: 'project',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ]
})
export class ProjectComponent {
  private cards: Card[];
  private key: number;

  constructor(private route: ActivatedRoute, private service: ProjectService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['key'])
      .subscribe(key => {
        this.key = key;
        this.service
          .get(key)
          .subscribe(cards => this.cards = cards);
      });
  }
}

