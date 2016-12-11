/**
 * Created by wiekonek on 11.12.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ParentCard} from "../../card/card";
import {StoryService} from "../services/story/story.service";


@Component({
  selector: 'epic',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ]
})
export class StoryComponent {
  private cards: ParentCard[];
  private key: number;

  constructor(private route: ActivatedRoute, private service: StoryService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => [params['projectKey'], params['epicKey'], params['storyKeys']])
      .subscribe(keys => {
        this.key = keys[2];
        this.service
          .get(keys[0], keys[1], keys[2])
          .subscribe(cards => this.cards = cards);
      });
  }
}
