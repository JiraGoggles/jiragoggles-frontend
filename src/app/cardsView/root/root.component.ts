/**
 * Created by wiekonek on 09.11.16.
 */
import {Component} from '@angular/core';
import {RootService} from "../services/root/root.service";
import {BasePaginateCardComponent} from "../base-scrollable-cards-view.component";
import {RankService} from "../services/rank/rank.service";


@Component({
  selector: 'test',
  templateUrl: '../base-scrollable-cards-view.component.html',
  styleUrls: [ '../base-scrollable-cards-view.component.scss' ]
})
export class RootComponent extends BasePaginateCardComponent {
  constructor(private rootService: RootService, rankService: RankService) {
    super(rankService);
  }

  getPage(page: number) {
    this._getPage(page, this.rootService.getPage(page, 4));
  }

}
