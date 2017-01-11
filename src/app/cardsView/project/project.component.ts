/**
 * Created by wiekonek on 22.11.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../services/project/project.service";
import {BasePaginateCardComponent} from "../base-scrollable-cards-view.component";
import {RankService} from "../services/rank/rank.service";


@Component({
  selector: 'project',
  templateUrl: '../base-scrollable-cards-view.component.html',
  styleUrls: [ '../base-scrollable-cards-view.component.scss' ]
})
export class ProjectComponent extends BasePaginateCardComponent {
  private key: number;

  constructor(private route: ActivatedRoute, private service: ProjectService, rankService: RankService) {
    super(rankService);
  }

  getPage(page: number) {
    this.route.params
      .map(params => params['projectKey'])
      .subscribe(key => this.key = key);

    // TODO Wait for this.key assignment in this.service.getPage
    this._getPage(page, this.service.getPage(page, this.perPage, this.key.toString()));
  }
}

