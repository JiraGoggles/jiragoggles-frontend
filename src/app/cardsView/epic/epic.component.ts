/**
 * Created by wiekonek on 11.12.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ParentCard} from "../../card/card";
import {EpicService} from "../services/epic/epic.service";
import {BasePaginateCardComponent} from "../base-paginate-card.component";


@Component({
  selector: 'epic',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ]
})
export class EpicComponent extends BasePaginateCardComponent {
  private key: number;

  constructor(private route: ActivatedRoute, private service: EpicService) {
    super();
  }

  getPage(page: number) {
    let keys: string[] =[];

    this.route.params
      .map(params => [params['projectKey'], params['epicKey']])
      .subscribe(ks => keys = ks);

    // TODO Wait for this.key assignment in this.service.getPage
    this._getPage(page, this.service.getPage(page, this.perPage, keys[0], keys[1]));
  }
}
