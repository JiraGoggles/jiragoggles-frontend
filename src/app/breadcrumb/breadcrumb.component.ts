import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {BreadcrumbItem, ProjectBreadcrumbItem, IssueBreadcrumbItem} from "./breadcrumb";
import 'rxjs/add/operator/filter';
import {ProjectService} from "../cardsView/services/project/project.service";
import {RootService} from "../cardsView/services/root/root.service";
import {ParentCard} from "../card/card";
import {EpicService} from "../cardsView/services/epic/epic.service";
import {PaginateResponse} from "../cardsView/services/paginate-response";

@Component({
  selector: 'breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: [ './breadcrumb.component.scss' ]
})
export class BreadcrumbComponent implements OnInit {

  private rootItem: BreadcrumbItem = { url: '/', key: 'Root', isActive: true }; // always available
  private projectItem: ProjectBreadcrumbItem = null;
  private epicItem: IssueBreadcrumbItem = null;
  private storyItem: IssueBreadcrumbItem = null;
  private currentPath: string = '/';

  // TODO possibly a better idea would be to inject one service that delegates tasks to separate services
  constructor(private router: Router, private rootService: RootService,
              private projectService: ProjectService, private epicService: EpicService) {
  }

  ngOnInit() {
    this.router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe((navEvent: NavigationEnd) => this.setBreadcrumbItems(navEvent.url));
  }

  private setBreadcrumbItems(url: string) {
    if (this.currentPath !== url) {
      this.currentPath = url;

      const urlParts = url.split('/').filter(part => part !== '');

      this.projectItem = this.epicItem = this.storyItem = null;
      var projectKey, epicKey, storyKey;
      projectKey = epicKey = storyKey = null;

      this.rootItem.isActive = urlParts.length === 0;

      if (urlParts.length > 1) {
        projectKey = urlParts[1];
        const isProjectItemActive = urlParts.length === 2;

        this.rootService.get()
          .subscribe((projects: PaginateResponse<ParentCard>) => this.projectItem =
            this.convertToProjectItem(this.findCardByKey(projects, projectKey), isProjectItemActive));
      }

      if (urlParts.length > 2) {
        epicKey = urlParts[2];
        const isEpicItemActive = urlParts.length === 3;

        this.projectService.get(projectKey)
          .subscribe((epics: PaginateResponse<ParentCard>) => this.epicItem =
            this.convertToIssueItem(this.findCardByKey(epics, epicKey), isEpicItemActive, projectKey));
      }

      if (urlParts.length > 3) {
        storyKey = urlParts[3];
        const isStoryItemActive = urlParts.length === 4;

        this.epicService.get(projectKey, epicKey)
          .subscribe((stories: PaginateResponse<ParentCard>) => this.storyItem =
            this.convertToIssueItem(this.findCardByKey(stories, storyKey), isStoryItemActive, projectKey, epicKey));
      }
    }
  }

  private convertToProjectItem(card: ParentCard, isActive: boolean): ProjectBreadcrumbItem {
    if (card) {
      const url = '/project/' + card.key;
      const key = 'Project [' + card.key + ']';
      const name = card.name;
      return { url, key, name, isActive };
    }
    else
      return null;
  }

  private convertToIssueItem(card: ParentCard, isActive: boolean, ...keys: string[]): IssueBreadcrumbItem {
    if (card) {
      const url = '/project/' + [...keys, card.key].join('/');
      const key = this.capitalize(card.type) + ' [' + card.key + ']';
      const name = card.name;
      const priorityImgUrl = card.priorityImgUrl;
      return { url, key, name, priorityImgUrl, isActive };
    }
    else
      return null;
  }

  //TODO maybe there's something similar to 'find' method from ES6 in Typescript already?
  private findCardByKey(paginateResponse: PaginateResponse<ParentCard>, key: string): ParentCard {
    const cards = paginateResponse.cards;
    const filtered = cards.filter(card => card.key === key);
    if (filtered.length === 1) // basically, it should always be true
      return filtered[0];
    else
      return null;
  }

  // it doesn't really belong here but it probably won't be needed anywhere else
  private capitalize(str: string) {
    if (str && str.length > 0)
      return str.charAt(0).toUpperCase() + str.slice(1);
    else
      return str;
  }
}

