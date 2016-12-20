/**
 * Created by wiekonek on 22.11.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../services/project/project.service";
import {ParentCard} from "../../card/card";
import {BaseScrollableCardsViewComponent} from "../base-scrollable-cards-view.component";


@Component({
  selector: 'project',
  templateUrl: '../base-scrollable-cards-view.component.html',
  styleUrls: [ '../base-scrollable-cards-view.component.scss' ]
})
export class ProjectComponent extends BaseScrollableCardsViewComponent {
  private key: number;

  constructor(private route: ActivatedRoute, private service: ProjectService) {
    super();
  }

  loadNextBatch() {
    this.route.params
      .map(params => params['projectKey'])
      .subscribe(key => this.key = key);

    // TODO Wait for this.key assignment in this.service.loadNextBatch
    this._loadNextBatch(this.service.getPage(this.currentBatch, this.perBatch, this.key.toString()));
  }
}

