/**
 * Created by wiekonek on 22.11.16.
 */
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BaseKeyView} from "../base-key-view";
import {ProjectService} from "../services/project/project.service";


@Component({
  selector: 'project',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ]
})
export class ProjectComponent extends BaseKeyView {

  constructor(route: ActivatedRoute, service: ProjectService) {
    super(route,  service);
    console.log("Project Component constructed." + this.key);
  }
}

