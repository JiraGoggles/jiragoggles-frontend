/**
 * Created by wiekonek on 22.11.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../services/project/project.service";
import {ParentCard} from "../../card/card";
import {BasePaginateCardComponent} from "../base-paginate-card.component";


@Component({
  selector: 'project',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ]
})
export class ProjectComponent extends BasePaginateCardComponent {
  private key: number;

  constructor(private route: ActivatedRoute, private service: ProjectService) {
    super();
  }

  getPage(page: number) {
    this.route.params
      .map(params => params['projectKey'])
      .subscribe(key => this.key = key);

    // TODO Wait for this.key assignment in this.service.getPage
    this._getPage(page, this.service.getPage(page, this.perPage, this.key.toString()));
  }
}

