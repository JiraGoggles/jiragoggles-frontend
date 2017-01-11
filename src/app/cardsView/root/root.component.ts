/**
 * Created by wiekonek on 09.11.16.
 */
import {Component} from '@angular/core';
import {RootService} from "../services/root/root.service";
import {RankService} from "../services/rank/rank.service";
import {BaseScrollableCardsViewComponent} from "../base-scrollable-cards-view.component";


@Component({
  selector: 'test',
  templateUrl: '../base-scrollable-cards-view.component.html',
  styleUrls: [ '../base-scrollable-cards-view.component.scss' ]
})
export class RootComponent extends BaseScrollableCardsViewComponent {
  constructor(private rootService: RootService, rankService: RankService) {
    super(rankService);
  }

  loadNextBatch() {
    this._loadNextBatch(this.rootService.getPage(this.nextBatchNumber, this.perBatch));
  }
}
