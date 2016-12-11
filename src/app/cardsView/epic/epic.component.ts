/**
 * Created by wiekonek on 11.12.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ParentCard} from "../../card/card";
import {EpicService} from "../services/epic/epic.service";


@Component({
  selector: 'epic',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ]
})
export class EpicComponent {
  private cards: ParentCard[];
  private key: number;

  constructor(private route: ActivatedRoute, private service: EpicService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => [params['projectKey'], params['epicKey']])
      .subscribe(keys => {
        this.key = keys[1];
        this.service
          .get(keys[0], keys[1])
          .subscribe(cards => this.cards = cards);
      });
  }
}
