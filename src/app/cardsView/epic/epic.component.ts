/**
 * Created by wiekonek on 11.12.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ParentCard} from "../../card/card";
import {EpicService} from "../services/epic/epic.service";
import {RankService} from "../services/rank/rank.service";
import {BaseScrollableCardsViewComponent} from "../base-scrollable-cards-view.component";


@Component({
  selector: 'epic',
  templateUrl: '../base-scrollable-cards-view.component.html',
  styleUrls: [ '../base-scrollable-cards-view.component.scss' ]
})
export class EpicComponent extends BaseScrollableCardsViewComponent {
  private key: number;

  constructor(private route: ActivatedRoute, private service: EpicService, rankService: RankService) {
    super(rankService);
  }

  loadNextBatch() {
    let keys: string[] =[];

    this.route.params
      .map(params => [params['projectKey'], params['epicKey']])
      .subscribe(ks => keys = ks);

    // TODO Wait for this.key assignment in this.service.loadNextBatch
    this._loadNextBatch(this.service.getPage(this.nextBatchNumber, this.perBatch, keys[0], keys[1]));
  }
}
