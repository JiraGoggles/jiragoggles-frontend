/**
 * Created by wiekonek on 11.12.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StoryService} from "../services/story/story.service";
import {BasePaginateCardComponent} from "../base-paginate-card.component";
import {RankService} from "../services/rank/rank.service";
import {DragulaService} from "ng2-dragula/components/dragula.provider";


@Component({
  selector: 'epic',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ]
})
export class StoryComponent extends BasePaginateCardComponent {
  constructor(private route: ActivatedRoute, private service: StoryService, rankService: RankService, dragulaService: DragulaService) {
    super(rankService, dragulaService);
  }

  getPage(page: number) {
    let keys: string[] =[];

    this.route.params
      .map(params => [params['projectKey'], params['epicKey'], params['storyKey']])
      .subscribe(ks => keys = ks);

    // TODO Wait for this.key assignment in this.service.getPage
    this._getPage(page, this.service.getPage(page, this.perPage, keys[0], keys[1], keys[2]));
  }
}
