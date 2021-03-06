/**
 * Created by wiekonek on 11.12.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ParentCard} from "../../card/card";
import {StoryService} from "../services/story/story.service";
import {RankService} from "../services/rank/rank.service";
import {BaseScrollableCardsViewComponent} from "../base-scrollable-cards-view.component";


@Component({
  selector: 'epic',
  templateUrl: '../base-scrollable-cards-view.component.html',
  styleUrls: [ '../base-scrollable-cards-view.component.scss' ]
})
export class StoryComponent extends BaseScrollableCardsViewComponent {
  constructor(private route: ActivatedRoute, private service: StoryService, rankService: RankService) {
    super(rankService);
  }

  loadNextBatch() {
    let keys: string[] =[];

    this.route.params
      .map(params => [params['projectKey'], params['epicKey'], params['storyKey']])
      .subscribe(ks => keys = ks);

    // TODO Wait for this.key assignment in this.service.loadNextBatch
    this._loadNextBatch(this.service.getPage(this.nextBatchNumber, this.perBatch, keys[0], keys[1], keys[2]));
  }
}
