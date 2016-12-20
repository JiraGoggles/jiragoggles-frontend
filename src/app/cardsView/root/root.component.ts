/**
 * Created by wiekonek on 09.11.16.
 */
import {Component} from '@angular/core';
import {RootService} from "../services/root/root.service";
import {BaseScrollableCardsViewComponent} from "../base-scrollable-cards-view.component";


@Component({
  selector: 'test',
  templateUrl: '../base-scrollable-cards-view.component.html',
  styleUrls: [ '../base-scrollable-cards-view.component.scss' ]
})
export class RootComponent extends BaseScrollableCardsViewComponent {
  constructor(private rootService: RootService) {
    super();
  }

  loadNextBatch() {
    this._loadNextBatch(this.rootService.getPage(this.currentBatch, this.perBatch));
  }
}
